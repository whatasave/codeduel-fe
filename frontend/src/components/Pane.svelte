<script lang="ts">
	import clsx from 'clsx';
	import type { HTMLAttributes } from 'svelte/elements';

	let { class: className, children } = $props<HTMLAttributes<HTMLDivElement>>();
</script>

<section class={clsx('bg-[#090909] rounded overflow-hidden', className)}>
	{#if children}
		{@render children()}
	{/if}
</section>
