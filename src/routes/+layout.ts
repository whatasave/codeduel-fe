import backend from '$lib/backend.js';
import { HttpError } from '$lib/result.js';
import type { UserProfile } from '$lib/types.js';

export const ssr = true;

export async function load({ fetch }) {
	let user: UserProfile | undefined = undefined;
	try {
		user = await backend.getProfile(fetch);
	} catch (e) {
		if (!(e instanceof HttpError) || e.code !== 401) throw e;
	}

	return { user };
}
