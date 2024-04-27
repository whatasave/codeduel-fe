import backend from '$lib/backend.js';
import { isError } from '$lib/result.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	let username = params.username;

	const userRes = await backend.getUser(username);
	if (isError(userRes)) throw error(userRes.code ?? 500, userRes.message ?? 'Internal Server Error');

	return {
		user: userRes.data
	};
}
