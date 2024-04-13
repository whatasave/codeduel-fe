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

<div class="rounded min-h-60 w-full overflow-hidden">
	<img class="h-full w-full object-cover" src="/img/profile-bg.jpg" alt="profile background" />
</div>

<div class="w-full -mt-10 max-w-[800px] mx-auto flex flex-col gap-1">
	<div class="size-20 overflow-hidden rounded-full border-4 bg-white">
		<img class="h-full w-full object-cover" src="/icon/profile-default.svg" alt="profile background" />
	</div>
	<div class="flex gap-8">
		<div class="flex flex-col gap-4 w-80">
			<div class="px-1">
				<div class="font-bold text-xl px-1">John Doe</div>
				<div class="text-base opacity-70">@johndoe</div>
			</div>
			<div class="text-sm px-1">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet quas excepturi sequi dolorum accusantium nisi,
				similique numquam voluptas ea voluptate! Ex beatae laudantium ullam quidem ea soluta assumenda incidunt modi?
			</div>
			<div class="flex flex-wrap gap-2">
				<div class="bg-[#050505] p-4 rounded flex-1 justify-center items-center flex flex-col">
					<div class="text-lg">2k</div>
					<div class="font-bold text-sm">Played</div>
				</div>
				<div class="bg-[#050505] p-4 rounded flex-1 justify-center items-center flex flex-col">
					<div class="text-lg">128</div>
					<div class="font-bold text-sm">Top 3</div>
				</div>
				<div class="bg-[#050505] p-4 rounded flex-1 justify-center items-center flex flex-col">
					<div class="text-lg">69</div>
					<div class="font-bold text-sm">Won</div>
				</div>
			</div>
		</div>
		<div class="flex-1 flex flex-col gap-2">
			<pre class="p-2">
username: {$page.params.username}
--------------------------------------------
data:
{JSON.stringify(loggedUserData, null, 2)}
			</pre>

			<div>Games</div>
			<div class="rounded h-16 w-full bg-[#050505]"></div>
			<div class="rounded h-16 w-full bg-[#050505]"></div>
			<div class="rounded h-16 w-full bg-[#050505]"></div>
			<div class="rounded h-16 w-full bg-[#050505]"></div>
			<div class="rounded h-16 w-full bg-[#050505]"></div>
			<div class="rounded h-16 w-full bg-[#050505]"></div>
			<div class="rounded h-16 w-full bg-[#050505]"></div>
			<div class="rounded h-16 w-full bg-[#050505]"></div>
			<div class="rounded h-16 w-full bg-[#050505]"></div>
			<div class="rounded h-16 w-full bg-[#050505]"></div>
		</div>
	</div>
</div>
