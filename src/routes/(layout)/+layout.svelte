<script lang="ts">
	import Footer from '$components/footer/Footer.svelte';
	import Navbar from '$components/navbar/Navbar.svelte';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div class="min-h-0 h-full flex flex-col p-2">
	<Navbar />

	<main class="flex-1 flex flex-col py-2 overflow-y-auto">
		{@render children()}
	</main>

	<Footer />
</div>
