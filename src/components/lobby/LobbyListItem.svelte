<script lang="ts">
	import ButtonIcon from '$components/button/ButtonIcon.svelte';
	import { Join, Play } from '$components/icons';
	import PlayerCircle from '$components/match/PlayerCircle.svelte';
	import type { SimpleLobby } from '$lib/types';

	let { lobby }: { lobby: SimpleLobby } = $props();
</script>

<div class="flex items-center gap-4 rounded bg-[#050505] p-4">
	<PlayerCircle class="size-11" player={lobby.owner} />
	<div class="flex flex-1 flex-col">
		<p class="text-lg font-semibold">{lobby.owner.username}'s lobby</p>
		<p class="text-sm">{lobby.state} | Locked | {lobby.users}/{lobby.max_players} Brogrammers</p>
	</div>
	<div class="flex gap-4">
		{#if lobby.state === 'game'}
			<a href={`/match/${lobby.id}`}>
				<ButtonIcon text="Re-Join" class="text-sky-500" icon={Join} iconClass="size-6" iconFill="#0ea5e9" />
			</a>
		{:else}
			<a href={`/lobby/${lobby.id}`}>
				<ButtonIcon text="Join" class="text-green-500" icon={Play} iconClass="size-6" iconFill="#22c55e" />
			</a>
		{/if}
	</div>
</div>
