<script lang="ts">
	import clsx from 'clsx';
	import type { Component } from 'svelte';

	let { class: customClass, icon: Icon }: { class: string; icon: Component } = $props();
</script>

<div class={clsx(`absolute bottom-0 right-0 flex items-center justify-center rounded-full p-1`, customClass)}>
	<Icon />
</div>
