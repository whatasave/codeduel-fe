<script lang="ts">
	let { image }: { image: string } = $props();
</script>

<div class="mx-auto min-h-60 w-full max-w-[1200px] overflow-hidden rounded">
	<img class="h-full w-full object-cover" src={image} alt="profile background" />
</div>
