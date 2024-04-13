<script lang="ts">
	import type { TestCase, TestCaseState } from '$lib/types';
	import clsx from 'clsx';
	import type { MouseEventHandler } from 'svelte/elements';

	let {
		value,
		state,
		onclick
	}: {
		value: TestCase;
		state: TestCaseState;
		onclick?: MouseEventHandler<HTMLButtonElement>;
	} = $props();
</script>

<button
	type="button"
	class={clsx('max-h-10 min-h-10 min-w-10 max-w-10 rounded-full', {
		'border-2 border-[#939393] bg-[#A3A3A3]': state.type === 'none' || state.type == 'skipped',
		'border-2 border-red-500 bg-[#FF5E5E]': state.type === 'failure',
		'border-2 border-green-500 bg-[#36D780]': state.type === 'success'
	})}
	{onclick}
/>
