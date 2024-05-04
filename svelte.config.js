import adapterAuto from '@sveltejs/adapter-auto';
import adapterNode from '@sveltejs/adapter-node';

function adapter() {
	if (process.env.SVELTEKIT_ADAPTER === 'node') return adapterNode();
	if (process.env.SVELTEKIT_ADAPTER === 'auto') return adapterAuto();

	console.warn(
		'No adapter specified. Using `adapter-auto` by default. Specify `ADAPTER=node` or `ADAPTER=auto` to use a different adapter.'
	);
	return adapterAuto();
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			$components: './src/components'
		}
	},
	compilerOptions: {
		runes: true
	}
};

export default config;
