<script lang="ts">
	import Button from '$components/button/Button.svelte';
	import Clickable from '$components/button/Clickable.svelte';
	import { Settings, SignOut } from '$components/icons';
	import PlayerCircle from '$components/match/PlayerCircle.svelte';
	import { clickOutside } from '$lib/hooks/clickOutside';
	import type { UserProfile } from '$lib/types';

	let { user }: { user?: UserProfile } = $props();

	let showDropdown = $state(false);
</script>

<nav class="flex items-center justify-between rounded bg-[#050505] p-2">
	<div class="flex gap-4 px-4">
		<a href="/">Home</a>
		<a href="/lobby">Lobbies</a>
		<a href="/challenge">Challenges</a>
		<a href="/user">Users</a>
		<a href="/achievement">Achievements</a>
	</div>

	<div class="flex items-center gap-4">
		{#if user}
			<div class="relative" use:clickOutside={() => (showDropdown = false)}>
				<Clickable onclick={() => (showDropdown = !showDropdown)}>
					<PlayerCircle
						class="size-8"
						player={{
							id: user.id,
							username: user.username,
							avatar: user.avatar,
							email: user.email
						}}
					/>
				</Clickable>
				{#if showDropdown}
					<div class="absolute right-0 py-2">
						<div class="flex flex-col gap-2 rounded bg-[#242424] p-4">
							<a class="flex gap-4 rounded bg-[#050505] p-3 px-10 text-center" href="/user/{user.username}">
								<Settings class="h-6 w-6" />
								<span>Profile</span>
							</a>
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
				{/if}
			</div>
		{:else}
			<a class="flex gap-4" href="/login">
				<Button text="Login" variant="accent" />
			</a>
		{/if}
	</div>
</nav>
