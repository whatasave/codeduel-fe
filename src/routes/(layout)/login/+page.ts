import { redirect } from '@sveltejs/kit';

export async function load({ url }) {
	if (url.searchParams.has('return_to')) throw redirect(302, url.searchParams.get('return_to')!);

	return {};
}
