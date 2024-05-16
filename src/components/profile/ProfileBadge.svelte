<script lang="ts">
	import clsx from 'clsx';
	import type { ComponentType, SvelteComponent } from 'svelte';

	let { class: customClass, icon }: { class: string; icon: ComponentType<SvelteComponent> } = $props();
</script>

<div class={clsx(`absolute bottom-0 right-0 flex items-center justify-center rounded-full p-1`, customClass)}>
	<svelte:component this={icon} />
</div>
