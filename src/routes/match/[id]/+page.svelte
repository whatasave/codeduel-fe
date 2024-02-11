<script lang="ts">
	import ChallengeDescriptionPane from '$components/match/ChallengeDescriptionPane.svelte';
	import ConsolePane from '$components/match/ConsolePane.svelte';
	import EditorPane from '$components/match/EditorPane.svelte';
	import InputOutputPane from '$components/match/InputOutputPane.svelte';
	import PlayersPane from '$components/match/PlayersPane.svelte';
	import TestCasesPane from '$components/match/TestCasesPane.svelte';
	import type { LobbyStateByType, TestCaseState } from '$lib/types.js';

	let { data } = $props();
	let lobby = data.lobby.getLobby();
	let gameState = lobby.state as LobbyStateByType['game'];
	let testCaseStates: TestCaseState[] = $state(gameState.challenge.testCases.map(() => 'none'));
	let selectedLanguageIndex = $state(0);
	let selectedTestCaseIndex = $state(0);
	let selectedLanguage = $derived(lobby.settings.allowedLanguages[selectedLanguageIndex]);
</script>

<div class="flex h-full p-2 gap-2">
	<PlayersPane players={lobby.users} />
	<div class="flex flex-col flex-[0.7_0.7_0%] gap-2 overflow-hidden">
		<ChallengeDescriptionPane class="flex-1 min-h-0" challenge={gameState.challenge} />
		<InputOutputPane class="h-80" challenge={gameState.challenge} {selectedTestCaseIndex} />
		<TestCasesPane challenge={gameState.challenge} {testCaseStates} bind:selectedTestCaseIndex />
	</div>
	<div class="flex flex-col flex-1 gap-2">
		<EditorPane class="flex-1" {lobby} bind:selectedLanguageIndex />
		<ConsolePane class="h-80" />
	</div>
</div>
