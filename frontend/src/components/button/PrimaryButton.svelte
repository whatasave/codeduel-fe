<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import Button from './Button.svelte';

	let { text, children, ...props } = $props<ComponentProps<Button> & { text: string }>();
</script>

<Button
	class="flex items-center justify-center px-4 py-2 bg-orange-400 rounded w-fit h-fit"
	{...props}
>
	{text}
</Button>
