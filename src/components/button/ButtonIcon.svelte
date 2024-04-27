<script lang="ts">
	import type { ComponentProps, ComponentType, SvelteComponent } from 'svelte';
	import Clickable from './Clickable.svelte';
	import { type VariantProps } from 'class-variance-authority';
	import { Loading } from '$components/icons';
	import { styles } from './styles';

	type IconComp = {
		icon: ComponentType<SvelteComponent>;
		class?: string;
		align?: 'left' | 'right';
		fill?: string;
	};
	interface $$Props extends Omit<ComponentProps<Clickable>, 'children'>, VariantProps<typeof styles> {
		icon: IconComp;
		text?: string;
	}

	let { text, class: className, variant, icon, ...props }: $$Props = $props();
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
