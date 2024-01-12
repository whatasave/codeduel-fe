<script lang="ts">
	// const urlParams = new URLSearchParams(window.location.search);
	// const isBeta = urlParams.has('beta');
	// console.log(urlParams);
	import { page } from '$app/stores';
	import { writable } from 'svelte/store';

	const Login_URL = 'http://localhost:5000/api/v1/auth/github';
	const JWT = writable<string | undefined>(undefined);

	console.log('page', $page);
	if ($page.url.searchParams.has('jwt')) {
		console.log('has jwt');
		$JWT = $page.url.searchParams.get('jwt') ?? undefined;
		console.log('JWT:', $JWT);

		localStorage.setItem('jwt', $JWT?.toString() ?? '');
	}
</script>

<div>
	{#if $JWT}
		<h1>Logged in</h1>
		<p>JWT: {$JWT}</p>
	{:else}
		<h1>Not logged in</h1>
		<a href={Login_URL}>Login</a>
	{/if}
</div>
