<script lang="ts">
	import ChallengeDescriptionPane from '$components/match/ChallengeDescriptionPane.svelte';
	import ConsolePane from '$components/match/ConsolePane.svelte';
	import EditorPane from '$components/match/EditorPane.svelte';
	import InputOutputPane from '$components/match/InputOutputPane.svelte';
	import PlayersPane from '$components/match/PlayersPane.svelte';
	import TestCasesPane from '$components/match/TestCasesPane.svelte';
	import type { TestCaseState } from '$lib/types.js';

	let { data } = $props();
	let testCaseStates: TestCaseState[] = $state(data.challenge.testCases.map(() => 'none'));
	let selectedLanguageIndex = $state(0);
	let selectedTestCaseIndex = $state(0);
	let selectedLanguage = $derived(data.challenge.allowedLanguages[selectedLanguageIndex]);
</script>

<div class="flex h-full p-2 gap-2">
	<PlayersPane players={data.players} />
	<div class="flex flex-col flex-[0.7_0.7_0%] gap-2 overflow-hidden">
		<ChallengeDescriptionPane class="flex-1 min-h-0" challenge={data.challenge} />
		<InputOutputPane class="h-80" challenge={data.challenge} {selectedTestCaseIndex} />
		<TestCasesPane challenge={data.challenge} {testCaseStates} bind:selectedTestCaseIndex />
	</div>
	<div class="flex flex-col flex-1 gap-2">
		<EditorPane class="flex-1" challenge={data.challenge} bind:selectedLanguageIndex />
		<ConsolePane class="h-80" />
	</div>
</div>
