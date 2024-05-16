<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface $Props extends HTMLButtonAttributes {
		children: Snippet;
		loading?: Snippet;
		delay?: number;
	}

	let { children, delay, loading, onclick, ...props }: $Props = $props();

	let isLoading: boolean = $state(false);

	async function handleClick(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
		if (isLoading || !onclick) return;
		isLoading = true;
		await onclick(event);
		if (!delay) await new Promise((resolve) => setTimeout(resolve, delay));
		isLoading = false;
	}
</script>

<button type="button" class="contents" onclick={handleClick} disabled={isLoading} {...props} >
	{#if isLoading && loading}
		{@render loading()}
	{:else}
		{@render children()}
	{/if}
</button>
