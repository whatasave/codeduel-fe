<script lang="ts">
	import { Settings, SignOut } from '$components/icons';
	import PlayerCircle from '$components/match/PlayerCircle.svelte';
	import type { UserProfile } from '$lib/types';

	let { user }: { user?: UserProfile } = $props();
</script>

<nav class="flex items-center justify-between rounded bg-[#050505] p-4">
	<div class="flex gap-4 px-4">
		<a href="/">Home</a>
		<a href="/lobby">Lobbies</a>
		<a href="/challenges">Challenges</a>
		<a href="/users">Users</a>
		<a href="/achievements">Achievements</a>
	</div>

	<div class="flex items-center gap-4">
		{#if user}
			<div class="group relative">
				<a href="/user/1">
					<PlayerCircle
						class="h-[2rem] w-[2rem]"
						player={{
							id: user.id,
							username: user.username,
							avatar: user.avatar,
							email: user.email
						}}
					/>
				</a>
				<div class="absolute right-0 hidden py-2 group-hover:block">
					<div class="flex flex-col gap-2 rounded bg-[#242424] p-4">
						<a class="flex gap-4 rounded bg-[#050505] p-3 px-10 text-center" href="/settings">
							<Settings class="h-6 w-6" />
							<span>Settings</span>
						</a>
						<a class="flex gap-4 rounded bg-[#050505] p-3 px-10 text-center" href="/logout">
							<SignOut class="h-6 w-6" />
							<span>Logout</span>
						</a>
					</div>
				</div>
			</div>
		{:else}
			<a class="flex gap-4 px-4" href="/login">Login</a>
		{/if}
	</div>
</nav>
