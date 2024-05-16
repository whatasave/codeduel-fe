<script>
	import Button from '$components/button/Button.svelte';
</script>

<div class="flex flex-col gap-2">
	<div class="flex items-center gap-2">
		<Button text="null" />
		<Button variant="accent" text="accent" />
		<Button variant="danger" text="danger" />
		<Button variant="empty" text="empty" />
		<Button variant="primary" text="primary" />
	</div>
	<div class="flex items-center gap-2">
		<Button disabled text="null" />
		<Button disabled variant="accent" text="accent" />
		<Button disabled variant="danger" text="danger" />
		<Button disabled variant="empty" text="empty" />
		<Button disabled variant="primary" text="primary" />
	</div>
</div>
