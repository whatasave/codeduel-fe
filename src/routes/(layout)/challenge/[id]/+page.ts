import backend from '$lib/backend.js';

export async function load({ params, fetch }) {
	const id = parseInt(params.id);
	const challenge = await backend.getChallenge(id, fetch);

	return {
		challenge,
		owner: backend.getUserById(challenge.owner_id, fetch)
	};
}
