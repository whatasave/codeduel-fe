import backend from '$lib/backend.js';

export const ssr = false;
export const prerender = false;

export async function load({ fetch }) {
	return {
		users: backend.getUsers(fetch)
	};
}
