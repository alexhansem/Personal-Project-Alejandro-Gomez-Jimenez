// @ts-check
import { defineConfig } from 'astro/config';

// SITE_URL y BASE_PATH permiten publicar en un dominio propio o en una subcarpeta
// (por ejemplo GitHub Pages: BASE_PATH=/nombre-del-repo).
const site = process.env.SITE_URL || undefined;
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  markdown: {
    shikiConfig: { theme: 'github-light' },
  },
});
