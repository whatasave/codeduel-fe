<script lang="ts">
	import Button from '$components/button/Button.svelte';
	import ButtonIcon from '$components/button/ButtonIcon.svelte';
	import { Github, Join, Play, Python } from '$components/icons';
	import PlayerCircle from '$components/match/PlayerCircle.svelte';
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

<div class="m-auto flex w-full max-w-[60rem] gap-2 overflow-y-auto px-2">
	<div class="flex w-full min-w-[25rem] flex-col gap-2">
		<div class="flex items-center justify-between rounded bg-[#050505] p-4">
			<p class="text-3xl font-bold">Lobbies</p>
			<a href="/lobby/create">
				<Button text="Create" variant="primary" />
			</a>
		</div>

		{#each lobbies as lobby}
			<div class="flex items-center gap-4 rounded bg-[#050505] px-4 py-2">
				<PlayerCircle class="size-11" player={lobby.owner} />
				<div class="flex flex-1 flex-col">
					<p class="text-lg font-semibold">{lobby.owner.username}'s lobby</p>
					<p class="text-sm">{lobby.state} | Locked | {lobby.users}/{lobby.max_players} Brogrammers</p>
				</div>
				<div class="flex gap-4">
					{#if lobby.state === 'game'}
						<a href={`/match/${lobby.id}`}>
							<ButtonIcon text="Re-Join" class="text-sky-500" icon={Join} iconClass="size-6" iconFill="#0ea5e9" />
						</a>
					{:else}
						<a href={`/lobby/${lobby.id}`}>
							<ButtonIcon text="Join" class="text-green-500" icon={Play} iconClass="size-6" iconFill="#22c55e" />
						</a>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>
