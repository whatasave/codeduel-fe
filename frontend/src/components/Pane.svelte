<script lang="ts">
	import clsx from 'clsx';
	import type { HTMLAttributes } from 'svelte/elements';

	let { class: className, children } = $props<HTMLAttributes<HTMLDivElement>>();
</script>

<div class={clsx('bg-[#151515] rounded', className)}>
	{#if children}
		{@render children()}
	{/if}
</div>
