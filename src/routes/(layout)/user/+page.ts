import backend from '$lib/backend.js';
// import { isError } from '$lib/result.js';
// import { error } from '@sveltejs/kit';

export const ssr = false;
export const prerender = false;

export async function load({ fetch }) {
	// const usersRes = await backend.setFetch(fetch).getUsers();
	// if (isError(usersRes)) throw error(usersRes.code ?? 500, usersRes.message ?? 'Internal Server Error');

	return {
		// users: usersRes.data
		users: backend.setFetch(fetch).getUsers()
	};
}
