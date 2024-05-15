import { PUBLIC_BACKEND_URL } from '$env/static/public';
import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
	cookies.set('jwt', '', { path: '/', maxAge: -1, secure: true });
	redirect(301, `${PUBLIC_BACKEND_URL}/v1/auth/logout`);
}
