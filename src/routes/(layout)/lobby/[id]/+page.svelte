<script lang="ts">
	import { goto, replaceState } from '$app/navigation';
	import PlayerCircle from '$components/match/PlayerCircle.svelte';
	import Button from '$components/button/Button.svelte';
	import type { User } from '$lib/types';
	import { Broom, Play } from '$components/icons';
	import ButtonIcon from '$components/button/ButtonIcon.svelte';
	import Input from '$components/input/Input.svelte';
	import Select from '$components/input/Select.svelte';

	const { data } = $props();
	let lobby = data.lobby.getLobby();
	const users: User[] = lobby.users ? Object.values(lobby.users) : [];
	const isOwner = (user: User) => lobby.owner.id == user.id;

	function onReady() {
		// data.lobby.sendPacket({ type: 'ready', ready: true });
		console.log('ready');
	}

	function onKick() {
		// data.lobby.sendPacket({ type: 'kick', kick: true });
		console.log('kick');
	}

	$effect(() => {
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
						<p>{isOwner(user) ? 'Owner' : 'Guest'}</p>
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
			<p class="text-3xl font-bold">Lobby settings</p>
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

		<div class="flex flex-col gap-4">
			<div class="flex flex-col gap-1">
				<label for="lang">Languages</label>
				<Select
					class="w-full"
					selectedIndex={0}
					mapToString={(language) => language.name}
					options={[
						{ name: 'Javascript', value: 'js' },
						{ name: 'Python', value: 'py' },
						{ name: 'C#', value: 'cs' }
					]}
				/>
			</div>
			<div class="flex flex-col gap-1">
				<label for="maxPlayers">Max Players</label>
				<Input type="number" name="maxPlayers" id="maxPlayers" class="w-full" />
			</div>
			<div class="flex flex-col gap-1">
				<label for="maxDuration">Max Duration</label>
				<Input type="number" name="maxDuration" id="maxDuration" class="w-full" />
			</div>
			<div class="flex flex-col gap-1">
				<label for="mode">Mode</label>
				<Select
					class="w-full"
					selectedIndex={0}
					mapToString={(language) => language.name}
					options={[
						{ name: 'Random', value: 'normal' },
						{ name: 'Shortest', value: 'shortest' },
						{ name: 'Time', value: 'time' }
					]}
				/>
			</div>
		</div>
	</div>
</div>
