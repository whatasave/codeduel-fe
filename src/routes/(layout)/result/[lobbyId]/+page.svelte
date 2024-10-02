<script lang="ts">
	import Avatar from '$components/match/Avatar.svelte';
	import backend from '$lib/backend';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime.js';
	import duration from 'dayjs/plugin/duration.js';
	import type { PageData } from './$types';
	import Button from '$components/button/Button.svelte';
	import { slide } from 'svelte/transition';
	import { codeToHtml } from 'shiki';
	import { getUser } from '../../../context';
	dayjs.extend(duration);
	dayjs.extend(relativeTime);

	const user = getUser();
	const { data }: { data: PageData } = $props();

	let showingCode: number[] = $state([]);
	let disableShowCode = $state(false);

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
</script>

<div class="py-8">
	<h1 class="text-center text-4xl font-bold">Results</h1>
	<h2 class="text-center font-mono text-sm">Lobby ID: {data.lobbyId}</h2>
</div>

{#snippet stats(title: string, value: string | null)}
	<div class="flex min-w-[6rem] flex-col items-center overflow-hidden">
		<span class="font-bold">{title}</span>
		<span class="text-sm">{value ?? 'N/A'}</span>
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
	{:then results}
		{@const game = results.game}
		{@const userData = results.userData}
		<div class="flex flex-col gap-4">
			{#each userData as userData (userData.user.id)}
				{@const disableShowCode2 = userData.showCode || !userData.user || userData.user.id !== userData.user.id}
				<div class="flex flex-col gap-1">
					<!-- rounded-t bg-white/5 p-4 -->
					<div class="flex w-full flex-wrap justify-between gap-2 rounded-t bg-white/5 p-4">
						<div class="flex min-w-[14rem] items-center gap-2">
							<a class="contents" href={`/user/${userData.user.username}`}>
								<Avatar user={userData.user} class="size-10" />
								<div class="line-clamp-1 font-bold" title={userData.user.username}>{userData.user.username}</div>
							</a>
						</div>
						<div class="flex flex-wrap items-center justify-center gap-2">
							<div class="flex items-center justify-center gap-2">
								{@render stats('Language', userData.language)}
								{@render stats('Tests', `${userData.testsPassed} / ${game.challenge.testCases}`)}
								{@render stats('Time', userData.submittedAt ? calcTime(game.createdAt, userData.submittedAt) : 'N/A')}
							</div>

							<Button
								text="Share Code"
								variant="accent"
								class="min-w-36 disabled:bg-white/5  disabled:text-white/40"
								loaderColor={disableShowCode || disableShowCode2 ? 'white' : undefined}
								disabled={disableShowCode || disableShowCode2}
								onclick={async () => {
									disableShowCode = true;
									await shareCode(game.uniqueId);
								}}
							/>
						</div>
					</div>

					{#if showingCode.includes(userData.user.id)}
						<div transition:slide class="code w-full select-text bg-white/5 px-4 py-2">
							{#if !userData.code || userData.code.trim().length === 0}
								<p class="text-center">No code submitted</p>
							{:else}
								{#await parseCode(userData.code, userData.language ?? 'plaintext')}
									<pre class="shiki monokai">{userData.code}</pre>
								{:then html}
									{@html html}
								{/await}
							{/if}
						</div>
					{/if}

					{#await user}
						<Button
							text="Show Code"
							class="flex w-full justify-center rounded-b bg-white/10 py-2"
							disabled={!userData.showCode}
							onclick={() => showCode(userData.user.id)}
						/>
					{:then user}
						<Button
							text="Show Code"
							class="flex w-full justify-center rounded-b bg-white/10 py-2"
							disabled={userData.user.id !== user?.id && !userData.showCode}
							onclick={() => showCode(userData.user.id)}
						/>
					{/await}
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
