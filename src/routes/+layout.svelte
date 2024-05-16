<script lang="ts">
	import '../app.postcss';

	const { children } = $props();
</script>

<svelte:head>
	<title>CodeDuel</title>
	<meta name="description" content="CodeDuel is a platform for competitive programming." />
</svelte:head>

{@render children()}
