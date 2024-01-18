<script lang="ts">
	import InputExample from '$components/InputExample.svelte';
	import Markdown from '$components/Markdown.svelte';
	import Pane from '$components/Pane.svelte';
	import TestCase from '$components/TestCase.svelte';
	import Button from '$components/button/Button.svelte';
	import Editor from '$components/editor/Editor.svelte';

	let { data } = $props();
	let testCaseStates: TestCaseState[] = $state(data.challenge.testCases.map(() => 'none'));

	function scrollHorizontally(this: HTMLDivElement, e: WheelEvent) {
		this.scrollLeft -= e.deltaY;
	}
</script>

<div class="flex h-full p-2 gap-2">
	<Pane class="flex flex-col w-20"></Pane>
	<div class="flex flex-col flex-[0.7_0.7_0%] gap-2 overflow-hidden">
		<Pane class="flex flex-col flex-1 min-h-0 p-4 pr-2">
			<Markdown class="flex-1 pr-2" source={data.challenge.description} />
		</Pane>
		<Pane class="flex p-2 flex-col h-80 gap-1">
			<h2 class="font-semibold text-[1.25rem] px-1">Examples</h2>
			<div class="flex gap-2 flex-1">
				<Pane class="h-full flex-1 bg-black flex flex-col">
					<h3 class="text-center border-b border-white/20 py-3 mx-4">input</h3>
					<InputExample input={'test test test test test test test test test test test test test\ntest'} />
				</Pane>
				<Pane class="h-full flex-1 bg-black flex flex-col">
					<h3 class="text-center border-b border-white/20 py-3 mx-4">output</h3>
					<InputExample input={'test test test test test test test test test test test test test\ntest'} />
				</Pane>
			</div>
		</Pane>
		<Pane class="flex p-2 items-center gap-4">
			<div
				class="flex-1 min-w-0 flex gap-2 pl-1 overflow-x-auto scrollbar-hide scrollbar-touch"
				on:wheel={scrollHorizontally}
			>
				{#each data.challenge.testCases as testCase, i}
					<TestCase state={testCaseStates[i]} value={testCase} />
				{/each}
			</div>
			<Button class="w-32" variant="accent" text="check" />
		</Pane>
	</div>
	<div class="flex flex-col flex-1 gap-2">
		<Pane class="flex flex-col flex-1">
			<Editor language="cpp" class="flex-1 p-4" />
		</Pane>
		<Pane class="flex flex-col h-80"></Pane>
	</div>
</div>
