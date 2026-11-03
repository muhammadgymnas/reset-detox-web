// Every picture the site uses, keyed by the names in the data files.
import type { ImageMetadata } from 'astro';
const files = import.meta.glob<{ default: ImageMetadata }>('../assets/**/*.{png,jpg}', { eager: true });

export function img(name: string): ImageMetadata {
  const hit = Object.entries(files).find(([p]) => p.endsWith(`/${name}.png`) || p.endsWith(`/${name}.jpg`));
  if (!hit) throw new Error(`Missing image: ${name}`);
  return hit[1].default;
}
