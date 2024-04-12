<script lang="ts">
	import Markdown from '$components/Markdown.svelte';
	import Pane from '$components/Pane.svelte';
	import type { Challenge } from '$lib/types';
	import clsx from 'clsx';
	import Timer from './Timer.svelte';

	let { challenge, endTime, class: className }: { challenge: Challenge; endTime: string; class?: string } = $props();
</script>

<Pane class={clsx('flex flex-col p-4 pr-2', className)}>
	<div class="flex justify-end pr-2">
		<Timer time={endTime} />
	</div>
	<Markdown class="flex-1 pr-2" source={challenge.description} />
</Pane>
