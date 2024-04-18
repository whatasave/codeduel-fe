import { cva } from 'class-variance-authority';

export const styles = cva('w-fit h-fit disabled:opacity-60 disabled:cursor-not-allowed', {
	variants: {
		variant: {
			primary: 'px-6 py-1 bg-[#151515] text-white rounded-sm font-semibold',
			accent: 'px-6 py-1 bg-[#ECC206] rounded-sm text-black font-semibold',
			empty: 'px-6 py-1 border-2 text-white border-white rounded-sm font-semibold',
			danger: 'px-6 py-1 bg-red-500 text-white rounded-sm font-semibold'
		}
	}
});
