<script lang="ts">
	import type { TestCase, TestCaseState } from '$lib/types';
	import clsx from 'clsx';
	import type { MouseEventHandler } from 'svelte/elements';

	interface $Props {
		value: TestCase;
		state: TestCaseState;
		selected?: boolean;
		title: string;
		class?: string;
		onclick?: MouseEventHandler<HTMLButtonElement>;
	}

	let { state, title, selected, class: className, onclick }: $Props = $props();
</script>

<button type="button" class={className} {title} {onclick}>
	<div
		class={clsx(
			'flex size-full items-center justify-center overflow-hidden rounded-full font-mono text-sm font-bold text-black',
			{
				'border-4 border-gray-600 ': state.type === 'none' || state.type == 'skipped',
				'border-4 border-red-800': state.type === 'failure',
				'border-4 border-green-800 ': state.type === 'success',

				'bg-gray-800 ': (selected && state.type === 'none') || state.type == 'skipped',
				'bg-red-800': selected && state.type === 'failure',
				'bg-green-800 ': selected && state.type === 'success'
				// 'border-4 bg-gray-800': selected
			}
		)}
	></div>
	<!-- #{testNumber + 1} -->
</button>
