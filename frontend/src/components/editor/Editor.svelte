<script lang="ts">
	import { editor } from 'monaco-editor';

	export let value: string = '';

	function init(element: HTMLDivElement) {
		editor.create(element, {
			value,
			language: 'javascript',
			theme: 'vs-dark',
			automaticLayout: true,
			minimap: {
				enabled: false
			}
		});

		return {
			update() {},
			destroy() {}
		};
	}
</script>

<div class={$$props.class} use:init></div>

<style>
	div :global(.monaco-editor) {
		position: absolute !important;
	}
</style>
