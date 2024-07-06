import backend from '$lib/backend.js';
import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
	const username = params.username;
	const user = await backend.getUserByUsername(username, fetch);
	if (!user) throw error(404, 'User not found');

	return {
		user,
		matches: backend.getUserMatches(user.id, fetch)
	};
}
