<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import Button from './Button.svelte';

	let { text, ...props } = $props<{ text: string } & ComponentProps<Button>>();
</script>

<Button class="flex items-center justify-center px-4 py-2 bg-orange-400 w-fit h-fit" {...props}>
	{text}
</Button>
