<script lang="ts">
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import { Github } from '$components/icons';
	import ButtonIconLink from '$components/button/ButtonIconLink.svelte';

	let { data } = $props();

	const githubLoginUrl = new URL('/v1/auth/github', PUBLIC_BACKEND_URL).href;
</script>

<div class="m-auto flex flex-col items-center justify-center gap-4">
	{#if data.user}
		<div class="w-full max-w-screen-xl p-2">
			<h1>Logged in</h1>
			<pre class="max-h-[600px] max-w-[600px] overflow-auto p-6">{JSON.stringify({ ...data }, null, 2)}</pre>
		</div>
	{:else}
		<ButtonIconLink
			variant="accent"
			href={githubLoginUrl}
			icon={{ icon: Github, align: 'left', fill: '#01162E' }}
			text="Login with Github"
		/>
	{/if}
</div>
