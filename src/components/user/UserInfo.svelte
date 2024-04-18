<script lang="ts">
	import { Trophy, Cake, Quotes } from '$components/icons';
	let { realName, username, wins, lang, since } = $props();
</script>

<div class="flex gap-x-5 rounded-sm bg-[#090909] p-5">
	<img src="https://picsum.photos/200/300" alt="" class="h-[5.75rem] min-w-[5.75rem] rounded-full object-cover" />
	<div class="flex flex-col overflow-hidden">
		<h1 class="truncate text-xl font-bold">{realName}</h1>
		<h3 class="truncate font-bold text-[#ACACAC]">{username}</h3>
		<div class="mt-4 flex items-center gap-2">
			<Trophy />
			<p class="font-bold">{wins}</p>
			<Quotes />
			<p class="font-bold">{lang}</p>
			<Cake />
			<p class="font-bold">{since}</p>
		</div>
	</div>
</div>
