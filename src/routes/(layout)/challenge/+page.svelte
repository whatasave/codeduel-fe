<script lang="ts">
	import Loading from '$components/icons/Loading.svelte';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
</script>

<div class="mx-auto my-auto flex w-[800px] flex-col items-stretch justify-center gap-2">
	<h1 class="text-center text-4xl font-bold">Challenges</h1>
	{#await data.challenges}
		<Loading fill="#8dd741" class="mx-auto" />
	{:then challenges}
		{#if challenges.length === 0}
			<p>No challenges found</p>
		{/if}
		{#each challenges as challenge}
			<a href={`/challenge/${challenge.id}`} class="rounded bg-white/5 p-4 px-6">
				<h2 class="text-2xl font-bold">{challenge.title}</h2>
				<p>{challenge.description}</p>
			</a>
		{/each}
	{:catch error}
		<p>{error}</p>
	{/await}
</div>
