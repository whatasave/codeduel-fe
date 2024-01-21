<script lang="ts">
	import Pane from '$components/Pane.svelte';
	import clsx from 'clsx';

	let { class: className } = $props<{ class?: string }>();
</script>

<Pane class={clsx('flex flex-col', className)}></Pane>
