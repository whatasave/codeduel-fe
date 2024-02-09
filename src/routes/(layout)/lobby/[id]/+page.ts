import { LobbyService } from '$lib/lobby/lobby.js';

export async function load({ params }) {
	const lobby = params.id === 'create' ? await LobbyService.create() : await LobbyService.join(params.id);
	return { lobby };
}
