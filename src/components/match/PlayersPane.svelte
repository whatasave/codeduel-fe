<script lang="ts">
	import Pane from '$components/Pane.svelte';
	import Python from '$components/icons/Python.svelte';
	import type { User, UserId } from '$lib/types';
	import PlayerCircle from './PlayerCircle.svelte';

	let { players }: { players: { [id: UserId]: User } } = $props();
</script>

<Pane class="flex flex-col gap-2 p-2">
	{#each Object.entries(players) as [_, player]}
		<PlayerCircle
			variant="status"
			status="success"
			class="h-14 w-14"
			badge={Python}
			badgeClass="size-6 bg-[#1D74C5]"
			badgeBackground="#1D74C5"
			{player}
		/>
	{/each}
</Pane>
