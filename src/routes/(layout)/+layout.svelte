<script lang="ts">
	import Footer from '$components/footer/Footer.svelte';
	import Navbar from '$components/navbar/Navbar.svelte';
	import type { Snippet } from 'svelte';
	import type { PageData } from './$types';

	let { data, children }: { data: PageData, children: Snippet } = $props();

</script>

<div class="min-h-0 h-full flex flex-col p-2 gap-2">
	<Navbar user={data.user} />

	<main class="flex-1 flex flex-col overflow-y-auto">
		{@render children()}
	</main>

	<Footer />
</div>
