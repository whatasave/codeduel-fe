<script lang="ts">
	import { Trophy, Cake, Quotes } from '$components/icons';
	import ProfileTag from '$components/profile/ProfileTag.svelte';
	let {
		name,
		username,
		wins,
		lang,
		since,
		avatar
	}: { name: string; username: string; wins: number; lang: string; since: string; avatar: string } = $props();
</script>

<a href="user/{username}" class="flex gap-x-5 rounded bg-white/5 p-5">
	<img src={avatar} alt="" class="h-[5.75rem] min-w-[5.75rem] rounded-full object-cover" />
	<div class="flex flex-col overflow-hidden">
		<h1 class="truncate text-xl font-bold">{name}</h1>
		<ProfileTag tag={username} />
		<div class="mt-4 flex items-center gap-2">
			<Trophy />
			<p class="font-bold">{wins}</p>
			<Quotes />
			<p class="font-bold">{lang}</p>
			<Cake />
			<p class="font-bold">{since}</p>
		</div>
	</div>
</a>
