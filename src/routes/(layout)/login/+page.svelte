<script lang="ts">
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import { Github } from '$components/icons';

	let { data } = $props();
</script>

<div class="m-auto flex flex-col items-center justify-center gap-4">
	{#if data.user}
		<div class="overflow-auto p-4">
			<h1>Logged in</h1>
			<pre class="h-[80%] w-[80%] overflow-auto">{JSON.stringify(data.user, null, 2)}</pre>
		</div>
	{:else}
		<h1>Not logged in</h1>
		<a
			href="{PUBLIC_BACKEND_URL}/v1/auth/github"
			class="flex w-fit items-center gap-2 rounded-sm bg-[#8DD741] px-8 py-2 text-[1.25rem] font-semibold text-black"
		>
			<Github fill="#000000" />
			<span>Login with Github</span>
		</a>
	{/if}
</div>
