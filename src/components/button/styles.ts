import { cva } from 'class-variance-authority';

export const styles = Object.freeze(
	cva('w-fit h-fit disabled:opacity-60 disabled:cursor-not-allowed', {
		variants: {
			variant: {
				primary: 'px-6 py-1 bg-white/60 text-[#E5E5E5] rounded-sm font-semibold',
				accent: 'px-6 py-1 bg-[#8DD741] rounded-sm text-[#01162E] font-semibold',
				empty: 'px-6 py-1 border-2 text-[#8DD741] border-[#8DD741] rounded-sm font-semibold',
				danger: 'px-6 py-1 bg-red-500 text-[#E5E5E5] rounded-sm font-semibold'
			}
		}
	})
);
