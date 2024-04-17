import backend from '$lib/backend.js';
import { isError, isSuccess } from '$lib/result.js';
import type { UserProfile } from '$lib/types.js';
import { error } from '@sveltejs/kit';

export async function load({}) {
	let user: UserProfile | undefined = undefined;

	const userRes = await backend.getProfile();
	if (isError(userRes)) throw error(userRes.code ?? 500, userRes.message ?? 'Internal Server Error');
	if (isSuccess(userRes)) user = userRes.data;

	return {
		user
	};
}
