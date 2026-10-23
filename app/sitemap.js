import { SLUGS } from './lib/routes';
import articles from '../data/articles';

export const dynamic = 'force-static';

const BASE = 'https://wagport.co';

export default function sitemap() {
  const now = new Date();
  return [
    { url: `${BASE}/`, lastModified: now, priority: 1 },
    { url: `${BASE}/guides/`, lastModified: now, priority: 0.8 },
    ...Object.values(SLUGS).map((s) => ({ url: `${BASE}/guides/${s}/`, lastModified: now, priority: 0.7 })),
    { url: `${BASE}/learn/`, lastModified: now, priority: 0.8 },
    ...articles.map((a) => ({ url: `${BASE}/learn/${a.slug}/`, lastModified: now, priority: 0.7 })),
    { url: `${BASE}/terms/`, lastModified: now, priority: 0.2 },
  ];
}
