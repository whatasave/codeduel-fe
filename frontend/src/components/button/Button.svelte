<script lang="ts">
	import { cva, type VariantProps } from 'class-variance-authority';
	import type { ComponentProps } from 'svelte';
	import ButtonLike from './ButtonLike.svelte';

	const classes = cva('w-fit h-fit', {
		variants: {
			variant: {
				primary: '',
				accent: 'px-8 py-2 bg-[#ECC206] rounded-sm text-black text-[1.25rem] font-semibold'
			}
		}
	});

	interface $$Props extends Omit<ComponentProps<ButtonLike>, 'children'>, VariantProps<typeof classes> {
		text: string;
	}

	let { text, class: className, variant, ...props } = $props<$$Props>();
</script>

<ButtonLike {...props} class={classes({ variant, className })}>
	{text}
</ButtonLike>
