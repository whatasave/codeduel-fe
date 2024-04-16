<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$components/button/Button.svelte';
</script>

<div class="h-full w-full p-2">
	<div class="flex h-full flex-col items-center justify-center gap-8 rounded bg-[#050505] text-white">
		<div class="flex flex-col items-center">
			<div class="text-4xl">{$page.status}</div>
			<div class="text-8xl">{$page.error?.message}</div>
		</div>
		<Button
			text="Go back"
			variant="accent"
			onclick={() => {
				console.log(window.history);
				window.history.back();
			}}
		/>
	</div>
</div>
