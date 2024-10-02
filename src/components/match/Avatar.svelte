<script lang="ts">
	import { cva, type VariantProps } from 'class-variance-authority';
	import clsx from 'clsx';
	import type { Component } from 'svelte';

	const classes = cva('relative rounded-full min-w-max', {
		variants: {
			variant: {
				status: 'border-[0.2rem]'
			},
			status: {
				default: 'border-[#A3A3A3]',
				success: 'border-green-500',
				info: 'border-blue-500',
				error: 'border-red-500'
			}
		}
	});

	interface $Props extends VariantProps<typeof classes> {
		user: { avatar: string | null; username: string };
		class?: string;
		badge?: Component;
		badgeClass?: string;
		badgeBackground?: string;
	}

	let { user, badge: Badge, badgeClass, variant, status, class: className }: $Props = $props();
	let showImg = $state(user.avatar !== null);
</script>

<div class={classes({ variant, status, className })}>
	<div class="h-full w-full overflow-hidden rounded-full bg-[#A3A3A3]">
		{#if showImg}
			<img
				class="h-full w-full rounded-full"
				src={user.avatar}
				alt={user.username}
				title={user.username}
				onerror={() => {
					showImg = false;
				}}
			/>
		{/if}
	</div>
	{#if Badge}
		<div class={clsx(`absolute bottom-0 right-0 flex items-center justify-center rounded-full p-1`, badgeClass)}>
			<Badge />
		</div>
	{/if}
</div>
