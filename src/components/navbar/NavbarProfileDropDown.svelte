<script lang="ts">
	import { page } from '$app/stores';
	import type { Component } from 'svelte';
	import { get } from 'svelte/store';

	interface $Props {
		links: { icon: Component<{ class?: string }>; name: string; href: string }[];
		onclick: () => void;
	}

	let { links, onclick }: $Props = $props();
</script>

<div class="absolute right-0 py-2">
	<nav class="flex flex-col gap-2 rounded bg-[#242424] p-4">
		{#each links as { icon: Icon, name, href }}
			<a
				class="flex items-center gap-4 rounded bg-[#050505] p-2 px-10 text-center"
				{href}
				aria-current={get(page).url.pathname === href}
				{onclick}
			>
				<Icon class="size-4" />
				<span>{name}</span>
			</a>
		{/each}
	</nav>
</div>
