import type { APIRoute } from 'astro';

export const prerender = true;

const paths = [
  '/',
  '/about',
  '/yanxue',
  '/youxue',
  '/courses',
  '/schedule',
  '/cases',
  '/teachers',
  '/news',
  '/guide',
  '/contact',
];

export const GET: APIRoute = ({ site }) => {
  const origin = site?.origin || process.env.PUBLIC_SITE_URL?.trim() || 'http://localhost:4321';
  const urls = paths
    .map((pathname) => `  <url><loc>${new URL(pathname, origin)}</loc></url>`)
    .join('\n');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } }
  );
};
