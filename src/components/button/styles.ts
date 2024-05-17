import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';

export const styles = cva(
	'w-fit h-fit disabled:opacity-60 hover:opacity-90 duration-400 transition-all disabled:cursor-not-allowed font-semibold',
	{
		variants: {
			variant: {
				primary: 'px-6 py-1 bg-white/60 text-[#01162E] rounded-sm',
				accent: 'px-6 py-1 bg-[#8DD741] rounded-sm text-[#01162E]',
				empty: 'px-6 py-1 border-2 text-[#8DD741] border-[#8DD741] rounded-sm',
				danger: 'px-6 py-1 bg-red-500 text-[#01162E] rounded-sm'
			}
		}
	}
);

export type Styles = VariantProps<typeof styles>;
