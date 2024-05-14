<script lang="ts">
	import UserInfo from '$components/user/UserInfo.svelte';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime.js';
	import Loading from '$components/icons/Loading.svelte';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
	dayjs.extend(relativeTime);
</script>

<div class="m-auto w-full max-w-[1200px] overflow-y-auto">
	<div class="grid grid-cols-[repeat(auto-fit,minmax(22rem,1fr))] gap-2">
		{#await data.users}
			<div class="mx-auto">
				<Loading fill="#8dd741" />
			</div>
		{:then users}
			{#if users.length === 0}
				<p>No users found</p>
			{/if}
			{#each users as user}
				<article class="contents">
					<UserInfo
						avatar={user.avatar}
						name={user.name}
						username={user.username}
						wins={12}
						lang={'C#'}
						since={dayjs().to(dayjs(user.created_at))}
					/>
				</article>
			{/each}
		{:catch error}
			<p>{error}</p>
		{/await}
	</div>
</div>
