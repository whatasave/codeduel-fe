import backend from '$lib/backend.js';
import { isError, isSuccess } from '$lib/result.js';
import type { UserProfile } from '$lib/types.js';

export const ssr = true;

export async function load() {
	let user: UserProfile | undefined;

	const userData = await backend.setFetch(fetch).getProfile();
	if (isSuccess(userData)) user = userData.data;
	if (isError(userData)) {
		// if (browser) await invalidateAll();
	}

	return {
		user
	};
}
