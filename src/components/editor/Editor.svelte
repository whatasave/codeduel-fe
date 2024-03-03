<script lang="ts">
	import type { Language } from '$lib/types';
	import { editor } from 'monaco-editor';
	import * as monaco from 'monaco-editor';
	import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
	import { tick } from 'svelte';

	self.MonacoEnvironment = {
		getWorker(_: string, label: string) {
			return new editorWorker();
		}
	};

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

	let { value, language, class: className } = $props<{ value: string; language: Language; class?: string }>();
	let externalChange = true;
	let ide: editor.IStandaloneCodeEditor | undefined;
	$effect(() => editor.setModelLanguage(ide!.getModel()!, language));
	$effect(() => {
		if (externalChange) ide?.setValue(value);
	});

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
		ide.onDidChangeModelContent(async () => {
			externalChange = false;
			value = ide!.getValue();
			await tick();
			externalChange = true;
		});

		return {
			update() {},
			destroy() {
				editor.getModels().forEach((model) => model.dispose());
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
