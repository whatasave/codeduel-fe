<script lang="ts">
	import type { ComponentType, SvelteComponent } from 'svelte';
	import { type VariantProps } from 'class-variance-authority';
	import { Loading } from '$components/icons';
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import { ButtonStyles } from './ButtonStyles';

	interface $$Props extends HTMLAnchorAttributes, VariantProps<typeof ButtonStyles> {
		icon: {
			icon: ComponentType<SvelteComponent>;
			class?: string;
			align?: 'left' | 'right';
			fill?: string;
		};
		text?: string;
	}

	let { text, class: className, variant, icon, ...props }: $$Props = $props();
</script>

<a {...props} class={ButtonStyles({ variant, className })}>
	<div class="flex items-center gap-2" class:flex-row-reverse={icon.align === 'left'}>
		{#if text}
			<span>{text}</span>
		{/if}
		<svelte:component this={icon.icon} class={icon.class} fill={icon.fill} />
	</div>
	{#snippet loading()}
		<Loading fill="#ffffff" />
	{/snippet}
</a>
