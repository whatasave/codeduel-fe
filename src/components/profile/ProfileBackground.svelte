<script lang="ts">
	import type { ComponentType, SvelteComponent } from 'svelte';

	let {
		image,
		links
	}: { image: string; links?: { icon: ComponentType<SvelteComponent>; name: string; url: string }[] } = $props();
</script>

<div class="relative mx-auto max-h-60 min-h-60 w-full max-w-[1200px] overflow-hidden rounded bg-white/5">
	<img class="h-full w-full object-cover" src={image} alt="profile background" />

	{#if links}
		<div class="absolute bottom-0 left-0 right-0 flex justify-end gap-2 p-2">
			{#each links as { icon, name, url }}
				<a
					href={url}
					target="_blank"
					rel="noopener noreferrer"
					class="flex items-center justify-center gap-2 rounded-[999px] bg-black/50 p-1 px-2 text-white hover:text-white/80"
				>
					<svelte:component this={icon} class="h-5 w-5" />
					<span>{name}</span>
				</a>
			{/each}
		</div>
	{/if}
</div>
