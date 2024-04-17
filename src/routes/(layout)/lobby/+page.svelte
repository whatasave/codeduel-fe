<script lang="ts">
	import ButtonLink from '$components/button/ButtonLink.svelte';
	import LobbyListItem from '$components/lobby/LobbyListItem.svelte';
	import backend from '$lib/backend';
	import { isSuccess } from '$lib/result';
	import type { SimpleLobby } from '$lib/types';

	const LOBBY_REFRESH_INTERVAL = 1000;
	let lobbies = $state<SimpleLobby[]>([]);

	async function fetchLobbies() {
		const lobbiesData = await backend.getLobbies();
		if (isSuccess(lobbiesData)) {
			lobbies = lobbiesData.data;
		}
	}

	$effect(() => {
		fetchLobbies();

		const lobbiesRefresher = setInterval(fetchLobbies, LOBBY_REFRESH_INTERVAL);

		return () => {
			clearInterval(lobbiesRefresher);
		};
	});
</script>

<div class="m-auto flex w-full max-w-[60rem] gap-2 overflow-y-auto px-2">
	<div class="flex w-full min-w-[25rem] flex-col gap-2">
		<div class="flex items-center justify-between rounded bg-[#050505] p-4">
			<p class="text-3xl font-bold">Lobbies</p>

			<!-- Actions -->
			<div class="flex gap-4">
				<ButtonLink href="/lobby/create" text="Create" variant="accent" />
			</div>
		</div>

		{#each lobbies as lobby}
			<LobbyListItem {lobby} />
		{/each}
	</div>
</div>
