<script lang="ts">
	import { page } from '$app/stores';
	import ButtonLink from '$components/button/ButtonLink.svelte';
	import Clickable from '$components/button/Clickable.svelte';
	import { Settings, SignOut, User } from '$components/icons';
	import PlayerCircle from '$components/match/PlayerCircle.svelte';
	import { clickOutside } from '$lib/hooks/clickOutside';
	import type { UserProfile } from '$lib/types';
	import { get } from 'svelte/store';
	import NavbarProfileDropDown from './NavbarProfileDropDown.svelte';

	let { user }: { user?: UserProfile } = $props();

	let links = {
		main: [
			{ name: 'Home', href: '/' },
			{ name: 'Lobbies', href: '/lobby' },
			{ name: 'Challenges', href: '/challenge' },
			{ name: 'Users', href: '/user' },
			{ name: 'Achievements', href: '/achievements' }
		],
		profile: [
			{ icon: User, name: 'Profile', href: `/user/${user?.username}` },
			{ icon: Settings, name: 'Settings', href: '/settings' },
			{ icon: SignOut, name: 'Logout', href: '/logout' }
		]
	};

	let showDropdown = $state(false);
</script>

<header class="flex items-center justify-between rounded bg-white/5 p-2">
	<nav class="flex gap-4 px-4">
		{#each links.main as { name, href }}
			<a class:underline={get(page).url.pathname === href} {href} aria-current={get(page).url.pathname === href}
				>{name}</a
			>
		{/each}
	</nav>

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
					<NavbarProfileDropDown links={links.profile} onclick={() => (showDropdown = false)} />
				{/if}
			</div>
		{:else}
			<ButtonLink class="flex gap-4" href="/login" text="Login" variant="accent" />
		{/if}
	</div>
</header>
