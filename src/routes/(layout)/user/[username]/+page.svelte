<script>
	import { page } from '$app/stores';

	const JWT = localStorage.getItem('jwt') ?? undefined;
	let loggedUserData = $state({});

	$effect(async () => {
		const res = await fetch('http://localhost:5000/api/v1/profile', {
			method: 'GET',
			credentials: 'include',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
				// Authorization: `Bearer ${JWT}`,
			}
		});
		const data = await res.json();
		loggedUserData = data;
		console.log('data', data);
	});
</script>

<h1>User Profile Page</h1>

<pre class="p-2">
username: {$page.params.username}
--------------------------------------------
data:
{JSON.stringify(loggedUserData, null, 2)}
</pre>
