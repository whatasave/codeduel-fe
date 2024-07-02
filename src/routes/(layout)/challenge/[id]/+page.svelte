<script lang="ts">
	import Avatar from '$components/match/Avatar.svelte';
	import Markdown from '$components/Markdown.svelte';

	const { data } = $props();
</script>

<div class="mx-auto my-auto flex w-full max-w-[800px] flex-col items-stretch justify-center gap-8">
	<div class="flex flex-col items-center gap-2">
		<span class="text-xs">{data.challenge.createdAt}</span>
		<h1 class="text-4xl font-bold">{data.challenge.title}</h1>
		<h2>
			<a href="/user/{data.challenge.owner.username}" class="flex gap-2">
				<Avatar user={data.challenge.owner} class="size-6" />
				<p class="font-bold">{data.challenge.owner.username}</p>
			</a>
		</h2>
	</div>
	<div class="text-center">{data.challenge.description}</div>

	<Markdown source={data.challenge.content} class="markdown" />
</div>
