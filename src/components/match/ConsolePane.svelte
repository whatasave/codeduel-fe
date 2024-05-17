<script lang="ts">
	import Pane from '$components/Pane.svelte';
	import type { TestCaseState } from '$lib/types';
	import clsx from 'clsx';

	let {
		testCase,
		testCaseIndex = 0,
		class: className
	}: { testCase?: TestCaseState; testCaseIndex?: number; class?: string } = $props();
</script>

<Pane class={clsx('flex flex-col gap-2 p-2', className)}>
	<div class="text-xl font-semibold">Console (Test Case #{testCaseIndex + 1})</div>
	{#if testCase && testCase.type === 'failure'}
		<!-- {JSON.stringify(testCase)} -->
		<pre class="min-h-0 flex-1 overflow-y-auto text-wrap rounded bg-black p-2 text-red-500">{testCase.output}</pre>
	{/if}
</Pane>
