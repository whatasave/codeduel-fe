<script lang="ts">
	import Markdown from '$components/Markdown.svelte';
	import Pane from '$components/Pane.svelte';
	import type { Challenge } from '$lib/types';
	import clsx from 'clsx';

	let { challenge, class: className } = $props<{ challenge: Challenge; class?: string }>();
</script>

<Pane class={clsx('flex flex-col p-4 pr-2', className)}>
	<Markdown class="flex-1 pr-2" source={challenge.description} />
</Pane>
