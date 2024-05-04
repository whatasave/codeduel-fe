<script lang="ts">
	import UserInfo from '$components/user/UserInfo.svelte';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime.js';

	const { data } = $props();
	dayjs.extend(relativeTime);
</script>

<div class="m-auto w-[60%] overflow-y-auto">
	<div class=" grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-2 pe-2">
		{#each data.users as user}
			<article class="contents">
				<UserInfo
					avatar={user.avatar}
					realName={user.name}
					username={user.username}
					wins={12}
					lang={'C#'}
					since={dayjs().to(dayjs(user.created_at))}
				/>
			</article>
		{/each}
	</div>
</div>
