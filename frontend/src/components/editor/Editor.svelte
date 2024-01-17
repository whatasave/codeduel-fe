<script lang="ts">
	import { editor } from 'monaco-editor';

	export let value: string = '';

	editor.defineTheme('codeduel', {
		base: 'vs-dark',
		inherit: true,
		rules: [],
		colors: {
			'editor.foreground': '#9cdcfe',
			'editor.background': '#090909',
			'editor.selectionBackground': '#191919',
			'editor.lineHighlightBackground': '#191919'
		}
	});

	function init(element: HTMLDivElement) {
		editor.create(element, {
			value,
			language: 'typescript',
			theme: 'codeduel',
			automaticLayout: true,
			glyphMargin: false,
			tabSize: 2,
			fontSize: 18,
			lineNumbersMinChars: 3,
			// letterSpacing: 0.7,
			renderWhitespace: 'selection',
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
