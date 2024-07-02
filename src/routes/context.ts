import type { UserProfile } from '$lib/types';
import { getContext, setContext } from 'svelte';

function context<T>(description?: string) {
	const key = Symbol(description);
	return [() => getContext<T>(key), (value: T) => setContext(key, value)] as const;
}

export const [getUser, setUser] = context<Promise<UserProfile | null>>("USER");