<script lang="ts">
	import { page } from '$app/stores';
	import type { ComponentType, SvelteComponent } from 'svelte';

	interface $$Props {
		links: { icon: ComponentType<SvelteComponent>; name: string; href: string }[];
		onclick: () => void;
	}

	let { links, onclick }: $$Props = $props();
</script>

<div class="absolute right-0 py-2">
	<nav class="flex flex-col gap-2 rounded bg-[#242424] p-4">
		{#each links as { icon, name, href }}
			<a
				class="flex items-center gap-4 rounded bg-[#050505] p-2 px-10 text-center"
				{href}
				aria-current={$page.url.pathname === href}
				{onclick}
			>
				<svelte:component this={icon} class="size-4" />
				<span>{name}</span>
			</a>
		{/each}
	</nav>
</div>
