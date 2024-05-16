import { LobbyService } from '$lib/lobby/lobby.js';
import { error, type NumericRange } from '@sveltejs/kit';

export const ssr = false;

export async function load({ params }) {
	try {
		const lobby = await LobbyService.connect(params.id);
		if (lobby.getLobby().state.type === 'preLobby') {
			throw error(404, 'Not found');
		}
		return { lobby };
	} catch (e) {
		const code = (e as { code: number }).code;
		if (code >= 4400 && code < 4600) {
			throw error((code - 4000) as NumericRange<400, 5>, (e as { reason: string }).reason);
		} else {
			throw e;
		}
	}
}
