<script>
	import { page } from '$app/stores';

	const JWT = localStorage.getItem('jwt') ?? undefined;
	let loggedUserData = $state({});

	async function fetchProfileData() {
		const res = await fetch('http://localhost:5000/api/v1/profile', {
			method: 'GET',
			credentials: 'include',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${JWT}`
			}
		});
		const data = await res.json();
		loggedUserData = data;
		console.log('data', data);
	}

	$effect(() => {
		fetchProfileData();
	});
</script>

<div class="min-h-60 w-full overflow-hidden rounded">
	<img class="h-full w-full object-cover" src="/img/profile-bg.jpg" alt="profile background" />
</div>

<div class="mx-auto -mt-10 flex w-full max-w-[800px] flex-col gap-1">
	<div class="size-20 overflow-hidden rounded-full border-4 bg-white">
		<img class="h-full w-full object-cover" src="/icon/profile-default.svg" alt="profile background" />
	</div>
	<div class="flex gap-8">
		<div class="flex w-80 flex-col gap-4">
			<div class="px-1">
				<div class="px-1 text-xl font-bold">John Doe</div>
				<div class="text-base opacity-70">@johndoe</div>
			</div>
			<div class="px-1 text-sm">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet quas excepturi sequi dolorum accusantium nisi,
				similique numquam voluptas ea voluptate! Ex beatae laudantium ullam quidem ea soluta assumenda incidunt modi?
			</div>
			<div class="flex flex-wrap gap-2">
				<div class="flex flex-1 flex-col items-center justify-center rounded bg-[#050505] p-4">
					<div class="text-lg">2k</div>
					<div class="text-sm font-bold">Played</div>
				</div>
				<div class="flex flex-1 flex-col items-center justify-center rounded bg-[#050505] p-4">
					<div class="text-lg">128</div>
					<div class="text-sm font-bold">Top 3</div>
				</div>
				<div class="flex flex-1 flex-col items-center justify-center rounded bg-[#050505] p-4">
					<div class="text-lg">69</div>
					<div class="text-sm font-bold">Won</div>
				</div>
			</div>
		</div>
		<div class="flex flex-1 flex-col gap-2">
			<pre class="p-2">
username: {$page.params.username}
--------------------------------------------
data:
{JSON.stringify(loggedUserData, null, 2)}
			</pre>

			<div>Games</div>
			<div class="h-16 w-full rounded bg-[#050505]"></div>
			<div class="h-16 w-full rounded bg-[#050505]"></div>
			<div class="h-16 w-full rounded bg-[#050505]"></div>
			<div class="h-16 w-full rounded bg-[#050505]"></div>
			<div class="h-16 w-full rounded bg-[#050505]"></div>
			<div class="h-16 w-full rounded bg-[#050505]"></div>
			<div class="h-16 w-full rounded bg-[#050505]"></div>
			<div class="h-16 w-full rounded bg-[#050505]"></div>
			<div class="h-16 w-full rounded bg-[#050505]"></div>
			<div class="h-16 w-full rounded bg-[#050505]"></div>
		</div>
	</div>
</div>
