<script lang="ts">
	import Pane from '$components/Pane.svelte';
	import Select from '$components/Select.svelte';
	import Editor from '$components/editor/Editor.svelte';
	import { languageTemplate, toHumanString } from '$lib/languages';
	import type { Challenge, Lobby } from '$lib/types';
	import clsx from 'clsx';

	let {
		lobby,
		selectedLanguageIndex,
		class: className
	} = $props<{
		lobby: Lobby;
		selectedLanguageIndex: number;
		class?: string;
	}>();
	let selectedLanguage = $derived(lobby.settings.allowedLanguages[selectedLanguageIndex]);
	let code = $state(languageTemplate(lobby.settings.allowedLanguages[selectedLanguageIndex]) ?? '');
</script>

<Pane class={clsx('flex flex-col', className)}>
	<div class="flex px-4 py-4">
		<Select
			options={lobby.settings.allowedLanguages}
			bind:selectedIndex={selectedLanguageIndex}
			mapToString={(language) => toHumanString(language)}
			onselect={() => {
				code = languageTemplate(lobby.settings.allowedLanguages[selectedLanguageIndex]) ?? '';
			}}
		/>
	</div>
	<Editor language={selectedLanguage} class="flex-1 p-4" bind:value={code} />
</Pane>
