<script lang="ts">
	import Pane from '$components/Pane.svelte';
	import TestCase from '$components/match/TestCase.svelte';
	import Button from '$components/button/Button.svelte';
	import type { Challenge, TestCaseState } from '$lib/types';
	import clsx from 'clsx';

	let {
		challenge,
		testCaseStates,
		selectedTestCaseIndex = $bindable(),
		class: className,
		canSubmit,
		oncheck
	}: {
		challenge: Challenge;
		testCaseStates: TestCaseState[];
		selectedTestCaseIndex: number;
		canSubmit: boolean;
		class?: string;
		oncheck: () => void;
	} = $props();

	function scrollHorizontally(this: HTMLDivElement, e: WheelEvent) {
		this.scrollLeft -= e.deltaY;
	}
</script>

<Pane class={clsx('flex items-center gap-4 p-2', className)}>
	<div
		class="scrollbar-hide scrollbar-touch flex min-w-0 flex-1 gap-2 overflow-x-auto pl-1"
		on:wheel={scrollHorizontally}
	>
		{#each challenge.testCases as testCase, i}
			<TestCase state={testCaseStates[i]} value={testCase} onclick={() => (selectedTestCaseIndex = i)} />
		{/each}
	</div>
	{#if canSubmit}
		<Button class="w-32" variant="accent" text="submit" onclick={oncheck} />
	{:else}
		<Button class="w-32" variant="accent" text="check" onclick={oncheck} />
	{/if}
</Pane>
