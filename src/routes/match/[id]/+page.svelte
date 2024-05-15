<script lang="ts">
	import { beforeNavigate, goto } from '$app/navigation';
	import Pane from '$components/Pane.svelte';
	import ButtonIcon from '$components/button/ButtonIcon.svelte';
	import { Play, Upload } from '$components/icons';
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
		const result = await data.lobby.submit({ language: selectedLanguage, code: code.trim() });
		if (result.error) {
			console.log(result.error);
			console.error(result.error);
		} else {
			console.log(result);
			goto(`/result/${lobby.id}`);
		}
	}

	async function onRun() {
		const result = await data.lobby.check({ language: selectedLanguage, code: code.trim() });
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
			if (testCaseStates.some((state) => state.type === 'success')) {
				canSubmit = true;
			}
		}
	}

	beforeNavigate(() => {
		data.lobby.close();
	});
</script>

<div class="flex h-full flex-col gap-2 p-2">
	<Pane class="flex justify-center gap-2 p-2 ">
		<Timer time={dayjs(gameState.startTime).add(data.lobby.getGameDurationInMinutes(), 'minutes').toISOString()} />
		<ButtonIcon variant="accent" text="Run" icon={{ icon: Play, align: 'left', class: 'size-4', fill: "#020a0f" }} onclick={onRun} />
		<ButtonIcon
			variant="primary"
			text="Submit"
			icon={{ icon: Upload, align: 'left', class: 'size-4', fill: '#8DD741' }}
			onclick={onSubmit}
			disabled={!canSubmit}
		/>
	</Pane>
	<div class="flex flex-1 min-h-0 gap-2">
		<PlayersPane players={lobby.users} />

		<!-- Statement / Tests -->
		<div class="flex flex-[0.7_0.7_0%] min-w-0 flex-col gap-2">
			<ChallengeDescriptionPane class="min-h-0 flex-1" challenge={gameState.challenge} />
			<InputOutputPane class="min-h-0 max-h-[15rem] flex-1" challenge={gameState.challenge} {selectedTestCaseIndex} />
			<TestCasesPane class="min-h-0" challenge={gameState.challenge} {testCaseStates} bind:selectedTestCaseIndex />
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
			<ConsolePane
				testCaseIndex={selectedTestCaseIndex}
				testCase={testCaseStates[selectedTestCaseIndex]}
				class="min-h-60"
			/>
		</div>
	</div>
</div>
