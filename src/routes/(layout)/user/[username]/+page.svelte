<script>
	import { page } from '$app/stores';
	import { ProfileDefault } from '$components/icons';
	import ProfileTag from '$components/profile/ProfileTag.svelte';
	import ProfileStats from '$components/profile/ProfileStats.svelte';
	import ProfileBackground from '$components/profile/ProfileBackground.svelte';

	const JWT = localStorage.getItem('jwt') ?? undefined;
	let loggedUserData = $state({});

	let user = {
		name: 'John Doe',
		username: '@johndoe',
		avatar: '/img/avatar.jpg',
		bio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet quas excepturi sequi dolorum accusantium nisi, similique numquam voluptas ea voluptate! Ex beatae laudantium ullam quidem ea soluta assumenda incidunt modi?',
		stats: [
			{ name: 'Games', stat: '2k' },
			{ name: 'Followers', stat: '100' },
			{ name: 'Following', stat: '200' },
			{ name: 'Top 3', stat: '128' },
			{ name: 'Won', stat: '69' }
		]
	};

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

<ProfileBackground image="/img/profile-bg.jpg" />

<div class="mx-auto -mt-10 flex w-full max-w-[800px] flex-col gap-1 px-8">
	<div class="size-20 overflow-hidden rounded-full border-4 bg-white">
		<ProfileDefault fill="#000000" class="size-full" />
	</div>
	<div class="flex flex-wrap gap-8">
		<div class="flex w-80 shrink-0 grow flex-col gap-4">
			<div class="px-1">
				<div class="px-1 text-xl font-bold">{user.name}</div>
				<ProfileTag tag={user.username} />
			</div>
			<div class="px-1 text-sm">{user.bio}</div>
			<div class="flex flex-wrap justify-center gap-2">
				{#each user.stats as stat}
					<ProfileStats {...stat} />
				{/each}
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
