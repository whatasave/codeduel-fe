import backend from '$lib/backend.js';
import { isError, isSuccess } from '$lib/result.js';
import type { UserProfile } from '$lib/types.js';

export async function load({ url }) {
	const jwt = url.searchParams.get('jwt') ?? undefined;
	let user: UserProfile | undefined = undefined;

	if (jwt) {
		backend.setJwt(jwt);

		const userRes = await backend.getProfile();

		if (isError(userRes)) console.error(userRes.message);
		if (isSuccess(userRes)) user = userRes.data;

		console.log(userRes);
	}

	return { jwt, user };
}
