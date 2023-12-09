import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import { qwikCity } from '@builder.io/qwik-city/vite';
import { qwikVite } from '@builder.io/qwik/optimizer';

import { SITE } from './src/config.mjs';
import { svgLoader } from './svgLoader.js';

const path = require('path');

export default defineConfig(() => {
  return {
    plugins: [
      qwikCity({
        basePathname: SITE.basePathname,
        trailingSlash: SITE.trailingSlash,
      }),
      qwikVite(),
      tsconfigPaths(),
      svgLoader({
        removeTags: true,
        removeSVGTagAttrs: true,
      }),
    ],
    preview: {
      headers: {
        'Cache-Control': 'public, max-age=600',
      },
    },
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
  };
});
