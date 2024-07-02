import backend from '$lib/backend.js';
import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
	const id = parseInt(params.id);
	if (isNaN(id)) throw error(404, 'Not found');
	const challenge = await backend.getChallenge(id, fetch);
	return {
		challenge,
	};
}
