import { PUBLIC_BACKEND_URL, PUBLIC_LOBBY_API } from '$env/static/public';
import { Fetcher, type Fetch } from './fetcher';
import { HttpError } from './result';
import type { SimpleLobby } from './types';

class Backend {
	private fetcher: Fetcher

	constructor(baseUrl: string) {
		this.fetcher = new Fetcher({ baseUrl });
	}

	async getUserByUsername(username: string, fetch?: Fetch) {
		try {
			return this.fetcher.fetch('GET /v1/user', {
				query: { username }
			}, fetch);
		} catch (e) {
			if (e instanceof HttpError && e.code === 404) return null;
		}
	}

	async getUserById(id: number, fetch?: Fetch) {
		return this.fetcher.fetch('GET /v1/user/{id}', {
			params: { id }
		}, fetch);
	}

	async getProfile(fetch?: Fetch) {
		return this.fetcher.fetch('GET /v1/user/profile', {}, fetch);
	}

	async getUsers(queries?: Record<string, unknown>, fetch?: Fetch) {
		// return this.get<
		// 	{
		// 		name: string;
		// 		username: string;
		// 		avatar: string;
		// 		background_img: string;
		// 		bio: string;
		// 		created_at: string;
		// 	}[]
		// >(`v1/user`, { ...queries }, fetch);
	}

	async getChallenge(id: number, fetch?: Fetch) {
		// return this.get<{
		// 	id: number;
		// 	owner_id: number;
		// 	title: string;
		// 	description: string;
		// 	content: string;
		// 	created_at: string;
		// 	updated_at: string;
		// }>(`v1/challenge/${id}`, {}, fetch);
	}

	async getChallenges(fetch?: Fetch) {
		// return this.get<
		// 	{
		// 		id: number;
		// 		owner_id: number;
		// 		title: string;
		// 		description: string;
		// 		content: string;
		// 		created_at: string;
		// 		updated_at: string;
		// 	}[]
		// >(`v1/challenge`, {}, fetch);
	}

	async getResults(lobbyId: string, fetch?: Fetch) {
		// return this.get<{
		// 	lobby: {
		// 		id: number;
		// 		uuid: string;
		// 		challenge_id: number;
		// 		owner_id: number;
		// 		users_id: null;
		// 		status: string;
		// 		max_players: number;
		// 		game_duration: number;
		// 		allowed_languages: string[];
		// 		created_at: string;
		// 		updated_at: string;
		// 	};
		// 	results: {
		// 		id: number;
		// 		lobby_id: number;
		// 		user_id: number;
		// 		code: string;
		// 		language: string;
		// 		tests_passed: number;
		// 		show_code: boolean;
		// 		submitted_at: string;
		// 		created_at: string;
		// 		updated_at: string;
		// 	}[];
		// }>(`v1/lobby/results/${lobbyId}`, {}, fetch);
	}

	async getUserMatches(username: string, fetch?: Fetch) {
		// return this.get<
		// 	{
		// 		match: {
		// 			id: number;
		// 			uuid: string;
		// 			mode: string;
		// 			max_players: number;
		// 			duration: number;
		// 			allowed_languages: string[];
		// 			created_at: string;
		// 		};
		// 		challenge: {
		// 			id: number;
		// 			title: string;
		// 			description: string;
		// 			owner: {
		// 				id: number;
		// 				username: string;
		// 				name: string;
		// 				avatar: string;
		// 			};
		// 		};
		// 		player: {
		// 			id: number;
		// 			username: string;
		// 			name: string;
		// 			avatar: string;
		// 			code: string;
		// 			language: string;
		// 			tests_passed: number;
		// 			show_code: false;
		// 			submitted_at: string;
		// 		};
		// 	}[]
		// >(`v1/lobby/user/${username}`, {}, fetch);
	}

	async shareCode(lobbyUniqueId: string, fetch?: Fetch) {
		// return this.patch(`v1/lobby/${lobbyUniqueId}/sharecode`, { share_code: true }, fetch);
	}

	// TODO move
	async getLobbies(): Promise<SimpleLobby[]> {
		const res = await fetch(`${PUBLIC_LOBBY_API}/lobbies`);
		const json = (await res.json()) as SimpleLobby[];
		return json;
	}
}

export default new Backend(PUBLIC_BACKEND_URL);
