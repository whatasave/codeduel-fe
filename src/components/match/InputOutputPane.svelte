<script lang="ts">
	import InputExample from '$components/match/InputExample.svelte';
	import Pane from '$components/Pane.svelte';
	import type { Challenge } from '$lib/types';
	import clsx from 'clsx';

	let {
		selectedTestCaseIndex,
		challenge,
		class: customClass
	}: { selectedTestCaseIndex: number; challenge: Challenge; class?: string } = $props();
</script>

<Pane class={clsx('flex flex-col gap-2 p-2', customClass)}>
	<h2 class="text-xl font-semibold">Test Case #{selectedTestCaseIndex + 1}</h2>
	<div class="flex flex-1 gap-2">
		<Pane class="flex flex-1 flex-col bg-black">
			<h3 class="mx-4 border-b border-white/20 py-2 text-center uppercase">input</h3>
			<InputExample class="min-h-0 flex-1" input={challenge.testCases[selectedTestCaseIndex].input} />
		</Pane>
		<Pane class="flex flex-1 flex-col bg-black">
			<h3 class="mx-4 border-b border-white/20 py-2 text-center uppercase">output</h3>
			<InputExample class="min-h-0 flex-1" input={challenge.testCases[selectedTestCaseIndex].output} />
		</Pane>
	</div>
</Pane>
