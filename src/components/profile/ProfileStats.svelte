<script lang="ts">
	let { stat, title }: { stat: string; title: string } = $props();
</script>

<div class="flex flex-1 flex-col items-center justify-center rounded bg-[#050505] p-4">
	<div class="text-lg">{stat}</div>
	<div class="text-sm font-bold">{title}</div>
</div>
