import backend from '$lib/backend.js';
import { isError, isSuccess } from '$lib/result.js';
import type { UserProfile } from '$lib/types.js';

export async function load({}) {
	let user: UserProfile | undefined = undefined;

	const userRes = await backend.getProfile();
	if (isError(userRes)) console.error(userRes.message);
	if (isSuccess(userRes)) user = userRes.data;

	return { user };
}
