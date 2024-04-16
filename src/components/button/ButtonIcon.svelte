<script lang="ts">
	import type { ComponentProps, ComponentType, SvelteComponent } from 'svelte';
	import Clickable from './Clickable.svelte';
	import { cva, type VariantProps } from 'class-variance-authority';

	const classes = cva('w-fit h-fit disabled:opacity-60 disabled:cursor-not-allowed', {
		variants: {
			variant: {
				primary: 'px-6 py-1 bg-[#151515] text-white rounded-sm font-semibold',
				accent: 'px-6 py-1 bg-[#ECC206] rounded-sm text-black font-semibold',
				empty: 'px-6 py-1 border-2 text-white border-white rounded-sm font-semibold',
				danger: 'px-6 py-1 bg-red-500 text-white rounded-sm font-semibold'
			}
		}
	});

	interface $$Props extends Omit<ComponentProps<Clickable>, 'children'>, VariantProps<typeof classes> {
		text?: string;
		icon: ComponentType<SvelteComponent>;
		iconClass?: string;
		iconAlign?: 'left' | 'right';
		iconFill?: string;
	}

	let {
		text,
		class: className,
		variant,
		icon,
		iconClass,
		iconAlign = 'right',
		iconFill = '#ffffff',
		...props
	}: $$Props = $props();
</script>

<Clickable {...props} class={classes({ variant, className })}>
	<div class="flex items-center gap-2" class:flex-row-reverse={iconAlign === 'left'}>
		{#if text}
			<span>{text}</span>
		{/if}
		<svelte:component this={icon} class={iconClass} fill={iconFill} />
	</div>
</Clickable>
