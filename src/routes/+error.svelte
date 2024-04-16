<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$components/button/Button.svelte';
	import Footer from '$components/footer/Footer.svelte';
	import Navbar from '$components/navbar/Navbar.svelte';
</script>

<div class="flex h-full min-h-0 flex-col p-2">
	<Navbar />

	<div class="h-full w-full py-2">
		<div class="flex h-full flex-col items-center justify-center gap-8 rounded bg-[#050505] text-white">
			<div class="flex flex-col items-center">
				<div class="text-6xl">{$page.status}</div>
				<div class="text-2xl">{$page.error?.message}</div>
			</div>
			<Button text="Go back" variant="accent" onclick={() => window.history.back()} />
		</div>
	</div>

	<Footer />
</div>
