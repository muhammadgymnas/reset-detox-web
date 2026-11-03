import { defineConfig } from 'astro/config';
export default defineConfig({
  site: 'https://resetdetox.id',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  image: { responsiveStyles: false },
  redirects: { '/support': '/shop', '/katalog': '/shop', '/bisnis': '/kontak#bisnis' },
});
