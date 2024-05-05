import backend from '$lib/backend.js';
import { isError, isSuccess } from '$lib/result.js';
import type { UserProfile } from '$lib/types.js';

export async function load({ url, fetch }) {
	const jwt = url.searchParams.get('jwt') ?? undefined;
	let user: UserProfile | undefined = undefined;

	if (jwt) {
		backend.setJwt(jwt);

		const userRes = await backend.setFetch(fetch).getProfile();

		if (isSuccess(userRes)) user = userRes.data;
		if (isError(userRes)) {
			console.error(userRes.message);
			// if (browser) await invalidateAll();
		}

		console.log(userRes);
	}

	return { jwt, user };
}
