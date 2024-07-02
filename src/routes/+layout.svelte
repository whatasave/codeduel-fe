<script lang="ts">
	import '../app.postcss';
	import backend from '$lib/backend';
	import { setUser } from './context';
	import { onMount } from 'svelte';

	const { children } = $props();

	onMount(() => {
		const user = $state(backend.getProfile());
		setUser(user);
	});
</script>

<svelte:head>
	<title>CodeDuel</title>
	<meta name="description" content="CodeDuel is a platform for competitive programming." />
</svelte:head>

{@render children()}
