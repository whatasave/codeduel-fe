<script lang="ts">
	import { type VariantProps } from 'class-variance-authority';
	import type { ComponentProps } from 'svelte';
	import Clickable from './Clickable.svelte';
	import { Loading } from '$components/icons';
	import { styles } from './styles';

	interface $$Props extends Omit<ComponentProps<Clickable>, 'children'>, VariantProps<typeof styles> {
		text: string;
	}

	let { text, class: className, variant, ...props }: $$Props = $props();
</script>

<Clickable {...props} class={styles({ variant, className })}>
	{text}
	{#snippet loading()}
		<Loading />
	{/snippet}
</Clickable>
