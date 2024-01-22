<script lang="ts">
	import Pane from '$components/Pane.svelte';
	import Select from '$components/Select.svelte';
	import Editor from '$components/editor/Editor.svelte';
	import { languageTemplate, toHumanString } from '$lib/languages';
	import type { Challenge } from '$lib/types';
	import clsx from 'clsx';

	let {
		challenge,
		selectedLanguageIndex,
		class: className
	} = $props<{
		challenge: Challenge;
		selectedLanguageIndex: number;
		class?: string;
	}>();
	let selectedLanguage = $derived(challenge.allowedLanguages[selectedLanguageIndex]);
	let code = $state(languageTemplate(challenge.allowedLanguages[selectedLanguageIndex]) ?? '');
</script>

<Pane class={clsx('flex flex-col', className)}>
	<div class="flex px-4 py-4">
		<Select
			options={challenge.allowedLanguages}
			bind:selectedIndex={selectedLanguageIndex}
			mapToString={(language) => toHumanString(language)}
			onselect={() => {
				code = languageTemplate(challenge.allowedLanguages[selectedLanguageIndex]) ?? '';
			}}
		/>
	</div>
	<Editor language={selectedLanguage} class="flex-1 p-4" bind:value={code} />
</Pane>
