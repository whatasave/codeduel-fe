<script lang="ts">
	import Clickable from '$components/button/Clickable.svelte';
</script>

<div>
	<Clickable
		class="rounded bg-blue-500 p-2 px-6 text-white"
		delay={2000}
		onclick={async () => {
			await new Promise((resolve) => setTimeout(resolve, 2000));
			console.log('T1');
		}}
	>
		Test
		{#snippet loading()}
			Loading...
		{/snippet}
	</Clickable>
</div>
