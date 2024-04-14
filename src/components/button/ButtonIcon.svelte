<script lang="ts">
	import type { ComponentProps, ComponentType, SvelteComponent } from 'svelte';
	import ButtonLike from './ButtonLike.svelte';
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

	interface $$Props extends Omit<ComponentProps<ButtonLike>, 'children'>, VariantProps<typeof classes> {
		text?: string;
		iconClass?: string;
		iconAlign?: 'left' | 'right';
		icon: ComponentType<SvelteComponent>;
	}

	let { text, class: className, variant, icon, iconClass, iconAlign = 'right', ...props }: $$Props = $props();
</script>

<ButtonLike {...props} class={classes({ variant, className })}>
	<div class="flex items-center gap-2">
		{#if iconAlign === 'left'}
			<svelte:component this={icon} class={iconClass} />
		{/if}
		{#if text}
			<span>{text}</span>
		{/if}
		{#if iconAlign === 'right'}
			<svelte:component this={icon} class={iconClass} />
		{/if}
	</div>
</ButtonLike>
