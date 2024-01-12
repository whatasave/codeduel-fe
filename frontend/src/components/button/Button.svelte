<script lang="ts">
	import clsx from 'clsx';
	import { cva, type VariantProps } from 'class-variance-authority';
	import type { ComponentProps } from 'svelte';
	import ButtonLike from './ButtonLike.svelte';

	const classes = cva('', {
		variants: {
			variant: {
				primary: 'primary',
				secondary: 'secondary'
			},
			size: {
				small: 'small',
				medium: 'medium'
			}
		}
	});

	interface $$Props extends Omit<ComponentProps<ButtonLike>, 'children'>, VariantProps<typeof classes> {
		text: string;
	}

	let { text, class: className, variant, ...props } = $props<$$Props>();
</script>

<ButtonLike {...props} class={clsx(classes, className)}>
	{text}
</ButtonLike>
