<script lang="ts" generics="T">
	let {
		options,
		selectedIndex = $bindable(),
		mapToString,
		onselect
	}: {
		options: T[];
		selectedIndex: number;
		mapToString: (option: T) => string;
		onselect?: (this: HTMLSelectElement) => void;
	} = $props();

	function onchange(this: HTMLSelectElement) {
		selectedIndex = parseInt(this.value);
		onselect?.call(this);
	}
</script>

<select class="cursor-pointer rounded-sm border border-white/40 bg-[#252525] px-1 py-1" {onchange}>
	{#each options as option, i}
		<option class="bg-[#252525]" value={i} selected={i === selectedIndex}>{mapToString(option)}</option>
	{/each}
</select>
