<script lang="ts">
	import UserInfo from '$components/user/UserInfo.svelte';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime.js';
	import Loading from '$components/icons/Loading.svelte';
	import { browser } from '$app/environment';
	import backend from '$lib/backend';
	dayjs.extend(relativeTime);

	const users = browser ? backend.getUserList(fetch) : new Promise<[]>(() => {});
</script>

<div class="m-auto flex w-full max-w-[1200px] flex-col gap-2 overflow-y-auto">
	<h1 class="text-center text-4xl font-bold">Users</h1>
	<div class="grid grid-cols-[repeat(auto-fit,minmax(22rem,1fr))] gap-2">
		{#await users}
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
						since={dayjs().to(dayjs(user.createdAt))}
					/>
				</article>
			{/each}
		{:catch error}
			<p>{error}</p>
		{/await}
	</div>
</div>
