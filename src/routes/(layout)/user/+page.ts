import backend from '$lib/backend.js';
import { isError } from '$lib/result.js';
import { error } from '@sveltejs/kit';

export const ssr = false;
export const prerender = false;

export async function load() {
	// const usersRes = await backend.getUsers();
	// if (isError(usersRes)) throw error(usersRes.code ?? 500, usersRes.message ?? 'Internal Server Error');

	const usersRes = {
		data: [
			{
				avatar: '',
				name: 'ciao',
				username: 'filippo',
				created_at: '2023-11-22'
			}
		]
	};

	return {
		users: usersRes.data
	};
}
