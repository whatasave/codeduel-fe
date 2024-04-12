<script lang="ts">
	import type { User } from '$lib/types';

	let { player }: { player: User } = $props();
</script>

<div class="h-[4.5rem] w-[4.5rem] rounded-full border-[0.2rem] border-[#A3A3A3]">
	<img class="h-full w-full rounded-full" src={player.avatar} alt={player.username} title={player.username} />
</div>
