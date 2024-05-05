<script lang="ts">
	let { image }: { image: string } = $props();
</script>

<div class="mx-auto max-h-60 min-h-60 w-full max-w-[1200px] overflow-hidden rounded bg-white/5">
	<img class="h-full w-full object-cover" src={image} alt="profile background" />
</div>
