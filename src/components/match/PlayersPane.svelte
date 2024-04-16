<script lang="ts">
	import Pane from '$components/Pane.svelte';
	import Python from '$components/icons/Python.svelte';
	import type { User, UserId } from '$lib/types';
	import PlayerCircle from './PlayerCircle.svelte';

	let { players }: { players: { [id: UserId]: User } } = $props();
</script>

<Pane class="flex shrink-0 flex-col gap-2 p-2">
	{#each Object.entries(players) as [_, player]}
		<PlayerCircle
			variant="status"
			status="success"
			class="size-14"
			badge={Python}
			badgeClass="size-5 !p-[0.2rem] bg-[#1D74C5]"
			badgeBackground="#1D74C5"
			{player}
		/>
	{/each}
</Pane>
