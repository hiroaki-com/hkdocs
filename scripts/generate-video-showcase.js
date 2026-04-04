// @ts-check
'use strict';

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const BLOG_DIRS = {
  ja: path.join(__dirname, '../blog'),
  en: path.join(__dirname, '../i18n/en/docusaurus-plugin-content-blog'),
};
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

const result = {};
let totalItems = 0;

for (const [locale, dir] of Object.entries(BLOG_DIRS)) {
  if (!fs.existsSync(dir)) {
    result[locale] = [];
    continue;
  }

  const files = fs.readdirSync(dir).filter((f) => /\.(md|mdx)$/.test(f));

  result[locale] = files
    .map((filename) => {
      const raw = fs.readFileSync(path.join(dir, filename), 'utf8');
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

  totalItems += result[locale].length;
}

fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2) + '\n');
console.log(`[video-showcase] generated ${totalItems} item(s) → ${OUTPUT_FILE}`);
