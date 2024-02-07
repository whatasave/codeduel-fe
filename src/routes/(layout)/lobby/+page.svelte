<script lang="ts">
	import Button from '$components/button/Button.svelte';
	import { onMount } from 'svelte';

	type LobbyType = {
		id: string;
		owner: string;
		players: string[];
		max_players: number;
		state: { type: string };
	};

	let lobbies = $state<LobbyType[]>([]);

	onMount(async () => {
		const res = await fetch('http://localhost:8080/lobbies');
		const data = await res.json();

		lobbies = data as LobbyType[];
	});
</script>

<div class="flex gap-2 w-full max-w-[60rem] max-h-[70vh] overflow-y-auto">
	<div class="gap-2 flex flex-col w-full min-w-[25rem]">
		<div class="bg-[#050505] rounded p-4 flex justify-between items-center">
			<p class="text-3xl font-bold">Lobbies</p>
			<a href="/lobby/create">
				<Button text="Create" variant="primary" />
			</a>
		</div>

		{#each lobbies as lobby}
			<div class="bg-[#050505] rounded py-2 px-4 flex gap-2 items-center">
				<div class="flex flex-col flex-1">
					<p class="text-2xl font-semibold">{lobby.owner}'s lobby</p>
					<p>{lobby.state.type} - Locked - {lobby.players}/{lobby.max_players} Brogrammers</p>
				</div>
				<div class="flex gap-2">
					<a href={`/lobby/${lobby.id}`}>
						<Button text="Join" />
					</a>
					<!-- TODO use ButtonIcon -->
				</div>
			</div>
		{/each}
	</div>
</div>
