<script lang="ts">
	import Button from '$components/button/Button.svelte';
	import Clickable from '$components/button/Clickable.svelte';
</script>

<div>
	<div class="flex gap-2 p-2">
		<Button text="Primary" variant="primary" />
		<Button text="Accent" variant="accent" />
		<Button text="Danger" variant="danger" />
		<!-- <Button text="Warning" variant="warning" />
		<Button text="Success" variant="success" />
		<Button text="Info" variant="info" /> -->
	</div>
</div>
