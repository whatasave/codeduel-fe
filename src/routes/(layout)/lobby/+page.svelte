<script lang="ts">
	import Button from '$components/button/Button.svelte';
	import ButtonLink from '$components/button/ButtonLink.svelte';
	import LobbyListItem from '$components/lobby/LobbyListItem.svelte';
	import backend from '$lib/backend';
	import { isSuccess } from '$lib/result';
	import type { SimpleLobby } from '$lib/types';
	import type { PageData } from '../$types';

	const { data }: { data: PageData } = $props();

	const LOBBY_REFRESH_INTERVAL = 1000;
	let lobbies = $state<SimpleLobby[]>([]);

	async function fetchLobbies() {
		console.log('Fetching lobbies');
		const lobbiesData = await backend.getLobbies();
		if (isSuccess(lobbiesData)) {
			lobbies = lobbiesData.data;
		}
	}

	$effect(() => {
		fetchLobbies();

		// const lobbiesRefresher = setInterval(fetchLobbies, LOBBY_REFRESH_INTERVAL);
		// return () => { clearInterval(lobbiesRefresher); };
	});
</script>

<div class="m-auto flex w-full max-w-[60rem] gap-2 overflow-y-auto px-2">
	<div class="flex w-full min-w-[25rem] flex-col gap-2">
		<div class="flex items-center justify-between rounded bg-white/5 p-4">
			<p class="text-3xl font-bold">Lobbies</p>

			<!-- Actions -->
			<div class="flex gap-4">
				<Button text="Refresh" variant="primary" onclick={fetchLobbies} />
				{#if data.user}
					<ButtonLink href="/lobby/create" data-sveltekit-preload-data="off" text="Create" variant="accent" />
				{/if}
			</div>
		</div>

		{#each lobbies as lobby}
			<LobbyListItem {lobby} />
		{/each}
	</div>
</div>
