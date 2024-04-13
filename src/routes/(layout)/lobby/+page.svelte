<script lang="ts">
	import Button from '$components/button/Button.svelte';
	import { PUBLIC_LOBBY_URL } from '$env/static/public';
	import type { User } from '$lib/types';
	import { onMount } from 'svelte';

	type Lobby = {
		id: string;
		owner: User;
		users: number;
		max_players: number;
		state: string;
	};

	let lobbies = $state<Lobby[]>([]);

	onMount(async () => {
		const res = await fetch(`http://${PUBLIC_LOBBY_URL}/lobbies`);
		lobbies = (await res.json()) as Lobby[];
	});
</script>

<div class="flex gap-2 w-full max-w-[60rem] m-auto overflow-y-auto">
	<div class="gap-2 flex flex-col w-full min-w-[25rem]">
		<div class="bg-[#050505] rounded p-4 flex justify-between items-center">
			<p class="text-3xl font-bold">Lobbies</p>
			<a href="/lobby/create">
				<Button text="Create" variant="primary" />
			</a>
		</div>

		{#each lobbies as lobby}
			<div class="bg-[#050505] rounded py-2 px-4 flex gap-2 items-center">
				<div>
					<img class="w-10 h-10 rounded-full" src={lobby.owner.avatar} alt={lobby.owner.username} />
				</div>
				<div class="flex flex-col flex-1">
					<p class="text-2xl font-semibold">{lobby.owner.username}'s lobby</p>
					<p>{lobby.state} | Locked | {lobby.users}/{lobby.max_players} Brogrammers</p>
				</div>
				<div class="flex gap-2">
					{#if lobby.state === 'game'}
						<a href={`/match/${lobby.id}`}>
							<Button text="Re-Join" class="text-sky-500" />
						</a>
					{:else}
						<a href={`/lobby/${lobby.id}`}>
							<Button text="Join" class="text-green-500" />
						</a>
					{/if}
					<!-- TODO use ButtonIcon -->
				</div>
			</div>
		{/each}
	</div>
</div>
