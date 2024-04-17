<script lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import { ButtonStyles } from './ButtonStyles';
	import type { VariantProps } from 'class-variance-authority';

	interface $$Props extends HTMLAnchorAttributes, VariantProps<typeof ButtonStyles> {
		text: string;
	}

	let { text, class: className, variant, ...props }: $$Props = $props();
</script>

<a {...props} class={ButtonStyles({ variant, className })}>
	{text}
</a>
