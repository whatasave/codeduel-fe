<script lang="ts">
	import type { Snippet } from 'svelte';
	import '../app.postcss';

	const { children }: { children: Snippet } = $props();
</script>

<svelte:head>
	<title>CodeDuel</title>
	<meta name="description" content="CodeDuel is a platform for competitive programming." />
</svelte:head>

{@render children()}
