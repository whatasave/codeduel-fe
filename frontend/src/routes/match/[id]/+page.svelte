<script lang="ts">
	const users = $state([
		{ id: 1, name: 'John' },
		{ id: 2, name: 'Jane' },
		{ id: 3, name: 'Jack' }
	]);
</script>

<h1>Match</h1>

<h2>Users:</h2>
{#each users as user}
	<div>
		<a href="user/{user.id}">{user.name}</a>
	</div>
{/each}

<h2>Statement</h2>

<h2>Chat</h2>

<h2>CodeEditor</h2>
