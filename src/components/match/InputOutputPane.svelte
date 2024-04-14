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

<Pane class={clsx('flex min-h-0 flex-1 flex-col gap-1 p-2', className)}>
	<h2 class="px-1 text-[1.25rem] font-semibold">Test Case #{selectedTestCaseIndex + 1}</h2>
	<div class="flex min-h-0 flex-1 gap-2">
		<Pane class="flex h-full flex-1 flex-col bg-black">
			<h3 class="mx-4 border-b border-white/20 py-3 text-center">input</h3>
			<InputExample class="min-h-0 flex-1" input={challenge.testCases[selectedTestCaseIndex].input} />
		</Pane>
		<Pane class="flex h-full flex-1 flex-col bg-black">
			<h3 class="mx-4 border-b border-white/20 py-3 text-center">output</h3>
			<InputExample class="min-h-0 flex-1" input={challenge.testCases[selectedTestCaseIndex].output} />
		</Pane>
	</div>
</Pane>
