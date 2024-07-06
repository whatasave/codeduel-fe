<script lang="ts">
	import '../app.postcss';
	import backend from '$lib/backend';
	import { setUser } from './context';
	import { browser } from '$app/environment';

	const { children } = $props();

	const user = $state(browser ? backend.getProfile() : new Promise<null>(() => {}));
	setUser(user);
</script>

<svelte:head>
	<title>CodeDuel</title>
	<meta name="description" content="CodeDuel is a platform for competitive programming." />
</svelte:head>

{@render children()}
