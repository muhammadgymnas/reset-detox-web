import type { APIRoute } from 'astro';

// Closed to crawlers until PUBLIC_INDEXING=true is set for the build (launch day).
const open = import.meta.env.PUBLIC_INDEXING === 'true';

export const GET: APIRoute = ({ site }) => {
  const body = open
    ? ['User-agent: *', 'Allow: /', '', `Sitemap: ${new URL('/sitemap.xml', site).href}`, ''].join('\n')
    : ['User-agent: *', 'Disallow: /', ''].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
