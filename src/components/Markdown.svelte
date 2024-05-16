<script lang="ts">
	import { marked } from 'marked';
	import DOMPurify from 'dompurify';
	import clsx from 'clsx';
	import { browser } from '$app/environment';
	import Loading from './icons/Loading.svelte';
	import { codeToHtml } from 'shiki';

	let { source, class: className }: { source: string; class?: string } = $props();

	marked.use({
		async: true,
		walkTokens: async (token) => {
			if (token.type === 'code') {
				try {
					const html = await codeToHtml(token.text, {
						lang: token.lang,
						theme: 'monokai',
						defaultColor: false
					});
					token.type = 'html';
					token.text = html;
				} catch (e) {
					console.error("Couldn't highlight code block: ", e);
				}
			}
		}
	});
</script>

<div class={clsx('markdown overflow-auto', className)}>
	{#if browser}
		{#await marked.parse(source) then html}
			{@html DOMPurify.sanitize(html)}
		{/await}
	{:else}
		<Loading fill="#8dd741" class="mx-auto" />
	{/if}
</div>

<style>
	:global(pre.shiki.monokai) {
		background-color: #ffffff15 !important;
		padding: 1rem !important;
		margin: 0.5rem 0 !important;
		border-radius: 0.5rem !important;
		line-height: 1.25 !important;
		overflow-x: auto !important;
	}
	:global(.line) {
		user-select: text !important;
	}

	.markdown {
		font-size: 1rem;
		line-height: 1.5;
		color: #ffffff;
	}

	.markdown :global(h1),
	.markdown :global(h2),
	.markdown :global(h3),
	.markdown :global(h4),
	.markdown :global(h5),
	.markdown :global(h6) {
		font-size: 2rem;
		font-weight: 700;
		margin: 0.75rem 0;
		padding: 0.25rem 0;
	}

	.markdown :global(h1),
	.markdown :global(h2),
	.markdown :global(h3) {
		border-bottom: 3px solid #ffffff15;
	}

	.markdown :global(h2) {
		font-size: 1.5rem;
	}

	.markdown :global(h3) {
		font-size: 1.25rem;
	}

	.markdown :global(h4) {
		font-size: 1rem;
	}

	.markdown :global(h5) {
		font-size: 0.875rem;
	}

	.markdown :global(h6) {
		font-size: 0.75rem;
	}

	.markdown :global(p) {
		margin: 0.75rem 0;
	}

	.markdown :global(a) {
		color: #8dd741;
		text-decoration: underline;
	}

	.markdown :global(code) {
		background-color: #ffffff15;
		padding: 0.2rem 0.5rem;
		border-radius: 0.5rem;
	}

	.markdown :global(pre) {
		background-color: #ffffff15;
		padding: 1rem;
		margin: 0.5rem 0;
		border-radius: 0.5rem;
		line-height: 1.25;
		overflow-x: auto;
	}

	.markdown :global(pre code) {
		background-color: transparent;
		color: inherit;
		padding: 0;
		border-radius: 0;
	}

	.markdown :global(img) {
		display: inline-block;
		max-width: 100%;
		height: auto;
	}

	.markdown :global(blockquote) {
		border-left: 0.25rem solid #8dd741;
		border-radius: 0.2rem;
		padding: 0.1rem 1rem;
		margin: 0.75rem 0;
	}

	.markdown :global(ul),
	.markdown :global(ol) {
		padding-left: 0.75rem;
	}

	.markdown :global(li) {
		margin: 0.25rem 0;
	}

	.markdown :global(table) {
		border-collapse: collapse;
	}

	.markdown :global(th),
	.markdown :global(td) {
		border: 1px solid #ffffff15;
		padding: 0.25rem 0.5rem;
	}

	.markdown :global(th) {
		background-color: #ffffff15;
	}

	.markdown :global(hr) {
		border: none;
		border-top: 1px solid #ffffff15;
		margin: 1rem 0;
	}
</style>
