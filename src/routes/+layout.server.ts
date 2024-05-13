export async function load({ cookies }) {
	const loggedIn = cookies.get('logged_in') === 'true';

	return { loggedIn };
}
