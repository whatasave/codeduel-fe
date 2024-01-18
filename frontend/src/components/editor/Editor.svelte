<script lang="ts">
	import type { Language } from '$lib/types';
	import { editor } from 'monaco-editor';

	let { value = '', class: className, language } = $props<{ value?: string; class?: string; language: Language }>();

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

	let ide: editor.IStandaloneCodeEditor | undefined;
	$effect(() => editor.setModelLanguage(ide!.getModel()!, language));

	function init(element: HTMLDivElement) {
		ide = editor.create(element, {
			value,
			language,
			theme: 'codeduel',
			automaticLayout: true,
			glyphMargin: false,
			tabSize: 2,
			fontSize: 18,
			lineNumbersMinChars: 1,
			renderWhitespace: 'selection',
			padding: {},
			minimap: {
				enabled: false
			},
			overviewRulerBorder: false
		});

		return {
			update() {},
			destroy() {
				ide?.dispose();
			}
		};
	}
</script>

<div class={className} use:init></div>

<style>
	div :global(.monaco-editor) {
		position: absolute !important;
		overflow: hidden !important;
	}
</style>
