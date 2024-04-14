import backend from '$lib/backend.js';
import { isError, isSuccess } from '$lib/result.js';
import type { User } from '$lib/types.js';

export async function load({}) {
	let user: User | undefined = undefined;

	const userRes = await backend.getUser();
	if (isError(userRes)) console.error(userRes.message);
	if (isSuccess(userRes)) user = userRes.data;

	return { user };
}
