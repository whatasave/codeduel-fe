import { browser } from '$app/environment';
import { PUBLIC_BACKEND_URL, PUBLIC_LOBBY_API } from '$env/static/public';
import { Fetcher, HttpError, type Fetch, type FetchOptions, type FetchResponse, type MethodPath } from './fetcher';
import type { SimpleLobby } from './types';

enum StatusCode {
	OK = 200,
	NoContent = 204,
	BadRequest = 400,
	Unauthorized = 401,
	Forbidden = 403,
	NotFound = 404,
	InternalServerError = 500
}

class Backend {
	private fetcher: Fetcher

	constructor(origin: string) {
		this.fetcher = new Fetcher({ origin });
	}

	isLoggedIn() {
		return browserGetCookie('logged_in') === 'true';
	}

	private async fetch<Path extends MethodPath>(
        path: Path,
		options: FetchOptions<Path>,
		fetch?: Fetch
	): Promise<FetchResponse<Path>> {
		try {
			return await this.fetcher.fetch(path, options, fetch);
		} catch (e) {
			if (e instanceof HttpError && e.code === StatusCode.Unauthorized && this.isLoggedIn()) {
				await this.refreshToken(fetch);
				return await this.fetcher.fetch(path, options, fetch);
			}
			throw e;
		}
	}

	async refreshToken(fetch?: Fetch) {
        return await this.fetcher.fetch('GET /v1/auth/refresh', {}, fetch)
    }

	async getUserByUsername(username: string, fetch?: Fetch) {
		try {
			return this.fetch('GET /v1/user', { query: { username } }, fetch);
		} catch (e) {
			if (e instanceof HttpError && e.code === 404) return null;
		}
	}

	async getUserById(id: number, fetch?: Fetch) {
		return this.fetch('GET /v1/user/{id}', {
			params: { id }
		}, fetch);
	}

	async getProfile(fetch?: Fetch) {
		try {
			return await this.fetch('GET /v1/user/profile', {}, fetch);
		} catch (e) {
			if (e instanceof HttpError && e.code === StatusCode.Unauthorized) return null;
			throw e;
		}
	}

	async getUserList(fetch?: Fetch) {
		return this.fetch('GET /v1/user/list', {}, fetch);
	}

	async getChallenge(id: number, fetch?: Fetch) {
		return this.fetch('GET /v1/challenge/{id}', { params: { id } }, fetch);
	}

	async getChallenges(fetch?: Fetch) {
		return this.fetch('GET /v1/challenge', {}, fetch);
	}

	async getResults(lobbyId: string, fetch?: Fetch) {
		return this.fetch('GET /v1/game/{uniqueId}/results', { params: { uniqueId: lobbyId } }, fetch);
	}

	async getUserMatches(userId: number, fetch?: Fetch) {
		return this.fetch('GET /v1/game/user/{userId}', { params: { userId } }, fetch);
	}

	async shareCode(lobbyUniqueId: string, fetch?: Fetch) {
		const res = await (fetch ?? globalThis.fetch)(`v1/lobby/${lobbyUniqueId}/sharecode`, {
			method: 'PATCH',
			body: JSON.stringify({ share_code: true })
		});
		if (!res.ok) throw new HttpError(res.status, await res.text());
	}

	async getLobbies(fetch?: Fetch): Promise<SimpleLobby[]> {
		const res = await (fetch ?? globalThis.fetch)(`${PUBLIC_LOBBY_API}/lobbies`);
		if (!res.ok) throw new HttpError(res.status, await res.text());
		const json = (await res.json()) as SimpleLobby[];
		return json;
	}
}

function browserGetCookie(name: string): string | null {
	if (!browser) return null;
	const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
	if (match) return match[2];
	return null;
}

export default new Backend(PUBLIC_BACKEND_URL);
