<script lang="ts">
	import type { TestCase, TestCaseState } from '$lib/types';
	import clsx from 'clsx';
	import type { MouseEventHandler } from 'svelte/elements';

	let {
		state,
		testNumber,
		onclick
	}: {
		value: TestCase;
		state: TestCaseState;
		testNumber: number;
		onclick?: MouseEventHandler<HTMLButtonElement>;
	} = $props();
</script>

<button
	type="button"
	title="Test Case {testNumber + 1}"
	class={clsx(
		'flex size-7 items-center justify-center overflow-hidden rounded-full font-mono text-sm font-bold text-black',
		{
			'border-2 border-[#939393] bg-[#A3A3A3]': state.type === 'none' || state.type == 'skipped',
			'border-2 border-red-500 bg-[#FF5E5E]': state.type === 'failure',
			'border-2 border-green-500 bg-[#36D780]': state.type === 'success'
		}
	)}
	{onclick}
>
	<!-- #{testNumber + 1} -->
</button>
