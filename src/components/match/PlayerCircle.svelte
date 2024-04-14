<script lang="ts">
	import type { User } from '$lib/types';
	import { cva, type VariantProps } from 'class-variance-authority';
	import clsx from 'clsx';
	import type { ComponentType, SvelteComponent } from 'svelte';

	const classes = cva('relative h-[4.5rem] w-[4.5rem] rounded-full border-[#A3A3A3]', {
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

	interface $$Props extends VariantProps<typeof classes> {
		player: User;
		class?: string;
		badge?: ComponentType<SvelteComponent>;
		badgeBackground?: string;
	}

	let { player, badge, badgeBackground = '#A3A3A3', variant, status = 'default', class: className }: $$Props = $props();
	let showImg = $state(true);
</script>

<div class={classes({ variant, status, className })}>
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
	{#if badge}
		<div class="bg-[{badgeBackground}] absolute bottom-0 right-0 flex items-center justify-center rounded-full p-1">
			<svelte:component this={badge} />
		</div>
	{/if}
</div>
