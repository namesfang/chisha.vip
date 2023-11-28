import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { readFileSync } from 'node:fs';

import { fileURLToPath } from 'node:url'

const path = fileURLToPath(new URL('package.json', import.meta.url))
const pkg = JSON.parse(readFileSync(path, 'utf8'))

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		version: {
			name: pkg.version
		},
		adapter: adapter({
			routes: {
				include: ['/*'],
				exclude: ['<all>']
			}
		}),
		alias: {
			$components: 'src/components'
		}
	}
};

export default config;
