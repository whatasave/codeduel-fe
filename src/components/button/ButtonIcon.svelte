<script lang="ts">
	import type { ComponentProps, ComponentType, SvelteComponent } from 'svelte';
	import Clickable from './Clickable.svelte';
	import { Loading } from '$components/icons';
	import { cva, type VariantProps } from 'class-variance-authority';

	const styles = cva(
		'w-fit h-fit disabled:opacity-60 hover:opacity-90 duration-400 transition-all disabled:cursor-not-allowed font-semibold',
		{
			variants: {
				variant: {
					primary: 'px-6 py-1 bg-[#020a0f] text-[#8DD741] rounded-sm',
					accent: 'px-6 py-1 bg-[#82d332] rounded-sm text-[#01162E]',
					empty: 'px-6 py-1 border-2 text-[#8DD741] border-[#8DD741] rounded-sm',
					danger: 'px-6 py-1 bg-red-500 text-[#01162E] rounded-sm'
				}
			}
		}
	);

	type IconComp = {
		icon: ComponentType<SvelteComponent>;
		class?: string;
		align?: 'left' | 'right';
		fill?: string;
	};
	interface $Props extends Omit<ComponentProps<Clickable>, 'children'>, VariantProps<typeof styles> {
		icon: IconComp;
		text?: string;
	}

	let { text, class: className, variant, icon, ...props }: $Props = $props();
</script>

<Clickable {...props} class={styles({ variant, className })}>
	<div class="flex items-center gap-2" class:flex-row-reverse={icon.align === 'left'}>
		{#if text}
			<span>{text}</span>
		{/if}
		<svelte:component this={icon.icon} class={icon.class} fill={icon.fill} />
	</div>
	{#snippet loading()}
		<Loading fill="#ffffff" />
	{/snippet}
</Clickable>
