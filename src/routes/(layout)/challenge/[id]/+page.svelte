<script lang="ts">
	import Loading from '$components/icons/Loading.svelte';
	import Avatar from '$components/match/Avatar.svelte';
	import type { PageData } from './$types';
	import Markdown from '$components/Markdown.svelte';

	const { data }: { data: PageData } = $props();
</script>

<div class="mx-auto my-auto flex w-full max-w-[800px] flex-col items-stretch justify-center gap-8">
	<div class="flex flex-col items-center gap-2">
		<span class="text-xs">{data.challenge.created_at}</span>
		<h1 class="text-4xl font-bold">{data.challenge.title}</h1>
		<h2>
			<!-- owner -->
			{#await data.owner}
				<Loading fill="#8dd741" class="mx-auto" />
			{:then users}
				{@const owner = users[0]}
				<a href="/user/{owner.username}" class="flex gap-2">
					<Avatar user={owner} class="size-6" />
					<p class="font-bold">{owner.username}</p>
				</a>
			{:catch}
				<p>No owner found</p>
			{/await}
		</h2>
	</div>
	<div class="text-center">{data.challenge.description}</div>

	<Markdown source={data.challenge.content} class="markdown" />
</div>
