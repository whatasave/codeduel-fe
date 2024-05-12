import { PUBLIC_BACKEND_URL } from '$env/static/public';
import { redirect } from '@sveltejs/kit';

export async function load({ url, cookies, fetch }) {
	const return_to = url.origin + `/user`;

	cookies.set('return_to', return_to, { path: '/', maxAge: 60, secure: true });

	const refresh_token = cookies.get('refresh_token');
	const access_token = cookies.get('jwt');

	if (refresh_token !== undefined && access_token === undefined) {
		const response = await fetch(`${PUBLIC_BACKEND_URL}/v1/access_token`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${refresh_token}`
			}
		});

		const data = await response.json();
		cookies.set('jwt', data.access_token, { path: '/', maxAge: 60, secure: true });

		redirect(301, '/user');
	}

	return {};
}
