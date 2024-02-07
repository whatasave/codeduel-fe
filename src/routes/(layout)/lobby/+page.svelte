<script lang="ts">
	import Button from '$components/button/Button.svelte';
	import { onMount } from 'svelte';

	type LobbyType = {
		id: string;
		state: { type: string };
		max_players: number;
		playerCount: number;
		owner: User;
		users: Record<string, User>;
	};

	type User = {
		id: 1;
		avatar: string;
		email: string;
		expires_at: string;
		token: string;
		username: string;
	};

	let lobbies = $state<LobbyType[]>([]);

	onMount(async () => {
		const res = await fetch('http://localhost:8080/lobbies');
		const data = await res.json();

		lobbies = data as LobbyType[];
		lobbies = lobbies.map((lobby) => ({
			...lobby,
			playerCount: Object.keys(lobby.users).length
		}));

		console.log(lobbies);
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
				<div>
					{#each Object.values(lobby.users) as user}
						<img class="w-8 h-8 rounded-full" src={user.avatar} alt={user.username} />
					{/each}
				</div>
				<div class="flex flex-col flex-1">
					<p class="text-2xl font-semibold">{lobby.owner.username}'s lobby</p>
					<p>
						{lobby.state.type} | Locked | {lobby.playerCount}/{lobby.max_players} Brogrammers
					</p>
				</div>
				<div class="flex gap-2">
					{#if lobby.state.type === 'game'}
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
