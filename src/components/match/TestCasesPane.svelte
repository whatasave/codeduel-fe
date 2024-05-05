<script lang="ts">
	import Pane from '$components/Pane.svelte';
	import TestCase from '$components/match/TestCase.svelte';
	import type { Challenge, TestCaseState } from '$lib/types';
	import clsx from 'clsx';

	let {
		challenge,
		testCaseStates,
		selectedTestCaseIndex = $bindable(),
		class: className
	}: {
		challenge: Challenge;
		testCaseStates: TestCaseState[];
		selectedTestCaseIndex: number;
		class?: string;
	} = $props();

	function scrollHorizontally(this: HTMLDivElement, e: WheelEvent) {
		this.scrollLeft -= e.deltaY;
	}
</script>

<Pane class={clsx('flex items-center gap-4 p-2', className)}>
	<div
		class="scrollbar-hide scrollbar-touch flex min-w-0 flex-1 justify-center gap-2 overflow-x-auto pl-1"
		onwheel={scrollHorizontally}
	>
		{#each challenge.testCases as testCase, i}
			<TestCase state={testCaseStates[i]} testNumber={i} value={testCase} onclick={() => (selectedTestCaseIndex = i)} />
		{/each}
	</div>
</Pane>
