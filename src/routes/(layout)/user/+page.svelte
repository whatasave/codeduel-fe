<script lang="ts">
	import UserInfo from '$components/user/UserInfo.svelte';
	import dayjs from 'dayjs';

	const { data } = $props();

	function parseDate(createdAt: string): string {
		const now = dayjs();
		let diff = now.diff(dayjs(createdAt));

		let days = Math.floor(diff / 86400000);
		let months = Math.floor(days / 30);
		let years = Math.floor(months / 12);

		if (years > 0) {
			return years == 1 ? `${years} year ago` : `${years} years ago`;
		} else if (months > 0) {
			return months == 1 ? `${months} month ago` : `${months} moths ago`;
		}

		return days == 1 ? `${days} day ago` : `${days} days ago`;
	}
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
					since={parseDate(user.created_at)}
				/>
			</article>
		{/each}
	</div>
</div>
