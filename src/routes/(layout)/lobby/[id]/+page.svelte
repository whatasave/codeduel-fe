<script lang="ts">
	import { goto, replaceState } from '$app/navigation';
	import PlayerCircle from '$components/match/PlayerCircle.svelte';
	import Button from '$components/button/Button.svelte';
	import type { User } from '$lib/types';
	import { onMount } from 'svelte';
	import { Broom, Play } from '$components/icons';
	import ButtonIcon from '$components/button/ButtonIcon.svelte';

	const { data } = $props();
	let lobby = data.lobby.getLobby();
	const users: User[] = lobby.users ? Object.values(lobby.users) : [];

	function onReady() {
		// data.lobby.sendPacket({ type: 'ready', ready: true });
		console.log('ready');
	}

	function onKick() {
		// data.lobby.sendPacket({ type: 'kick', kick: true });
		console.log('kick');
	}

	onMount(() => {
		replaceState(`/lobby/${lobby.id}`, {});
		const unlisten = data.lobby.on('gameStarted', () => goto(`/match/${lobby.id}`));
		return () => unlisten();
	});
</script>

<div class="m-auto flex gap-2">
	<div class="flex min-w-[25rem] flex-col gap-2">
		<div class="rounded bg-[#050505] p-4">
			<p class="text-3xl font-bold">Players</p>
		</div>

		<div class="flex h-[26rem] flex-col gap-2 overflow-y-auto">
			{#each users as user}
				<div class="flex items-center gap-2 rounded bg-[#050505] px-4 py-2">
					<PlayerCircle player={user} />
					<div class="flex flex-1 flex-col">
						<p class="text-2xl font-semibold">{user.username}</p>
						<p>{lobby.owner.id == user.id ? 'Owner' : 'Guest'}</p>
					</div>
					<div class="flex gap-4">
						<ButtonIcon icon={Broom} onclick={onKick} />
						<ButtonIcon icon={Play} onclick={onReady} />
					</div>
				</div>
			{/each}
		</div>
	</div>
	<div class="flex min-w-[35rem] flex-col gap-2 rounded bg-[#050505] p-2">
		<div class=" rounded p-2">
			<p class="text-3xl font-bold">Players</p>
		</div>

		<div class="flex gap-2">
			<Button
				text="Start"
				variant="accent"
				onclick={async () => {
					await data.lobby.sendPacket({ type: 'startLobby', start: true });
					await goto('/match/' + lobby.id);
				}}
			/>
			<Button text="Cancel" variant="primary" />
			<Button text="Lock" variant="primary" />
		</div>

		<div>
			<div>
				<label for="lang">Languages</label>
				<select name="lang" id="lang">
					<option value="all" selected>All</option>
					<option value="js">Javascript</option>
					<option value="py">Python</option>
				</select>
			</div>
			<div>
				<label for="maxPlayers">Max Players</label>
				<input type="number" name="maxPlayers" id="maxPlayers" />
			</div>
			<div>
				<label for="maxDuration">Max Duration</label>
				<input type="number" name="maxDuration" id="maxDuration" />
			</div>
			<div>
				<label for="mode">Mode</label>
				<select name="mode" id="mode">
					<option value="normal" selected>Random</option>
					<option value="shortest">Shortest</option>
					<option value="time">Time</option>
				</select>
			</div>
		</div>
	</div>
</div>
