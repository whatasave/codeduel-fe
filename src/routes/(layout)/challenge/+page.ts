import backend from '$lib/backend.js';

export async function load({ fetch }) {
	return {
		challenges: backend.getChallenges(fetch)
	};
}
