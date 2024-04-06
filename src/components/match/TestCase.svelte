<script lang="ts">
	import type { TestCase, TestCaseState } from '$lib/types';
	import clsx from 'clsx';
	import type { MouseEventHandler } from 'svelte/elements';

	let { value, state, onclick } = $props<{
		value: TestCase;
		state: TestCaseState;
		onclick?: MouseEventHandler<HTMLButtonElement>;
	}>();
</script>

<button
	type="button"
	class={clsx('rounded-full min-h-10 min-w-10 max-h-10 max-w-10', {
		'bg-[#A3A3A3] border-2 border-[#939393]': state.type === 'none' || state.type == 'skipped',
		'bg-[#FF5E5E] border-2 border-red-500': state.type === 'failure',
		'bg-[#36D780] border-2 border-green-500': state.type === 'success'
	})}
	{onclick}
/>
