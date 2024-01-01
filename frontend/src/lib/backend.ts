import { PUBLIC_BACKEND_URL } from '$env/static/public';
import { Ok, type Result, Error } from './result';

class Backend {
	private url: string;
	private jwt?: string;

	constructor(url: string, jwt?: string) {
		this.url = url;
		this.jwt = jwt;
	}

	private async call<T = unknown>(method: string, path: string, body?: Record<string, unknown>, headers: Record<string, string> = {}): Promise<Result<T>> {
		if (this.jwt) headers['Authorization'] = `Bearer ${this.jwt}`;
		try {
			const result = await fetch(this.url + '/' + path, {
				method,
				headers,
				body: body ? JSON.stringify(body) : undefined,
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

	private async get<T = unknown>(path: string, body?: Record<string, unknown>): Promise<Result<T>> {
		return await this.call<T>('GET', path, body);
	}

	get logged() {
		return Boolean(this.jwt);
	}

	async setJwt(jwt: string) {
		this.jwt = jwt;
	}

	// API CALLS
}

export default new Backend(PUBLIC_BACKEND_URL);