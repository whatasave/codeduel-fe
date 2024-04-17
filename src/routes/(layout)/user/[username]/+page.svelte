<script>
	import { ProfileDefault } from '$components/icons';
	import ProfileTag from '$components/profile/ProfileTag.svelte';
	import ProfileBackground from '$components/profile/ProfileBackground.svelte';
	import PlayerCircle from '$components/match/PlayerCircle.svelte';
	import dayjs from 'dayjs';

	let { data } = $props();
</script>

<div class="flex flex-1 flex-col overflow-y-auto pr-2">
	<ProfileBackground image={data.user?.background_img || '/img/profile-bg.jpg'} />

	<div class="mx-auto -mt-10 flex w-full max-w-[1000px] flex-col gap-1 px-8">
		<div class="size-20 overflow-hidden rounded-full border-8 border-transparent bg-[#151515]">
			{#if data.user}
				<PlayerCircle
					class="size-full"
					player={{
						id: data.user.id,
						username: data.user.username,
						avatar: data.user.avatar
					}}
				/>
			{:else}
				<ProfileDefault fill="#a5a5a5" class="size-full" />
			{/if}
		</div>
		<div class="flex flex-wrap gap-8">
			<div class="flex w-full min-w-[326px] flex-1 shrink-0 grow flex-col gap-4">
				<div>
					<div class="text-xl font-bold">{data.user?.name}</div>
					<ProfileTag tag={data.user?.username || ''} />
				</div>
				<div class="text-sm">{data.user?.bio}</div>
				<!-- USER STATISTICS -->
				<!-- <div class="flex flex-wrap justify-center gap-2">
					{#each data.user?.stats || [] as stat}
						<ProfileStats name={stat.name} stat={stat.stat} />
					{/each}
				</div> -->
				<div>
					<span class="font-semibold">Member since</span>
					<span>{dayjs(data.user?.created_at).format('DD.MM.YY HH:mm:ss')}</span>
				</div>
			</div>
			<div class="flex flex-1 flex-col gap-2">
				<div>Games</div>
				<div class="h-16 w-full rounded bg-[#050505]"></div>
				<div class="h-16 w-full rounded bg-[#050505]"></div>
				<div class="h-16 w-full rounded bg-[#050505]"></div>
				<div class="h-16 w-full rounded bg-[#050505]"></div>
				<div class="h-16 w-full rounded bg-[#050505]"></div>
				<div class="h-16 w-full rounded bg-[#050505]"></div>
				<div class="h-16 w-full rounded bg-[#050505]"></div>
				<div class="h-16 w-full rounded bg-[#050505]"></div>
				<div class="h-16 w-full rounded bg-[#050505]"></div>
				<div class="h-16 w-full rounded bg-[#050505]"></div>
			</div>
		</div>
	</div>
</div>
