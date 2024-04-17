<script lang="ts">
	import { type VariantProps } from 'class-variance-authority';
	import type { ComponentProps } from 'svelte';
	import Clickable from './Clickable.svelte';
	import { Loading } from '$components/icons';
	import { ButtonStyles } from './ButtonStyles';

	interface $$Props extends Omit<ComponentProps<Clickable>, 'children'>, VariantProps<typeof ButtonStyles> {
		text: string;
	}

	let { text, class: className, variant, ...props }: $$Props = $props();
</script>

<Clickable {...props} class={ButtonStyles({ variant, className })}>
	{text}
	{#snippet loading()}
		<Loading />
	{/snippet}
</Clickable>
