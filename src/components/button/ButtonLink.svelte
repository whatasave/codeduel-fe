<script lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import { styles } from './styles';
	import type { VariantProps } from 'class-variance-authority';

	interface $$Props extends HTMLAnchorAttributes, VariantProps<typeof styles> {
		text: string;
	}

	let { text, class: className, variant, ...props }: $$Props = $props();
</script>

<a {...props} class={styles({ variant, className })}>
	{text}
</a>
