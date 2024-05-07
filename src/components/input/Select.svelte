<script lang="ts">
	import type { HTMLSelectAttributes } from 'svelte/elements';
	import { cva, type VariantProps } from 'class-variance-authority';

	type T = $$Generic;

	const classes = cva(
		[
			'outline-none border-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
			'w-fit h-fit min-w-0 cursor-pointer'
		],
		{
			variants: {
				variant: {
					primary: 'bg-white/5 text-black rounded-sm px-2 py-1'
				}
			}
		}
	);

	interface $Props extends HTMLSelectAttributes, VariantProps<typeof classes> {
		options: T[];
		selectedIndex: number;
		mapToString: (option: T) => string;
		onselect?: (this: HTMLSelectElement) => void;
	}

	let {
		options,
		selectedIndex = $bindable(),
		mapToString,
		onselect,
		variant = 'primary',
		class: customClass,
		...props
	}: $Props = $props();

	function onchange(this: HTMLSelectElement) {
		selectedIndex = parseInt(this.value);
		onselect?.call(this);
	}
</script>

<select {...props} class={classes({ variant, className: customClass })} {onchange}>
	{#each options as option, i}
		<option value={i} selected={i == selectedIndex}>{mapToString(option)}</option>
	{/each}
</select>

<style lang="postcss">
	select {
		@apply rounded-sm bg-white/5 px-2 py-1 text-white;
	}

	select option {
		@apply appearance-none border-none outline-none;
		@apply rounded-sm bg-white/5 px-2 py-1 text-black;
	}
</style>
