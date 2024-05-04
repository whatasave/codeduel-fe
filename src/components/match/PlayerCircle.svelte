<script lang="ts">
	import type { User } from '$lib/types';
	import { cva, type VariantProps } from 'class-variance-authority';
	import clsx from 'clsx';
	import type { ComponentType, SvelteComponent } from 'svelte';

	const classes = cva('relative rounded-full border-[#A3A3A3]', {
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
		player: User;
		class?: string;
		badge?: ComponentType<SvelteComponent>;
		badgeClass?: string;
		badgeBackground?: string;
	}

	let { player, badge, badgeClass, variant, status = 'default', class: className }: $Props = $props();
	let showImg = $state(true);
</script>

<div class={classes({ variant, status, className })}>
	<div class="h-full w-full overflow-hidden rounded-full bg-[#A3A3A3]">
		{#if showImg}
			<img
				class="h-full w-full rounded-full"
				src={player.avatar}
				alt={player.username}
				title={player.username}
				onerror={() => {
					showImg = false;
				}}
			/>
		{/if}
	</div>
	{#if badge}
		<div class={clsx(`absolute bottom-0 right-0 flex items-center justify-center rounded-full p-1`, badgeClass)}>
			<svelte:component this={badge} />
		</div>
	{/if}
</div>
