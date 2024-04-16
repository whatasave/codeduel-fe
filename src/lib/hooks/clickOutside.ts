import type { ActionReturn } from 'svelte/action';

export const clickOutside = (node: HTMLElement, cb: () => void): ActionReturn<() => void> => {
	const onClick = (event: MouseEvent) => {
		if (node && !node.contains(event.target as HTMLElement) && !event.defaultPrevented) cb();
	};

	document.addEventListener('click', onClick, true);

	return {
		destroy() {
			document.removeEventListener('click', onClick, true);
		}
	};
};
