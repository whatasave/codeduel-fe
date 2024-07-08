<script lang="ts">
	import Footer from '$components/footer/Footer.svelte';
	import Navbar from '$components/navbar/Navbar.svelte';
	import type { Snippet } from 'svelte';
	import { getUser } from '../context';

	const user = getUser();

	let { children }: { children: Snippet } = $props();
</script>

<div class="flex h-full min-h-0 flex-col gap-2 p-2 text-white/90">
	<Navbar {user} />

	<main class="flex flex-1 flex-col overflow-y-auto">
		{@render children()}
	</main>

	<Footer />
</div>
