import { invalidateAll } from '$app/navigation';
import { redirect } from '@sveltejs/kit';

export const ssr = false;

export async function load({ url }) {
	if (url.searchParams.has('jwt')) {
		const jwt = url.searchParams.get('jwt');
		localStorage.setItem('jwt', jwt as string);
	}

	if (url.searchParams.has('return_to')) {
		const return_to = url.searchParams.get('return_to');

		await invalidateAll();
		redirect(301, return_to as string);
	}

	return {};
}
