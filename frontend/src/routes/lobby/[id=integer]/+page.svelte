<script lang="ts">
	const users = $state([
		{ id: 1, name: 'John' },
		{ id: 2, name: 'Jane' },
		{ id: 3, name: 'Jack' }
	]);
</script>

<h1>Lobby</h1>

{#each users as user}
	<div>
		<a href="user/{user.id}">{user.name}</a>
	</div>
{/each}
