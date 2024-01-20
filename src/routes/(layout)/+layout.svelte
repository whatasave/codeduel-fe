<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children } = $props<{ children: Snippet }>();
</script>

<div class="min-h-full flex flex-col">
	<nav class="bg-[#050505] p-4 flex justify-between rounded">
		<div class="flex gap-2">
			<a href="/">Home</a>
			<a href="/match/1">Match</a>
			<a href="/lobby/1">Lobby</a>
		</div>

		<div class="flex gap-2">
			<a href="/login">Login</a>
			<a href="/logout">Logout</a>
			|
			<a href="/user/1">User</a>
			<a href="/settings">Settings</a>
		</div>
	</nav>

	<main class="flex-1 min-h-0">
		{@render children()}
	</main>

	<footer class="bg-[#050505] py-6 px-10 text-xs gap-2 flex rounded">
		<span>© 2024 CodeDuel.</span>
		<a href="#privacy">Privacy</a>
		<a href="#terms">Terms</a>
		<a href="#contact">Contact</a>
		<a href="#about">About</a>
		<a href="#faq">FAQ</a>
		<a href="#cookie">Cookie</a>
	</footer>
</div>
