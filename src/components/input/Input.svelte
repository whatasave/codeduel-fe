<script lang="ts">
	import { cva, type VariantProps } from 'class-variance-authority';
	import type { HTMLInputAttributes } from 'svelte/elements';

	const classes = cva(
		[
			'outline-none border-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
			'disabled:cursor-not-allowed disabled:opacity-50 disabled:text-white/50',
			'w-fit h-fit min-w-0'
		],
		{
			variants: {
				variant: {
					primary: 'bg-white/5 rounded-sm px-2 py-1'
				}
			}
		}
	);

	interface $Props extends HTMLInputAttributes, VariantProps<typeof classes> {}

	let { variant = 'primary', value = $bindable(), class: customClass, ...props }: $Props = $props();
</script>

<input {value} {...props} class={classes({ variant, className: customClass })} />
