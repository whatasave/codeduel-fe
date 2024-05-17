<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$components/button/Button.svelte';
	import Footer from '$components/footer/Footer.svelte';
	import Navbar from '$components/navbar/Navbar.svelte';
	import { get } from 'svelte/store';
	import type { PageData } from './(layout)/$types';

	let { data }: { data: PageData } = $props();

	const statusToEmoji = (status: number) => {
		if (status === 400) return '🤔';
		if (status === 401) return '🔒';
		if (status === 403) return '🚫';
		if (status === 404) return '🔍';
		if (status === 500) return '🔥';
		if (status === 502) return '🔌';
		if (status === 503) return '🔧';
		if (status === 504) return '⏳';

		return '🤷';
	};
</script>

<div class="flex h-full min-h-0 flex-col p-2">
	<Navbar user={data.user} />

	<div class="h-full w-full py-2">
		<div class="flex h-full flex-col items-center justify-center gap-8 rounded bg-white/5 text-white">
			<div class="flex flex-col items-center gap-2 p-2">
				<div class="text-6xl">{statusToEmoji(get(page).status)}</div>
				<div class="font-mono text-2xl">{get(page).status}</div>
				<div class="text-center font-mono text-white/70">{get(page).error?.message}</div>
				{#if get(page).error?.code}
					<p>error code: {get(page).error?.code}</p>
				{/if}
			</div>
			<Button text="Go back" variant="accent" onclick={() => window.history.back()} />
		</div>
	</div>

	<Footer />
</div>
