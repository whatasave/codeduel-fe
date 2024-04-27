import { PUBLIC_BACKEND_URL, PUBLIC_LOBBY_HOST_PORT } from '$env/static/public';
import { Ok, type Result, Error, isSuccess, isError } from './result';
import type { SimpleLobby, UserId, UserProfile } from './types';

class Backend {
	private url: string;
	private jwt?: string;
	private user?: UserProfile;

	constructor(url: string, jwt?: string) {
		this.url = url;
		this.jwt = jwt;
		this.user = undefined;
	}

	private async call<T = unknown>(
		method: string,
		path: string,
		body?: Record<string, unknown>,
		headers: Record<string, string> = {}
	): Promise<Result<T>> {
		// if (this.jwt) headers['Authorization'] = `Bearer ${this.jwt}`;
		try {
			const result = await fetch(this.url + '/' + path, {
				method,
				credentials: 'include',
				mode: 'cors',
				headers,
				body: body ? JSON.stringify(body) : undefined
			});
			const json = (await result.json()) as T;
			if (!result.ok) return new Error(JSON.stringify(json), result.status);
			return new Ok(json);
		} catch (e) {
			return new Error((e as Record<string, string>).message);
		}
	}

	private async post<T = unknown>(path: string, body?: Record<string, unknown>): Promise<Result<T>> {
		return await this.call<T>('POST', path, body ?? {});
	}

	private async get<T = unknown>(path: string): Promise<Result<T>> {
		return await this.call<T>('GET', path);
	}

	get logged() {
		return Boolean(this.jwt);
	}

	setJwt(jwt: string) {
		this.jwt = jwt;
	}

	// API CALLS

	async getProfile() {
		if (this.user) return new Ok(this.user);

		const res = await this.get<UserProfile>('v1/user/profile');
		if (isSuccess(res)) {
			this.user = res.data;
		}

		return res;
	}

	async getUser(username: string) {
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
		}>(`v1/user/${username}`);
	}

	async getUsers() {
		return this.get<
			{
				name: string;
				username: string;
				avatar: string;
				background_img: string;
				bio: string;
				created_at: string;
			}[]
		>(`v1/user`);
	}

	async getLobbies(): Promise<Result<SimpleLobby[]>> {
		const res = await fetch(`http://${PUBLIC_LOBBY_HOST_PORT}/lobbies`);
		const json = (await res.json()) as SimpleLobby[];
		return new Ok(json);
	}
}

export default new Backend(PUBLIC_BACKEND_URL);
