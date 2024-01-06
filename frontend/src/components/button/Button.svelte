<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	type $$Props = (HTMLButtonAttributes | HTMLAnchorAttributes) & {
		children: Snippet;
	};

	let { children, ...props } = $props<$$Props>();
</script>

{#if 'href' in props}
	<a {...props}>
		{@render children()}
	</a>
{:else}
	<button type="button" {...props as HTMLButtonAttributes}>
		{@render children()}
	</button>
{/if}
