<script lang="ts">
	import type { ComponentType, SvelteComponent } from 'svelte';
	import { type VariantProps } from 'class-variance-authority';
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import { styles } from './styles';

	interface $$Props extends HTMLAnchorAttributes, VariantProps<typeof styles> {
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

<a {...props} class={styles({ variant, className })}>
	<div class="flex items-center gap-2" class:flex-row-reverse={icon.align === 'left'}>
		{#if text}
			<span>{text}</span>
		{/if}
		<svelte:component this={icon.icon} class={icon.class} fill={icon.fill} />
	</div>
</a>
