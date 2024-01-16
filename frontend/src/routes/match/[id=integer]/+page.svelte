<script lang="ts">
	const users = $state([
		{ id: 1, name: 'John' },
		{ id: 2, name: 'Jane' },
		{ id: 3, name: 'Jack' }
	]);
</script>

<div class="flex h-full p-2 gap-2">
	<div class="flex flex-col w-20 h-full bg-[#090909] rounded"></div>
	<div class="flex flex-col flex-[0.8_0.8_0%] gap-2">
		<div class="flex flex-col flex-1 bg-[#090909] rounded"></div>
		<div class="flex flex-col h-20 bg-[#090909] rounded"></div>
	</div>
	<div class="flex flex-col flex-1 gap-2">
		<div class="flex flex-col flex-1 bg-[#090909] rounded"></div>
		<div class="flex flex-col h-80 bg-[#090909] rounded"></div>
	</div>
</div>
