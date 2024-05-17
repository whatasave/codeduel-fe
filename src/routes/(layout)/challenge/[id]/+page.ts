import backend from '$lib/backend.js';

export async function load({ params, fetch }) {
	const id = parseInt(params.id);
	console.log(id);
	const challenge = await backend.getChallenge(id, fetch);

	return {
		challenge,
		owner: backend.getUsers({ id: challenge.owner_id }, fetch)
	};
}
