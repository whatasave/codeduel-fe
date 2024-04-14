<script lang="ts">
	import Markdown from '$components/Markdown.svelte';
	import Pane from '$components/Pane.svelte';
	import type { Challenge } from '$lib/types';
	import clsx from 'clsx';

	let { challenge, class: className }: { challenge: Challenge; class?: string } = $props();
</script>

<Pane class={clsx('flex h-40 flex-col p-4 pr-2', className)}>
	<Markdown class="pr-2" source={challenge.description} />
</Pane>
