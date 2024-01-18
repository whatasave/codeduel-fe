<script lang="ts" generics="T">
	let { options, selectedIndex, mapToString } = $props<{
		options: T[];
		selectedIndex: number;
		mapToString: (option: T) => string;
	}>();

	function onchange(this: HTMLSelectElement) {
		selectedIndex = parseInt(this.value);
	}
</script>

<select class="bg-transparent border border-white/40 rounded-sm px-1 cursor-pointer py-1" {onchange}>
	{#each options as option, i}
		<option class="bg-[#252525]" value={i} selected={i === selectedIndex}>{mapToString(option)}</option>
	{/each}
</select>
