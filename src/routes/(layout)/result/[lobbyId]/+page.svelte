<script lang="ts">
	import PlayerCircle from '$components/match/PlayerCircle.svelte';
	import backend from '$lib/backend';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime.js';
	import type { PageData } from './$types';
	import Button from '$components/button/Button.svelte';

	const { data }: { data: PageData } = $props();
	dayjs.extend(relativeTime);
</script>

<div class="py-8">
	<h1 class="text-center text-4xl font-bold">Results</h1>
	<h2 class="text-center font-mono text-sm">Lobby ID: {data.lobbyId}</h2>
</div>

<div class="mx-auto flex w-full max-w-[800px] flex-1 flex-col gap-2">
	<!-- <div class="h-16 w-full rounded bg-white/5"></div> -->
	{#await data.results}
		<div class="flex h-16 w-full items-center justify-center rounded bg-white/5">
			<p>Loading...</p>
		</div>
		<div class="h-16 w-full rounded bg-white/5"></div>
		<div class="h-16 w-full rounded bg-white/5"></div>
	{:then res}
		{@const lobby = res.lobby}
		{@const results = res.results}
		<div class="flex flex-col gap-4">
			{#each results as player}
				<div class="flex flex-col gap-1">
					<div class="flex w-full items-center justify-between rounded-t bg-white/10 p-4">
						<div class="flex w-[30%] items-center gap-2">
							{#await backend.getUserById(player.user_id)}
								<PlayerCircle
									player={{ id: player.id, username: 'username', avatar: '/logo/codeduel_logo_1.png' }}
									class="size-10"
								/>
								<div class="font-bold">Loading...</div>
							{:then users}
								{@const user = users[0]}
								<PlayerCircle player={{ id: 999, username: user.username, avatar: user.avatar }} class="size-10" />
								<div class="font-bold">{user.username}</div>
							{/await}
						</div>
						<div class="flex flex-1 items-center justify-between">
							<div class="flex flex-col items-center">
								<span class="font-bold">Language</span>
								<span class="text-sm">{player.language}</span>
							</div>
							<div class="flex flex-col items-center">
								<span class="font-bold">Tests</span>
								<span class="text-sm">{player.tests_passed} / 6 &lt;mockato&gt;</span>
							</div>
							<div class="flex flex-col items-center">
								<span class="font-bold">Time</span>
								<span class="text-sm">{dayjs(player.submission_date).from(dayjs(lobby.created_at), true)}</span>
							</div>
							<div class="flex flex-col items-center">
								<Button text="View Code" variant="accent" />
							</div>
						</div>
					</div>

					<pre class="w-full rounded-b bg-white/5 px-4 py-2">{player.code}</pre>
				</div>
			{/each}
		</div>
	{:catch error}
		<p>{error.message}</p>
	{/await}
</div>
