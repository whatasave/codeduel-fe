<script lang="ts">
	import PlayerCircle from '$components/match/PlayerCircle.svelte';
	import backend from '$lib/backend';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime.js';
	import duration from 'dayjs/plugin/duration.js';
	import type { PageData } from './$types';
	import Button from '$components/button/Button.svelte';
	import { slide } from 'svelte/transition';
	import { codeToHtml } from 'shiki';

	const { data }: { data: PageData } = $props();

	let showingCode: number[] = $state([]);
	let disableShowCode = $state(false);
	dayjs.extend(duration);
	dayjs.extend(relativeTime);

	const parseCode = async (code: string, lang: string) => {
		return await codeToHtml(code, {
			lang,
			theme: 'monokai',
			defaultColor: false
		});
	};

	const calcTime = (start: string, end: string) => {
		const diff = Math.abs(dayjs(start).diff(dayjs(end)));

		let format = 'D[d] H[h] m[m] s[s]';
		if (diff < 60 * 60 * 1000 * 24) format = 'H[h] m[m] s[s]';
		if (diff < 60 * 60 * 1000) format = 'm[m] s[s]';
		if (diff < 60 * 1000) format = 's[s]';
		return dayjs.duration(diff).format(format);
	};

	const showCode = (id: number) => {
		if (showingCode.includes(id)) showingCode = showingCode.filter((code) => code !== id);
		else showingCode = [...showingCode, id];
	};

	const shareCode = async (lobbyUniqueId: string) => {
		await new Promise((r) => setTimeout(r, 3000));
		backend.shareCode(lobbyUniqueId);
	};

	const isOwner = (
		data: PageData,
		player: ReturnType<typeof backend.getResults> extends Promise<infer U>
			? U extends { results: Array<infer R> }
				? R
				: never
			: never
	) => {
		return data.user && data.user.id === player.user_id;
	};
</script>

<div class="py-8">
	<h1 class="text-center text-4xl font-bold">Results</h1>
	<h2 class="text-center font-mono text-sm">Lobby ID: {data.lobbyId}</h2>
</div>

{#snippet stats(title, value)}
	<div class="flex min-w-[6rem] flex-col items-center overflow-hidden">
		<span class="font-bold">{title}</span>
		<span class="text-sm">{value}</span>
	</div>
{/snippet}

<div class="mx-auto flex w-full max-w-[800px] flex-1 flex-col gap-2 pb-8">
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
			{#each results as player (player.user_id)}
				{@const disableShowCode2 = player.show_code || !data.user || data.user.id !== player.user_id}
				<div class="flex flex-col gap-1">
					<!-- rounded-t bg-white/5 p-4 -->
					<div class="flex w-full flex-wrap justify-between gap-2 rounded-t bg-white/5 p-4">
						<div class="flex min-w-[14rem] items-center gap-2">
							{#await backend.getUserById(player.user_id)}
								<PlayerCircle
									player={{ id: player.id, username: 'username', avatar: '/logo/codeduel_logo_1.png' }}
									class="size-10"
								/>
								<div class="font-bold">Loading...</div>
							{:then users}
								{@const user = users[0]}
								<a class="contents" href={`/user/${user.username}`}>
									<PlayerCircle player={{ id: 999, username: user.username, avatar: user.avatar }} class="size-10" />
								<div class="line-clamp-1 font-bold" title={user.username}>{user.username}</div>
								</a>
							{/await}
						</div>
						<div class="flex flex-wrap items-center justify-center gap-2">
							<div class="flex items-center justify-center gap-2">
								{@render stats('Language', player.language)}
								{@render stats('Tests', `${player.tests_passed} / 6`)}
								{@render stats('Time', calcTime(lobby.created_at, player.submitted_at))}
							</div>
							<Button
								text="Share Code"
								variant="accent"
								class="min-w-36 disabled:bg-white/5  disabled:text-white/40"
								loaderColor={disableShowCode || disableShowCode2 ? 'white' : undefined}
								disabled={disableShowCode || disableShowCode2}
								onclick={async () => {
									disableShowCode = true;
									await shareCode(lobby.uuid);
								}}
							/>
						</div>
					</div>

					{#if showingCode.includes(player.user_id)}
						<div transition:slide class="code w-full select-text bg-white/5 px-4 py-2">
							{#await parseCode(player.code, player.language)}
								<pre class="shiki monokai">{player.code}</pre>
							{:then html}
								{@html html}
							{/await}
						</div>
					{/if}

					<Button
						text="Show Code"
						class="flex w-full justify-center rounded-b bg-white/10 py-2"
						disabled={!isOwner(data, player) && !player.show_code}
						onclick={() => showCode(player.user_id)}
					/>
				</div>
			{/each}
		</div>
	{:catch error}
		<p>{error.message}</p>
	{/await}
</div>

<style>
	:global(pre.shiki.monokai) {
		background-color: #00000000 !important;
	}
	:global(.line) {
		user-select: text !important;
	}
</style>
