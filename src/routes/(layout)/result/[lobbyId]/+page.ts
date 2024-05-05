import backend from '$lib/backend.js';

export async function load({ params }) {
	const results = backend.getResults(params.lobbyId);

	return {
		lobbyId: params.lobbyId,
		results
	};
}
