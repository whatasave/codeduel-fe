import type { UserProfile } from '$lib/types';
import { getContext, setContext } from 'svelte';

function context<T>() {
	const key = Symbol();
	return [() => getContext<T>(key), (value: T) => setContext(key, value)] as const;
}

export const [getUser, setUser] = context<Promise<UserProfile | null>>();