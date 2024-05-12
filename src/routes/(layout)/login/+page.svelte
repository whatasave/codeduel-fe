<script lang="ts">
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import { Github } from '$components/icons';
	import ButtonIconLink from '$components/button/ButtonIconLink.svelte';

	let { data } = $props();

	console.log('data', data);

	const githubLoginUrl = () => {
		const url = new URL('/v1/auth/github', PUBLIC_BACKEND_URL);
		const returnTo = new URL('/lobby', window.location.origin);
		url.searchParams.set('return_to', returnTo.toString());
		return url.toString();
	};
</script>

<div class="m-auto flex flex-col items-center justify-center gap-4">
	{#if data.user}
		<div class="overflow-auto p-4">
			<h1>Logged in</h1>
			<pre class="h-[90%] w-[90%] overflow-auto">{JSON.stringify(data.user, null, 2)}</pre>
		</div>
	{:else}
		<ButtonIconLink
			variant="accent"
			href={githubLoginUrl()}
			icon={{
				icon: Github,
				align: 'left',
				fill: '#01162E'
			}}
			text="Login with Github"
		/>
	{/if}
</div>
