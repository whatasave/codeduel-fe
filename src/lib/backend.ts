import { browser } from '$app/environment';
import { PUBLIC_BACKEND_URL, PUBLIC_LOBBY_API } from '$env/static/public';
import { HttpError, StatusCode } from './result';
import type { SimpleLobby, UserId, UserProfile } from './types';

type Fetch = typeof fetch;
const defaultFetch = fetch;

class Backend {
	private url: string;

	constructor(url: string) {
		this.url = url;
	}

	private getCookie(name: string): string | null {
		if (!browser) return null;
		const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
		if (match) return match[2];
		return null;
	}

	private async call<T = unknown>(
		method: string,
		path: string,
		body: Record<string, unknown> = {},
		fetch: Fetch = defaultFetch
	): Promise<T> {
		const headers = {};
		const result = await fetch(this.url + '/' + path, {
			method,
			mode: 'cors',
			credentials: 'include',
			headers,
			body: body && method !== 'GET' ? JSON.stringify(body) : undefined
		});

		if (result.status === StatusCode.Unauthorized && this.getCookie('logged_in') === 'true') {
			console.log('Unauthorized, refreshing token');
			await this.call('GET', 'v1/auth/refresh', {}, fetch);
			return await this.call(method, path, body, fetch);
		} else if (result.status === StatusCode.Forbidden) {
			throw new HttpError(result.status, `Received error code ${result.status} from backend: ${await result.text()}`);
		} else if (!result.ok) {
			throw new HttpError(result.status, `Received error code ${result.status} from backend: ${await result.text()}`);
		}

		const json = (await result.json()) as T;
		return json;
	}

	private async post<T = unknown>(
		path: string,
		body: Record<string, unknown> = {},
		fetch: Fetch = defaultFetch
	): Promise<T> {
		return await this.call<T>('POST', path, body, fetch);
	}

	private async get<T = unknown>(
		path: string,
		body: Record<string, unknown> = {},
		fetch: Fetch = defaultFetch
	): Promise<T> {
		const query = new URLSearchParams(Object.entries(body).map(([key, value]) => [key, JSON.stringify(value)]));
		return await this.call<T>('GET', `${path}?${query}`, {}, fetch);
	}

	// API CALLS

	async getProfile(fetch: Fetch = defaultFetch) {
		return await this.get<UserProfile>('v1/user/profile', {}, fetch);
	}

	async getUser(username: string, fetch: Fetch = defaultFetch) {
		return this.get<{
			id: UserId;
			name: string;
			username: string;
			email: string;
			avatar: string;
			background_img: string;
			bio: string;
			created_at: string;
			updated_at: string;
		}>(`v1/user/${username}`, {}, fetch);
	}

	async getUserById(id: number, fetch: Fetch = defaultFetch) {
		return this.get<
			{
				name: string;
				username: string;
				avatar: string;
				background_img: string;
				bio: string;
				created_at: string;
			}[]
		>(`v1/user`, { id }, fetch);
	}

	async getUsers(queries?: Record<string, unknown>, fetch: Fetch = defaultFetch) {
		return this.get<
			{
				name: string;
				username: string;
				avatar: string;
				background_img: string;
				bio: string;
				created_at: string;
			}[]
		>(`v1/user`, { ...queries }, fetch);
	}

	async getChallenge(id: number, fetch: Fetch = defaultFetch) {
		return this.get<{
			id: number;
			owner_id: number;
			title: string;
			description: string;
			content: string;
			created_at: string;
			updated_at: string;
		}>(`v1/challenge/${id}`, {}, fetch);
	}

	async getChallenges(fetch: Fetch = defaultFetch) {
		return this.get<
			{
				id: number;
				owner_id: number;
				title: string;
				description: string;
				content: string;
				created_at: string;
				updated_at: string;
			}[]
		>(`v1/challenge`, {}, fetch);
	}

	async getResults(lobbyId: string, fetch: Fetch = defaultFetch) {
		return this.get<{
			lobby: {
				id: number;
				uuid: string;
				challenge_id: number;
				owner_id: number;
				users_id: null;
				status: string;
				max_players: number;
				game_duration: number;
				allowed_languages: string[];
				created_at: string;
				updated_at: string;
			};
			results: {
				id: number;
				lobby_id: number;
				user_id: number;
				code: string;
				language: string;
				tests_passed: number;
				submission_date: string;
				created_at: string;
				updated_at: string;
			}[];
		}>(`v1/lobby/results/${lobbyId}`, {}, fetch);
	}

	// TODO move
	async getLobbies(): Promise<SimpleLobby[]> {
		const res = await fetch(`${PUBLIC_LOBBY_API}/lobbies`);
		const json = (await res.json()) as SimpleLobby[];
		return json;
	}
}

export default new Backend(PUBLIC_BACKEND_URL);
