<script lang="ts">
	import Pane from '$components/Pane.svelte';
	import clsx from 'clsx';

	let { class: className }: { class?: string } = $props();
</script>

<Pane class={clsx('flex flex-col', className)}></Pane>
