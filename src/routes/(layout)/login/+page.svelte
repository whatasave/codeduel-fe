<script lang="ts">
	// const urlParams = new URLSearchParams(window.location.search);
	// const isBeta = urlParams.has('beta');
	// console.log(urlParams);
	import { page } from '$app/stores';
	import { Github } from '$components/icons';
	import { writable } from 'svelte/store';

	const Login_URL = 'http://localhost:5000/v1/auth/github';
	const JWT = writable<string | undefined>(undefined);

	console.log('page', $page);
	if ($page.url.searchParams.has('jwt')) {
		console.log('has jwt');
		$JWT = $page.url.searchParams.get('jwt') ?? undefined;
		console.log('JWT:', $JWT);

		console.log('cookies', document.cookie);

		localStorage.setItem('jwt', $JWT?.toString() ?? '');
	}
</script>

<div class="m-auto flex flex-col items-center justify-center gap-4">
	{#if $JWT}
		<h1>Logged in</h1>
		<p class="max-w-96 overflow-x-scroll text-wrap">JWT: {$JWT}</p>
	{:else}
		<h1>Not logged in</h1>
		<a
			href={Login_URL}
			class="flex w-fit items-center gap-2 rounded-sm bg-[#ECC206] px-8 py-2 text-[1.25rem] font-semibold text-black"
		>
			<Github fill="#000000" />
			<span>Login with Github</span>
		</a>
	{/if}
</div>
