<script lang="ts">
	import clsx from 'clsx';

	let { input, class: className }: { input: string; class?: string } = $props();
</script>

<div class={clsx('m-4 select-text overflow-y-auto whitespace-pre-wrap rounded font-mono', className)}>
	{input}
</div>
