import backend from '$lib/backend.js';
import { isSuccess } from '$lib/result.js';
import type { UserProfile } from '$lib/types.js';

export const ssr = true;

export async function load() {
	let user: UserProfile | undefined;

	const userData = await backend.getProfile();
	if (isSuccess(userData)) {
		user = userData.data;
	}

	return {
		user
	};
}
