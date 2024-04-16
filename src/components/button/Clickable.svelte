<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes, MouseEventHandler } from 'svelte/elements';

	interface $$Props extends HTMLButtonAttributes {
		children: Snippet;
		loading?: Snippet;
		delay?: number;
	}

	let { children, delay, loading, onclick, ...props }: $$Props = $props();

	let isLoading: boolean = $state(false);

	async function handleClick(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
		if (isLoading) return;
		isLoading = true;
		await onclick?.(event);
		await new Promise((resolve) => setTimeout(resolve, delay ?? 0));
		isLoading = false;
	}
</script>

<button type="button" class="contents" {...props} onclick={handleClick} disabled={isLoading}>
	{#if isLoading}
		{@render (loading ?? children)()}
	{:else}
		{@render children()}
	{/if}
</button>
