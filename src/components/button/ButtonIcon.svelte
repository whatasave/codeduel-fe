<script lang="ts">
	import type { ComponentProps, ComponentType, SvelteComponent } from 'svelte';
	import ButtonLike from './ButtonLike.svelte';

	type $$Props = Omit<ComponentProps<ButtonLike>, 'children'> & {
		text: string;
		icon: ComponentType<SvelteComponent>;
	};

	let { text, class: className, icon, ...props }: $$Props = $props();
</script>

<ButtonLike {...props}>
	<svelte:component this={icon} />
</ButtonLike>
