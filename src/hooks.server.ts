import { HttpError } from '$lib/result';

export function handleError({ error }) {
	const message = error instanceof Error ? error.message : 'An error occurred';

	if (error instanceof HttpError) {
		return {
			code: `api-${error.code}`,
			message
		};
	}
}
