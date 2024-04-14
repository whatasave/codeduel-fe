<script lang="ts">
	import { cva, type VariantProps } from 'class-variance-authority';
	import type { ComponentProps } from 'svelte';
	import ButtonLike from './ButtonLike.svelte';

	const classes = cva('w-fit h-fit', {
		variants: {
			variant: {
				primary: 'px-6 py-1 bg-[#151515] text-white rounded-sm font-semibold',
				accent: 'px-6 py-1 bg-[#ECC206] rounded-sm text-black font-semibold',
				empty: 'px-6 py-1 border-2 text-white border-white rounded-sm font-semibold',
				danger: 'px-6 py-1 bg-red-500 text-white rounded-sm font-semibold'
			}
		}
	});

	interface $$Props extends Omit<ComponentProps<ButtonLike>, 'children'>, VariantProps<typeof classes> {
		text: string;
	}

	let { text, class: className, variant, ...props }: $$Props = $props();
</script>

<ButtonLike {...props} class={classes({ variant, className })}>
	{text}
</ButtonLike>
