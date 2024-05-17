import backend from '$lib/backend.js';

export async function load({ params, fetch }) {
	const username = params.username;

	return {
		user: await backend.getUser(username, fetch),
		matches: backend.getUserMatches(username, fetch)
	};
}
