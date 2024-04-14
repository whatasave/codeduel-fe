<script lang="ts">
	import Markdown from '$components/Markdown.svelte';
	import Pane from '$components/Pane.svelte';
	import type { Challenge } from '$lib/types';
	import clsx from 'clsx';

	let { challenge, class: className }: { challenge: Challenge; class?: string } = $props();
</script>

<Pane class={clsx('flex min-h-0 flex-1 flex-col p-4 pr-2', className)}>
	<div class="flex justify-end pr-2"></div>
	<Markdown class="flex-1 pr-2" source={challenge.description} />
</Pane>
