<script lang="ts">
	import type { ComponentProps } from 'svelte';
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

	interface $Props extends Omit<ComponentProps<Clickable>, 'children'>, VariantProps<typeof styles> {
		text: string;
		loaderColor?: string;
	}

	let {
		text,
		class: className,
		variant,
		loaderColor = variant == 'accent' ? 'black' : '#8DD741',
		...props
	}: $Props = $props();
</script>

<Clickable {...props} class={styles({ variant, className })}>
	{text}
	{#snippet loading()}
		<Loading class="mx-auto" fill={loaderColor} />
	{/snippet}
</Clickable>
