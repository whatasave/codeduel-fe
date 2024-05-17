<script lang="ts">
	import clsx from 'clsx';
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface $Props extends HTMLInputAttributes {
		value: boolean;
		name?: string;
		class?: string;
	}

	let { value = $bindable(false), name = '', class: customClass, ...props }: $Props = $props();
</script>

<label class={clsx('flex cursor-pointer items-center gap-2')}>
	<input type="checkbox" class="hidden" {...props} bind:checked={value} />
	<span
		class={clsx('rounded p-1 px-4 font-mono text-xs font-bold uppercase', customClass, {
			'bg-[#82d332] text-[#020a0f]': value,
			'bg-white/5 text-white/80': !value
		})}
	>
		{name}
	</span>
</label>
