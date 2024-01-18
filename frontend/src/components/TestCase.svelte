<script lang="ts">
	import clsx from 'clsx';

	let { value, state } = $props<{ value: TestCase; state: TestCaseState }>();
</script>

<div
	class={clsx('rounded-full min-h-10 min-w-10 max-h-10 max-w-10', {
		'bg-[#A3A3A3] border-2 border-[#939393]': state === 'none',
		'bg-[#FF5E5E] border-2 border-red-500': state === 'failure',
		b: state === 'success'
	})}
/>
