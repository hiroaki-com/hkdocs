// @ts-check
'use strict';

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const BLOG_DIR = path.join(__dirname, '../blog');
const OUTPUT_FILE = path.join(__dirname, '../src/data/video-showcase.json');

/**
 * Derive the Docusaurus blog post URL from filename and frontmatter.
 * Default pattern: YYYY-MM-DD-slug.md → /blog/YYYY/MM/DD/slug
 * Frontmatter `slug` field takes precedence.
 */
function resolveUrl(filename, frontmatter) {
  if (frontmatter.slug) {
    return `/blog/${frontmatter.slug}`;
  }
  const match = filename.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)\.(md|mdx)$/);
  if (match) {
    const [, year, month, day, slug] = match;
    return `/blog/${year}/${month}/${day}/${slug}`;
  }
  return `/blog/${filename.replace(/\.(md|mdx)$/, '')}`;
}

const files = fs.readdirSync(BLOG_DIR).filter((f) => /\.(md|mdx)$/.test(f));

const items = files
  .map((filename) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf8');
    const { data } = matter(raw);
    if (!data.video_asset) return null;
    return {
      title: data.title ?? filename,
      url: resolveUrl(filename, data),
      video_asset: data.video_asset,
    };
  })
  .filter(Boolean)
  .sort((a, b) => b.url.localeCompare(a.url)); // newest first

fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(items, null, 2) + '\n');
console.log(`[video-showcase] generated ${items.length} item(s) → ${OUTPUT_FILE}`);
