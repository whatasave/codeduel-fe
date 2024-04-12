<script lang="ts">
	import { marked } from 'marked';
	import DOMPurify from 'dompurify';
	import clsx from 'clsx';

	let { source, class: className }: { source: string; class?: string } = $props();
</script>

<div class={clsx('markdown overflow-auto', className)}>
	{#await marked.parse(source) then html}
		{@html DOMPurify.sanitize(html)}
	{/await}
</div>

<style>
	.markdown :global(h2) {
		font-size: 1.5rem;
		border-bottom: 1px solid #252525;
		padding-bottom: 0.25rem;
		margin-bottom: 1rem;
		font-weight: 500;
		color: #a0a0a0;
	}

	.markdown :global(h2:not(:first-child)) {
		margin-top: 1rem;
	}
</style>
