<script lang="ts">
	import UserInfo from '$components/user/UserInfo.svelte';

	const users: { realname: string; username: string }[] = [];

	for (let i = 0; i < 5; i++) {
		users[i] = {
			realname: 'John Doe',
			username: 'Monkey'
		};
	}
</script>

<div class="m-auto w-[60%] overflow-y-auto">
	<div class=" grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-2 pe-2">
		{#each users as user}
			<article class="contents">
				<UserInfo realName={user.realname} username={user.username} wins={12} lang={'C#'} since={'2y'} />
			</article>
		{/each}
	</div>
</div>
