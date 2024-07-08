<script lang="ts">
	import { page } from '$app/stores';
	import ButtonLink from '$components/button/ButtonLink.svelte';
	import Clickable from '$components/button/Clickable.svelte';
	import Avatar from '$components/match/Avatar.svelte';
	import { clickOutside } from '$lib/hooks/clickOutside';
	import type { UserProfile } from '$lib/types';
	import { get } from 'svelte/store';
	import { slide } from 'svelte/transition';

	let { user }: { user: Promise<UserProfile | null> } = $props();
	let currentPath = $derived(get(page).url.pathname);

	let links = $state({
		main: [
			{ name: 'Home', href: '/' },
			{ name: 'Lobbies', href: '/lobby' },
			{ name: 'Challenges', href: '/challenge' },
			{ name: 'Users', href: '/user' },
			{ name: 'Achievements', href: '/achievements' }
		],
		profile: (user: UserProfile) => [
			{ name: 'Logout', href: '/logout' },
			{ name: 'Profile', href: `/user/${user.username}` }
		]
	});

	let showDropdownMenu = $state(false);
</script>

<header class="relative flex h-12 items-center justify-between rounded bg-white/5 p-2">
	<div class="flex flex-col">
		<!-- max-[730px]:absolute max-[730px]:left-0 max-[730px]:top-[calc(100%+0.5rem)] max-[730px]:flex-col max-[730px]:rounded max-[730px]:bg-white/5 max-[730px]:p-4 max-[730px]:backdrop-blur-lg -->
		<nav transition:slide class="flex gap-4 px-2">
			{#each links.main as { name, href }}
				<a class="text-sm" class:underline={currentPath === href} {href} aria-current={currentPath === href}>
					{name}
				</a>
			{/each}
		</nav>
	</div>

	<div class="flex items-center gap-4">
		{#await user then user}
			{#if user}
				{#if showDropdownMenu}
					<nav transition:slide={{ axis: 'x' }} class="flex gap-4">
						{#each links.profile(user) as { name, href }}
							<a class="text-sm" class:underline={currentPath === href} {href} aria-current={currentPath === href}>
								{name}
							</a>
						{/each}
					</nav>
				{/if}
				<div class="relative" use:clickOutside={() => (showDropdownMenu = false)}>
					<Clickable onclick={() => (showDropdownMenu = !showDropdownMenu)}>
						<Avatar class="size-8" {user} />
					</Clickable>
					<!-- {#if showUserLinks}
						<NavbarProfileDropDown links={links.profile} onclick={() => (showUserLinks = false)} />
					{/if} -->
				</div>
			{:else}
				<ButtonLink href="/login" class="flex gap-4" text="Login" variant="accent" />
			{/if}
		{/await}
	</div>
</header>
