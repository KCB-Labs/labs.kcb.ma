import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import node from '@astrojs/node';
import keystatic from '@keystatic/astro';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validate } from './src/lib/content/validate.ts';
import { writeSearchIndex } from './src/lib/search/buildIndex.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://astro.build/config
// Verified against Astro 7.2.9 + @astrojs/node 11.1.4 + @keystatic/astro 6.0.0 via Astro MCP (mcp.docs.astro.build/mcp)
// Do not blindly copy from older docs — see specs/foundation/spec.md Decisions
const validateIntegration = {
  name: 'validate-relationships',
  hooks: {
    'astro:build:start': () => {
      validate();
    },
  },
};

const searchIndexIntegration = {
  name: 'search-index',
  hooks: {
    'astro:build:done': () => {
      const outputPath = path.join(__dirname, 'dist', 'search-index.json');
      writeSearchIndex(outputPath);
    },
  },
};

export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [react(), markdoc(), keystatic(), validateIntegration, searchIndexIntegration],
  site: 'https://labs.kcb.ma',
});
