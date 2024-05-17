<script lang="ts">
	let { stat, name }: { stat: string; name: string } = $props();
</script>

<div class="flex flex-col items-center justify-center rounded bg-[#050505] px-8 py-4">
	<div class="text-lg">{stat}</div>
	<div class="text-sm font-bold">{name}</div>
</div>
