<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface $$Props extends HTMLButtonAttributes {
		children: Snippet;
	}

	let { children, ...props }: $$Props = $props();
</script>

<button type="button" {...props}>
	{@render children()}
</button>
