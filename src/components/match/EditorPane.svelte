<script lang="ts">
	import Pane from '$components/Pane.svelte';
	import Select from '$components/input/Select.svelte';
	import Editor from '$components/editor/Editor.svelte';
	import { languageTemplate, toHumanString } from '$lib/languages';
	import type { Lobby } from '$lib/types';
	import clsx from 'clsx';
	import Button from '$components/button/Button.svelte';

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
	<div class="flex items-center gap-2 px-2 pt-2">
		<Select
			options={lobby.settings.allowedLanguages}
			class="w-60"
			bind:selectedIndex={selectedLanguageIndex}
			mapToString={(language) => toHumanString(language)}
			onselect={() => {
				code = languageTemplate(selectedLanguage) ?? '';
				onchangelanguage?.(selectedLanguage);
				onchangecode?.(code);
			}}
		/>
		<Button variant="primary" text="Restore Last Submitted" />
		<Button variant="primary" text="Restore Default" />
	</div>
	<Editor class="flex-1 p-2 px-3" language={selectedLanguage} bind:value={code} {onchangecode} />
</Pane>
