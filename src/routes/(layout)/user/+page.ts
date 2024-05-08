import backend from '$lib/backend.js';

export async function load({ fetch }) {
	return {
		users: backend.getUsers(undefined, fetch)
	};
}
