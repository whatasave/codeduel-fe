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

<Pane class={clsx('flex p-2 items-center gap-4', className)}>
	<div
		class="flex-1 min-w-0 flex gap-2 pl-1 overflow-x-auto scrollbar-hide scrollbar-touch"
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
