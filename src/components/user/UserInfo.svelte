<script lang="ts">
	import { Trophy, Cake, Quotes } from '$components/icons';
	import Avatar from '$components/match/Avatar.svelte';
	import ProfileTag from '$components/profile/ProfileTag.svelte';

	interface $Props {
		name: string;
		username: string;
		wins: number;
		lang: string;
		since: string;
		avatar: string | null;
	}

	let { name, username, wins, lang, since, avatar }: $Props = $props();
</script>

<a href="user/{username}" class="flex gap-x-5 rounded bg-white/5 p-5">
	<Avatar user={{ username, avatar }} class="size-16" />
	<div class="flex flex-col gap-2 overflow-hidden">
		<div>
			<h1 class="truncate text-xl font-bold">{name}</h1>
			<ProfileTag tag={username} />
		</div>
		<div class="flex flex-wrap items-center gap-4">
			<div class="flex gap-2">
				<Trophy />
				<p class="text-sm">{wins}</p>
			</div>
			<div class="flex gap-2">
				<Quotes />
				<p class="text-sm">{lang}</p>
			</div>
			<div class="flex gap-2">
				<Cake />
				<p class="text-sm">{since}</p>
			</div>
		</div>
	</div>
</a>
