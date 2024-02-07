<script lang="ts">
	import { replaceState } from '$app/navigation';
	import PlayerCircle from '$components/PlayerCircle.svelte';
	import Button from '$components/button/Button.svelte';
	import type { User } from '$lib/types';
	import { onMount } from 'svelte';

	const { data } = $props();

	onMount(() => {
		replaceState(`/lobby/${data.lobby.getLobby().id}`, {});
	});

	const users: User[] = $state([
		{ id: 1, username: 'John' },
		{ id: 1, username: 'Jane' },
		{ id: 1, username: 'Jack' },
		{ id: 1, username: 'Annie' }
	]);
</script>

<div class="flex gap-2">
	<div class="gap-2 flex flex-col min-w-[25rem]">
		<div class="bg-[#050505] rounded p-4">
			<p class="text-3xl font-bold">Players</p>
		</div>

		{#each users as user}
			<div class="bg-[#050505] rounded py-2 px-4 flex gap-2 items-center">
				<PlayerCircle player={user} />
				<div class="flex flex-col flex-1">
					<p class="text-2xl font-semibold">{user.username}</p>
					<p>{'N/A'}</p>
				</div>
				<div class="flex gap-2">
					<Button text="Kick" />
					<!-- TODO use ButtonIcon -->
					<Button text="Ready" />
					<!-- TODO use ButtonIcon -->
				</div>
			</div>
		{/each}
	</div>
	<div class="bg-[#050505] rounded p-2 gap-2 flex min-w-[35rem] flex-col">
		<div class=" rounded p-2">
			<p class="text-3xl font-bold">Players</p>
		</div>

		<div class="flex gap-2">
			<Button
				text="Start"
				variant="accent"
				onclick={async () => {
					await data.lobby.sendPacket({ type: 'startLobby', start: true });
					console.log('start');
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
