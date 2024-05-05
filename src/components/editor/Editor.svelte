<script lang="ts">
	import type { Language } from '$lib/types';
	import { editor } from 'monaco-editor';
	import { tick } from 'svelte';
	import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
	import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
	import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
	import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
	import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

	self.MonacoEnvironment = {
		getWorker(_, label) {
			if (label === 'json') {
				return new jsonWorker();
			}
			if (label === 'css' || label === 'scss' || label === 'less') {
				return new cssWorker();
			}
			if (label === 'html' || label === 'handlebars' || label === 'razor') {
				return new htmlWorker();
			}
			if (label === 'typescript' || label === 'javascript') {
				return new tsWorker();
			}
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
			'editor.selectionBackground': '#202020',
			'editor.lineHighlightBackground': '#101010'
		}
	});

	let {
		value = $bindable(),
		language,
		class: className,
		onchangecode
	}: {
		value: string;
		language: Language;
		class?: string;
		onchangecode?: (code: string) => void;
	} = $props();
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
			onchangecode?.(value);
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
