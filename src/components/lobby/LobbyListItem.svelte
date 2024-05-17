<script lang="ts">
	import ButtonIconLink from '$components/button/ButtonIconLink.svelte';
	import { Join, Play } from '$components/icons';
	import Avatar from '$components/match/Avatar.svelte';
	import type { SimpleLobby } from '$lib/types';

	let { lobby }: { lobby: SimpleLobby } = $props();
</script>

<div class="flex items-center gap-4 rounded bg-white/5 p-2">
	<Avatar class="size-11" user={lobby.owner} />
	<div class="flex flex-1 flex-col truncate">
		<p class="truncate text-lg font-semibold">{lobby.owner.username}'s lobby</p>
		<p class="text-sm">{lobby.state} | Locked | {lobby.users}/{lobby.max_players} Brogrammers</p>
	</div>
	<div class="flex gap-4 pr-2">
		{#if lobby.state === 'game'}
			<ButtonIconLink
				href="/match/{lobby.id}"
				text="Re-Join"
				class="text-sky-500"
				data-sveltekit-preload-data="off"
				icon={{
					icon: Join,
					class: 'size-6',
					fill: '#0ea5e9'
				}}
			/>
		{:else}
			<ButtonIconLink
				href="/lobby/{lobby.id}"
				text="Join"
				class="text-green-500"
				data-sveltekit-preload-data="off"
				icon={{
					icon: Play,
					class: 'size-6',
					fill: '#22c55e'
				}}
			/>
		{/if}
	</div>
</div>
