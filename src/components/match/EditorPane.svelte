<script lang="ts">
	import Pane from '$components/Pane.svelte';
	import Select from '$components/Select.svelte';
	import Editor from '$components/editor/Editor.svelte';
	import { languageTemplate, toHumanString } from '$lib/languages';
	import type { Lobby } from '$lib/types';
	import clsx from 'clsx';

	let {
		lobby,
		code = $bindable(),
		selectedLanguageIndex = $bindable(),
		onchangelanguage,
		onchangecode,
		class: className
	}: {
		lobby: Lobby;
		selectedLanguageIndex: number;
		class?: string;
		code: string;
		onchangelanguage?: (language: string) => void;
		onchangecode?: (code: string) => void;
	} = $props();
	let selectedLanguage = $derived(lobby.settings.allowedLanguages[selectedLanguageIndex]);
</script>

<Pane class={clsx('flex flex-col', className)}>
	<div class="flex px-4 py-4">
		<Select
			options={lobby.settings.allowedLanguages}
			bind:selectedIndex={selectedLanguageIndex}
			mapToString={(language) => toHumanString(language)}
			onselect={() => {
				code = languageTemplate(selectedLanguage) ?? '';
				onchangelanguage?.(selectedLanguage);
				onchangecode?.(code);
			}}
		/>
	</div>
	<Editor class="flex-1 p-4" language={selectedLanguage} bind:value={code} {onchangecode} />
</Pane>
