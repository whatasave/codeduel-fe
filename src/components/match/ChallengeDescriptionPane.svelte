<script lang="ts">
	import Markdown from '$components/Markdown.svelte';
	import Pane from '$components/Pane.svelte';
	import type { Challenge } from '$lib/types';
	import clsx from 'clsx';
	import PlayerCircle from './PlayerCircle.svelte';

	let { challenge, class: className }: { challenge: Challenge; class?: string } = $props();
</script>

<Pane class={clsx('flex h-40 flex-col p-4 pr-2', className)}>
	<div class="flex items-center gap-2 pb-4">
		<PlayerCircle class="size-8" player={challenge.owner} />
		<div class="flex flex-col">
			<h2 class="text-lg font-bold">{challenge.title}</h2>
			<a href="/user/{challenge.owner.username}" target="_blank" rel="noopener noreferrer" class="text-sm text-gray-500">
				by {challenge.owner.name}
			</a>
		</div>
	</div>
	<Markdown class="pr-2" source={challenge.content} />
</Pane>
