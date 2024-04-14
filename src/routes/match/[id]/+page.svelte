<script lang="ts">
	import Pane from '$components/Pane.svelte';
	import Button from '$components/button/Button.svelte';
	import ChallengeDescriptionPane from '$components/match/ChallengeDescriptionPane.svelte';
	import ConsolePane from '$components/match/ConsolePane.svelte';
	import EditorPane from '$components/match/EditorPane.svelte';
	import InputOutputPane from '$components/match/InputOutputPane.svelte';
	import PlayersPane from '$components/match/PlayersPane.svelte';
	import TestCasesPane from '$components/match/TestCasesPane.svelte';
	import Timer from '$components/match/Timer.svelte';
	import { languageTemplate } from '$lib/languages.js';
	import type { LobbyStateByType, TestCaseState } from '$lib/types.js';
	import dayjs from 'dayjs';

	let { data } = $props();
	let lobby = $derived(data.lobby.getLobby());
	let gameState = $derived(lobby.state as LobbyStateByType['game']);
	let testCaseStates: TestCaseState[] = $state((() => gameState.challenge.testCases.map(() => ({ type: 'none' })))());
	let selectedLanguageIndex = $state(0);
	let selectedTestCaseIndex = $state(0);
	let selectedLanguage = $derived(lobby.settings.allowedLanguages[selectedLanguageIndex]);
	let code = $state((() => languageTemplate(selectedLanguage) ?? '')());
	let canSubmit = $state(false);

	async function onSubmit() {
		console.log('submit');
	}

	async function onRun() {
		const result = await data.lobby.check({ language: selectedLanguage, code });
		if (result.error) {
			console.error(result.error);
		} else {
			result.result!.forEach((result, i) => {
				let state: TestCaseState = { type: 'none' };
				if (result.status) {
					state = {
						type: 'failure',
						cause: 'status',
						status: result.status,
						output: result.output,
						errors: result.errors
					};
				} else if (result.errors) {
					state = { type: 'failure', cause: 'errors', output: result.output, errors: result.errors };
				} else if (result.output !== gameState.challenge.testCases[i].output) {
					state = { type: 'failure', cause: 'test', output: result.output };
				} else {
					state = { type: 'success' };
				}
				testCaseStates[i] = state;
			});
			for (let i = result.result!.length; i < gameState.challenge.testCases.length; i++) {
				testCaseStates[i] = { type: 'skipped' };
			}
			if (testCaseStates.every((state) => state.type === 'success')) {
				canSubmit = true;
			}
		}
	}
</script>

<div class="flex h-full flex-col gap-2 p-2">
	<Pane class="flex shrink-0 justify-center gap-2 p-2 ">
		<Timer time={dayjs(gameState.startTime).add(lobby.settings.gameDuration, 'ms').toISOString()} />
		<Button variant="primary" text="Run" onclick={onRun} />
		<Button variant="accent" text="Submit" onclick={onSubmit} disabled={!canSubmit} />
	</Pane>
	<div class="flex h-full gap-2">
		<PlayersPane players={lobby.users} />

		<!-- Statement / Tests -->
		<div class="flex flex-[0.7_0.7_0%] flex-col gap-2">
			<ChallengeDescriptionPane class="min-h-0 flex-1" challenge={gameState.challenge} />
			<InputOutputPane class="h-80" challenge={gameState.challenge} {selectedTestCaseIndex} />
			<TestCasesPane challenge={gameState.challenge} {testCaseStates} bind:selectedTestCaseIndex />
		</div>

		<!-- Editor / Console -->
		<div class="flex flex-1 flex-col gap-2">
			<EditorPane
				class="flex-1"
				{lobby}
				bind:selectedLanguageIndex
				bind:code
				onchangecode={() => (canSubmit = false)}
				onchangelanguage={() => (canSubmit = false)}
			/>
			<ConsolePane class="h-80" />
		</div>
	</div>
</div>
