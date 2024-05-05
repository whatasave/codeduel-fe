import backend from '$lib/backend.js';

export async function load({ params, fetch }) {
	const username = params.username;
	const user = await backend.getUser(username, fetch);

	return {
		user
	};
}
