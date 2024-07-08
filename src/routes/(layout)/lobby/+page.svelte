<script lang="ts">
	import { browser } from '$app/environment';
	import Button from '$components/button/Button.svelte';
	import ButtonLink from '$components/button/ButtonLink.svelte';
	import Loading from '$components/icons/Loading.svelte';
	import LobbyListItem from '$components/lobby/LobbyListItem.svelte';
	import backend from '$lib/backend';
	import { getUser } from '../../context';

	const user = getUser();

	let lobbies = $state(browser ? backend.getLobbies() : new Promise<[]>(() => {}));
</script>

<div class="m-auto flex w-full min-w-[400px] max-w-[800px] flex-col gap-2 overflow-y-auto">
	<div class="flex items-center justify-between rounded bg-white/5 p-2">
		<p class="pl-1 text-2xl font-bold">Lobbies</p>

		<!-- ACTIONS -->
		<div class="flex gap-4">
			<Button text="Refresh" variant="primary" onclick={() => (lobbies = backend.getLobbies())} />
			{#await user then user}
				{#if user}
					<ButtonLink href="/lobby/create" data-sveltekit-preload-data="off" text="Create" variant="accent" />
				{/if}
			{/await}
		</div>
	</div>

	{#await lobbies}
		<Loading fill="#8dd741" class="m-2 mx-auto" />
	{:then lobbies}
		{#if lobbies.length === 0}
			<p class="m-2 mx-auto">No lobbies found.</p>
		{:else}
			{#each lobbies as lobby}
				<LobbyListItem {lobby} />
			{/each}
		{/if}
	{:catch error}
		{@const _ = console.error(error)}
		<p class="m-2 mx-auto">Lobby Service is currently unavailable.</p>
	{/await}
</div>
