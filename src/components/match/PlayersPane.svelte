<script lang="ts">
	import Pane from '$components/Pane.svelte';
	import PlayerCircle from '$components/PlayerCircle.svelte';
	import type { User } from '$lib/types';

	let { players } = $props<{ players: User[] }>();
</script>

<Pane class="flex flex-col gap-2 p-2">
	{#each players as player}
		<PlayerCircle {player} />
	{/each}
</Pane>
