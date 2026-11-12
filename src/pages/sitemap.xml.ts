import type { APIRoute } from 'astro';
import catalog from '../data/catalog.json';
import { productUrl } from '../lib/product';

// Every public page. Order, cart and daily pages stay out: they are tools, not landing pages.
const fixed = ['/', '/program', '/shop', '/tentang', '/cerita', '/cara-kerja', '/faq', '/kontak', '/cek-kecocokan', '/privasi'];

export const GET: APIRoute = ({ site }) => {
  const paths = [...new Set([...fixed, ...catalog.programs.map((p) => p.url), ...catalog.support.map((s) => productUrl(s.name))])];
  const urls = paths.map((p) => `  <url><loc>${new URL(p.endsWith('/') ? p : `${p}/`, site).href}</loc></url>`);
  const body = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">', ...urls, '</urlset>', ''].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
