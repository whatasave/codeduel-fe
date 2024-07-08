<script lang="ts">
	import ProfileTag from '$components/profile/ProfileTag.svelte';
	import ProfileBackground from '$components/profile/ProfileBackground.svelte';
	import Avatar from '$components/match/Avatar.svelte';
	import dayjs from 'dayjs';
	import duration from 'dayjs/plugin/duration.js';
	import type { PageData } from './$types';
	import { Github } from '$components/icons';

	const { data }: { data: PageData } = $props();

	dayjs.extend(duration);

	const calcTime = (start: string, end: string) => {
		const diff = Math.abs(dayjs(start).diff(dayjs(end)));

		let format = 'D[d] H[h] m[m] s[s]';
		if (diff < 60 * 60 * 1000 * 24) format = 'H[h] m[m] s[s]';
		if (diff < 60 * 60 * 1000) format = 'm[m] s[s]';
		if (diff < 60 * 1000) format = 's[s]';
		return dayjs.duration(diff).format(format);
	};
</script>

<div class="flex flex-1 flex-col overflow-y-auto">
	<ProfileBackground
		image={data.user.backgroundImage ?? '/img/profile-bg.jpg'}
		links={[{ icon: Github, name: 'Github', url: `https://github.com/${data.user.username}` }]}
	/>

	<div class="mx-auto -mt-12 flex w-full max-w-[1000px] flex-col gap-1 px-8">
		<Avatar
			class="size-24  border-8 border-[#010f20]"
			user={{ username: data.user.username, avatar: data.user.avatar || '' }}
		/>
		<div class="flex flex-wrap gap-8">
			<div class="flex w-full min-w-[326px] flex-1 shrink-0 grow flex-col gap-2">
				<div>
					<div class="text-xl font-bold">{data.user?.name}</div>
					<ProfileTag tag={data.user.username} />
				</div>
				<div class="text-sm">{data.user.biography}</div>
				<!-- USER STATISTICS -->
				<!-- <div class="flex flex-wrap justify-center gap-2">
					{#each data.user?.stats || [] as stat}
						<ProfileStats name={stat.name} stat={stat.stat} />
					{/each}
				</div> -->
				<div>
					<span class="font-semibold">Member since</span>
					<span>{dayjs(data.user.createdAt).format('DD.MM.YY HH:mm:ss')}</span>
				</div>
			</div>
			<div class="flex flex-1 flex-col gap-2">
				{#await data.matches}
					<div class="flex h-16 w-full items-center justify-center rounded bg-white/5">
						<p>Loading...</p>
					</div>
					<div class="h-16 w-full rounded bg-white/5"></div>
					<div class="h-16 w-full rounded bg-white/5"></div>
					<div class="h-16 w-full rounded bg-white/5"></div>
				{:then matches}
					{#each matches as match}
						{@const game = match.game}
						{@const challenge = game.challenge}
						{@const player = match.userData}
						<div class="flex w-full flex-col items-center justify-center gap-2 rounded bg-white/5 p-2">
							<!-- MATCH -->
							<a
								class="flex w-full flex-col items-center justify-center rounded bg-white/5 p-2"
								href={`/result/${game.uniqueId}`}
							>
								<div class="flex flex-col items-center pb-2">
									<div class="text-xs text-[#8DD741]">match</div>
									<div class="uppercase">{game.mode.name}</div>
									<div class="text-xs">{game.createdAt}</div>
								</div>
								<div class="flex gap-8">
									<div class="text-xs">max duration: <br />{dayjs.duration(game.duration).format('HH:mm:ss')}</div>
									<div class="text-xs">max players: <br />{game.maxPlayers}</div>
									<div class="text-xs">allowed languages: <br />{game.allowedLanguages.join(' ')}</div>
								</div>
							</a>

							<!-- CHALLENGE -->
							<a
								class="flex w-full flex-col items-center justify-center rounded bg-white/5 p-2"
								href={`/challenge/${challenge.id}`}
							>
								<div class="text-xs text-[#8DD741]">challenge</div>
								<div>{challenge.title}</div>
								<div class="text-xs">{challenge.description}</div>
							</a>

							<!-- CHALLENGE -->
							<div class="flex w-full flex-col items-center justify-center rounded bg-white/5 p-2">
								<div class="text-xs text-[#8DD741]">stats</div>
								<div>{player.user.name}</div>
								<div class="flex gap-8">
									<div class="text-xs">language: <br />{player.language}</div>
									<div class="text-xs">
										time: <br />{player.submittedAt ? calcTime(game.createdAt, player.submittedAt) : 'N/A'}
									</div>
									<div class="text-xs">tests: <br />{player.testsPassed} / {game.challenge.testCases}</div>
								</div>
								{#if player.showCode}
									<a class="text-[#8DD741] underline" href={`/result/${game.uniqueId}/player/${player.user.id}`}>
										show code
									</a>
								{/if}
							</div>
						</div>
					{/each}
				{:catch error}
					<div>Error: {error.message}</div>
				{/await}
			</div>
		</div>
	</div>
</div>
