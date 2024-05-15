<script lang="ts">
	import { beforeNavigate, goto, replaceState } from '$app/navigation';
	import PlayerCircle from '$components/match/PlayerCircle.svelte';
	import Button from '$components/button/Button.svelte';
	import type { User, UserId } from '$lib/types';
	import { Broom, Play } from '$components/icons';
	import ButtonIcon from '$components/button/ButtonIcon.svelte';
	import Input from '$components/input/Input.svelte';
	import Select from '$components/input/Select.svelte';
	import { toHumanString } from '$lib/languages.js';

	const { data } = $props();
	let lobby = data.lobby.getLobby();
	let users: User[] = $state(data.lobby.getUsersList());
	const isOwner = (userId: UserId) => lobby.owner.id == userId;
	const isSelf = (userId: UserId) => data.user?.id == userId;

	const allowedLanguages = $derived(
		lobby.settings.allowedLanguages.map((lang) => ({ name: toHumanString(lang), value: lang }))
	);

	function onReady() {
		data.lobby.sendPacket({ type: 'ready', ready: true });
	}

	function onKick(userId: UserId) {
		data.lobby.sendPacket({ type: 'kick', userId });
	}

	async function onDelete() {
		await data.lobby.sendPacket({ type: 'delete', delete: true });
	}

	async function onLock(lock: boolean) {
		await data.lobby.sendPacket({ type: 'lock', lock });
	}

	async function onStart() {
		await data.lobby.sendPacket({ type: 'start', start: true });
		await goto('/match/' + lobby.id);
	}

	$effect(() => {
		replaceState(`/lobby/${lobby.id}`, {});
		const unlisteners = [
			data.lobby.on('gameStarted', () => goto(`/match/${lobby.id}`)),
			data.lobby.on('lobbyDelete', () => {
				console.log('lobby deleted');
				goto(`/lobby`)
			}),
			data.lobby.on('usersUpdate', (packet) => {
				users = Object.values(packet.users);
			})
		];
		return () => {
			for (const unlisten of unlisteners) unlisten();
		};
	});

	beforeNavigate(() => {
		data.lobby.close();
	});
</script>

<div
	class="m-auto flex w-full max-w-[1000px] justify-center gap-2 max-[680px]:flex-col-reverse max-[680px]:items-center"
>
	<div
		class="flex w-full min-w-[300px] max-w-[400px] flex-1 flex-col gap-1 max-[680px]:min-w-[200px] max-[680px]:max-w-[500px]"
	>
		<!-- SECTION TITLE -->
		<div class="flex justify-center rounded-t bg-white/5 p-2">
			<p class="text-2xl font-bold">Players</p>
		</div>

		<!-- PLAYER LIST -->
		<div class="flex h-full flex-col gap-1 overflow-y-auto rounded-b max-[680px]:h-full">
			{#each users as user}
				<!-- PLAYER ITEM -->
				<div class="flex items-center gap-4 bg-white/5 p-2 last:rounded-b">
					<!-- PLAYER IMAGE -->
					<PlayerCircle class="size-12" player={user} />

					<!-- PLAYER INFO -->
					<div class="flex w-full min-w-[130px] flex-1 flex-col">
						<p class="w-full min-w-[120px] truncate text-nowrap text-xl font-semibold">{user.username}</p>
						<p class="text-sm">{isOwner(user.id) ? 'Owner' : 'Guest'}</p>
					</div>

					<!-- PLAYER ACTIONS -->
					<div class="flex gap-4 pr-2">
						{#if isOwner(data.user!.id) && !isSelf(user.id)}
							<ButtonIcon icon={{ icon: Broom }} onclick={() => onKick(user.id)} />
						{/if}
						{#if isSelf(user.id) && !isOwner(user.id)}
							<ButtonIcon icon={{ icon: Play }} onclick={onReady} />
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
	<div class="flex w-full min-w-[350px] max-w-[500px] flex-col gap-1 max-[680px]:min-w-[200px]">
		<!-- SECTION TITLE -->
		<div class="flex justify-center rounded-t bg-white/5 p-2">
			<p class="text-2xl font-bold">Lobby settings</p>
		</div>

		<!-- LOBBY ACTIONS -->
		{#if isOwner(data.user!.id)}
			<div class="flex flex-wrap justify-center gap-2 bg-white/5 p-2">
				<Button text="Start" variant="accent" onclick={onStart} />
				<Button text="Lock" variant="primary" onclick={async () => await onLock(true)} />
				<Button text="Delete" variant="primary" onclick={onDelete} />
			</div>
		{:else}
			<!-- <div class="flex flex-wrap justify-center gap-2 bg-white/5 p-2">
				{#if users.length > 1}
					<Button text="Ready" variant="accent" onclick={onReady} />
				{/if}

				<Button text="Leave" variant="danger" />
			</div> -->
		{/if}

		<!-- LOBBY SETTINGS -->
		{#if isOwner(data.user!.id)}
			<div class="flex flex-col gap-4 rounded-b bg-white/5 p-2">
				<div class="flex flex-col gap-1">
					<label class="text-nowrap" for="lang">Languages</label>
					<Select
						class="w-full"
						selectedIndex={0}
						mapToString={(language) => language.name}
						options={allowedLanguages}
					/>
				</div>
				<div class="flex flex-wrap gap-4 gap-x-2">
					<div class="flex flex-1 flex-col gap-1">
						<label class="text-nowrap" for="maxPlayers">Max Players</label>
						<Input
							type="number"
							name="maxPlayers"
							id="maxPlayers"
							class="w-full"
							bind:value={lobby.settings.maxPlayers}
						/>
					</div>
					<div class="flex flex-1 flex-col gap-1">
						<label class="text-nowrap" for="gameDuration">
							Game Duration <span class="text-sm text-white/60">(in minutes)</span>
						</label>
						<Input
							type="number"
							name="gameDuration"
							value={lobby.settings.gameDuration}
							id="gameDuration"
							class="w-full"
						/>
					</div>
				</div>
				<div class="flex flex-col gap-1">
					<label class="text-nowrap" for="mode">Mode</label>
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
		{:else}
			<div class="flex flex-col gap-4 rounded-b bg-white/5 p-2">
				<div class="flex flex-col gap-1">
					<div class="font-semibold">Languages</div>
					<div class="flex gap-2">
						{#each allowedLanguages as lang}
							<div class="rounded bg-white/5 p-1 px-4 text-sm">{lang.name}</div>
						{/each}
					</div>
				</div>
				<div class="flex flex-col gap-1">
					<div class="font-semibold">Max Players</div>
					<div class="flex gap-2">
						<div class="text-sm">
							{Object.keys(lobby.users).length} / {lobby.settings.maxPlayers}
						</div>
					</div>
				</div>
				<div class="flex flex-col gap-1">
					<div class="font-semibold">Game Duration</div>
					<div class="flex gap-2">
						<div class="text-sm">{lobby.settings.gameDuration} minutes</div>
					</div>
				</div>
				<div class="flex flex-col gap-1">
					<div class="font-semibold">Mode</div>
					<div class="flex gap-2">
						<div class="text-sm">Random</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>
