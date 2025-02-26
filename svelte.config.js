import adapterAuto from '@sveltejs/adapter-auto';
import adapterNode from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

function adapter(options) {
	if (process.env.SVELTEKIT_ADAPTER === 'node') return adapterNode(options);
	if (process.env.SVELTEKIT_ADAPTER === 'auto') return adapterAuto(options);

	console.warn(
		'No adapter specified. Using `adapter-auto` by default. Specify `ADAPTER=node` or `ADAPTER=auto` to use a different adapter.'
	);
	return adapterAuto(options);
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			out: 'build',
			precompress: true,
			envPrefix: ''
		}),
		alias: {
			$components: './src/components'
		}
	},
	compilerOptions: {
		runes: true
	}
};

export default config;
