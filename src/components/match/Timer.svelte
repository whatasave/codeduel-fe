<script lang="ts">
	import dayjs from 'dayjs';
	import { onMount } from 'svelte';

	let { time } = $props<{ time: string }>();
	let delta = $state(dayjs(time).diff(dayjs(), 'milliseconds'));

	onMount(() => {
		const interval = setInterval(() => {
			delta = dayjs(time).diff(dayjs(), 'milliseconds');
		}, 1000);
		return () => clearInterval(interval);
	});
</script>

<span>{dayjs(delta).format('mm:ss')}</span>
