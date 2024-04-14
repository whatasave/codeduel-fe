<script lang="ts">
	import { Stopwatch } from '$components/icons';
	import dayjs from 'dayjs';
	import { onMount } from 'svelte';

	let { time }: { time: string } = $props();
	let delta = $state(dayjs(time).diff(dayjs(), 'milliseconds'));

	onMount(() => {
		const interval = setInterval(() => {
			delta = dayjs(time).diff(dayjs(), 'milliseconds');
		}, 1000);
		return () => clearInterval(interval);
	});
</script>

<div class="flex items-center gap-2 rounded-sm bg-[#151515] px-6 py-1 font-semibold text-white">
	<Stopwatch class="size-4" />
	<span class="font-mono">{dayjs(delta).format('mm:ss')}</span>
</div>
