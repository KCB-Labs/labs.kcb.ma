import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import node from '@astrojs/node';
import keystatic from '@keystatic/astro';

// https://astro.build/config
// Verified against Astro 7.2.9 + @astrojs/node 11.1.4 + @keystatic/astro 6.0.0 via Astro MCP (mcp.docs.astro.build/mcp)
// Do not blindly copy from older docs — see specs/foundation/spec.md Decisions
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [react(), markdoc(), keystatic()],
  site: 'https://labs.kcb.ma',
});
