<script lang="ts">
	import InputExample from '$components/match/InputExample.svelte';
	import Pane from '$components/Pane.svelte';
	import type { Challenge } from '$lib/types';
	import clsx from 'clsx';

	let {
		selectedTestCaseIndex,
		challenge,
		class: className
	}: { selectedTestCaseIndex: number; challenge: Challenge; class?: string } = $props();
</script>

<Pane class={clsx('flex p-2 flex-col gap-1', className)}>
	<h2 class="font-semibold text-[1.25rem] px-1">Test Case #{selectedTestCaseIndex + 1}</h2>
	<div class="flex gap-2 flex-1 min-h-0">
		<Pane class="h-full flex-1 bg-black flex flex-col">
			<h3 class="text-center border-b border-white/20 py-3 mx-4">input</h3>
			<InputExample class="flex-1 min-h-0" input={challenge.testCases[selectedTestCaseIndex].input} />
		</Pane>
		<Pane class="h-full flex-1 bg-black flex flex-col">
			<h3 class="text-center border-b border-white/20 py-3 mx-4">output</h3>
			<InputExample class="flex-1 min-h-0" input={challenge.testCases[selectedTestCaseIndex].output} />
		</Pane>
	</div>
</Pane>
