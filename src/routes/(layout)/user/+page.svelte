<script lang="ts">
	import UserInfo from '$components/user/UserInfo.svelte';

	const users: { realname: string; username: string }[] = [];

	for (let i = 0; i < 5; i++) {
		users[i] = {
			realname: 'Kaysucacogliniosssssss',
			username: 'Xedom'
		};
	}
</script>

<div class="m-auto w-[60%] overflow-y-auto">
	<div class="myGrid gap-2 pe-2">
		{#each users as user}
			<UserInfo realName={user.realname} username={user.username} wins={12} lang={'C#'} since={'2y'} />
		{/each}
	</div>
</div>

<style>
	.myGrid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
	}
</style>
