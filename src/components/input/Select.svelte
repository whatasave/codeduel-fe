<script lang="ts" generics="T">
	import type { HTMLSelectAttributes } from 'svelte/elements';

	import { cva, type VariantProps } from 'class-variance-authority';

	// cursor-pointer px-1 py-1
	const classes = cva(
		[
			'outline-none border-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
			'w-fit h-fit min-w-0 cursor-pointer'
		],
		{
			variants: {
				variant: {
					primary: 'bg-[#151515] rounded-sm px-2 py-1'
				}
			}
		}
	);

	interface $$Props extends HTMLSelectAttributes, VariantProps<typeof classes> {
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
	}: $$Props = $props();

	function onchange(this: HTMLSelectElement) {
		selectedIndex = parseInt(this.value);
		onselect?.call(this);
	}

	$effect(() => {
		console.log('options', options);
		console.log('selectedIndex', selectedIndex);
	});
</script>

<select {...props} class={classes({ variant, className: customClass })} {onchange}>
	{#each options as option, i}
		<option value={i} selected={i == selectedIndex}>{mapToString(option)}</option>
	{/each}
</select>
