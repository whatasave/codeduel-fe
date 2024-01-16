<script lang="ts">
	import Markdown from '$components/Markdown.svelte';
	import Pane from '$components/Pane.svelte';
	import Editor from '$components/editor/Editor.svelte';

	const source = `
## Goal
A complex palindrome is a string that is a palindrome when only its alphanumeric characters are considered and the case of the characters is ignored. The task is to determine whether a given string is a complex palindrome.

## Input
A string text made of ASCII characters.
## Output
if the string is a palindrome the program will return complex palindrome and the filtered text separated by a comma and a space. The filtered text will be all lowercase and will have a space between the words.

if the string is not a palindrome the program will return not a complex palindrome.

	`;
</script>

<div class="flex h-full p-2 gap-2">
	<Pane class="flex flex-col w-20 h-full"></Pane>
	<div class="flex flex-col flex-[0.7_0.7_0%] gap-2 h-full">
		<Pane class="flex flex-col flex-1 min-h-0 p-4 pr-2">
			<Markdown class="flex-1 pr-2" {source} />
		</Pane>
		<Pane class="flex p-2 flex-col h-80 gap-1">
			<h2 class="font-semibold text-[1.25rem]">Examples</h2>
			<div class="flex gap-2 flex-1">
				<Pane class="h-full flex-1 bg-black flex flex-col">
					<h3 class="text-center my-2">input</h3>
				</Pane>
				<Pane class="h-full flex-1 bg-black flex flex-col">
					<h3 class="text-center my-2">output</h3>
				</Pane>
			</div>
		</Pane>
		<Pane class="flex flex-col h-20"></Pane>
	</div>
	<div class="flex flex-col flex-1 gap-2 h-full">
		<Pane class="flex flex-col flex-1">
			<Editor class="flex-1" />
		</Pane>
		<Pane class="flex flex-col h-80"></Pane>
	</div>
</div>
