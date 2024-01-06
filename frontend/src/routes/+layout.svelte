<script lang="ts">
	import type { Snippet } from 'svelte';
	import '../app.postcss';

	let { children } = $props<{ children: Snippet }>();
</script>

{@render children()}
