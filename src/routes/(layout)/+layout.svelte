<script lang="ts">
	import Footer from '$components/footer/Footer.svelte';
	import Navbar from '$components/navbar/Navbar.svelte';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div class="min-h-full flex flex-col p-2">
	<Navbar />

	<main class="flex-1 min-h-0 flex justify-center items-center">
		{@render children()}
	</main>

	<Footer />
</div>
