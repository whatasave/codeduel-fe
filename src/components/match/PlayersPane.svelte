<script lang="ts">
	import Pane from '$components/Pane.svelte';
	import type { User, UserId } from '$lib/types';
	import PlayerCircle from './PlayerCircle.svelte';

	let { players } = $props<{ players: { [id: UserId]: User } }>();
</script>

<Pane class="flex flex-col gap-2 p-2">
	{#each Object.entries(players) as [_, player]}
		<PlayerCircle {player} />
	{/each}
</Pane>
