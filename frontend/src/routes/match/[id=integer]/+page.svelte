<script lang="ts">
	import Pane from '$components/Pane.svelte';

	const users = $state([
		{ id: 1, name: 'John' },
		{ id: 2, name: 'Jane' },
		{ id: 3, name: 'Jack' }
	]);
</script>

<div class="flex h-full p-2 gap-2">
	<Pane class="flex flex-col w-20 h-full"></Pane>
	<div class="flex flex-col flex-[0.8_0.8_0%] gap-2">
		<Pane class="flex flex-col flex-1"></Pane>
		<Pane class="flex flex-col h-20"></Pane>
	</div>
	<div class="flex flex-col flex-1 gap-2">
		<Pane class="flex flex-col flex-1"></Pane>
		<Pane class="flex flex-col h-80"></Pane>
	</div>
</div>
