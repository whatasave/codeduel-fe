<script lang="ts">
	import clsx from 'clsx';

	let { input, class: className } = $props<{ input: string; class?: string }>();
</script>

<div class={clsx('select-text m-4 font-mono whitespace-pre-wrap rounded overflow-y-auto', className)}>
	{input}
</div>
