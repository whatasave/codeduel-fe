export async function load({ cookies }) {
	cookies.set('return_to', '/lobby', { path: '/', maxAge: 60, secure: false });

	return {};
}
