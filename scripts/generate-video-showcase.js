// @ts-check
'use strict';

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const BLOG_DIRS = {
  ja: path.join(__dirname, '../blog'),
  en: path.join(__dirname, '../i18n/en/docusaurus-plugin-content-blog'),
};
const DOCS_DIRS = {
  ja: path.join(__dirname, '../docs/tech'),
  en: path.join(__dirname, '../i18n/en/docusaurus-plugin-content-docs/current/tech'),
};
const OUTPUT_FILE = path.join(__dirname, '../src/data/video-showcase.json');

/**
 * Derive the Docusaurus blog post URL from filename and frontmatter.
 * Default pattern: YYYY-MM-DD-slug.md → /blog/YYYY/MM/DD/slug
 * Frontmatter `slug` field takes precedence.
 */
function resolveBlogUrl(filename, frontmatter) {
  if (frontmatter.slug) return `/blog/${frontmatter.slug}`;
  const match = filename.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)\.(md|mdx)$/);
  if (match) {
    const [, year, month, day, slug] = match;
    return `/blog/${year}/${month}/${day}/${slug}`;
  }
  return `/blog/${filename.replace(/\.(md|mdx)$/, '')}`;
}

/**
 * Derive the Docusaurus docs URL from relative path and frontmatter.
 * e.g. docusaurus/foo.mdx → /docs/tech/docusaurus/foo
 * Frontmatter `slug` field takes precedence.
 */
function resolveDocsUrl(relPath, frontmatter) {
  if (frontmatter.slug) return `/docs/${frontmatter.slug}`;
  return `/docs/tech/${relPath.replace(/\.(md|mdx)$/, '')}`;
}

/**
 * Recursively collect .md/.mdx file paths relative to `base` under `dir`.
 */
function collectFiles(dir, base = dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectFiles(full, base));
    } else if (/\.(md|mdx)$/.test(entry.name)) {
      files.push(path.relative(base, full));
    }
  }
  return files;
}

/** Extract ISO date string for sorting; blog filenames carry YYYY-MM-DD as fallback. */
function extractDate(filename, frontmatter) {
  if (frontmatter.date) return String(frontmatter.date).slice(0, 10);
  const match = filename.match(/^(\d{4}-\d{2}-\d{2})/);
  return match ? match[1] : '';
}

function parseBlogItems(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(md|mdx)$/.test(f))
    .flatMap((filename) => {
      const { data } = matter(fs.readFileSync(path.join(dir, filename), 'utf8'));
      if (!data.video_asset) return [];
      return [{ title: data.title ?? filename, url: resolveBlogUrl(filename, data), video_asset: data.video_asset, _date: extractDate(filename, data) }];
    });
}

function parseDocsItems(dir) {
  if (!fs.existsSync(dir)) return [];
  return collectFiles(dir)
    .flatMap((relPath) => {
      const posixRel = relPath.replace(/\\/g, '/');
      const { data } = matter(fs.readFileSync(path.join(dir, relPath), 'utf8'));
      if (!data.video_asset) return [];
      return [{ title: data.title ?? posixRel, url: resolveDocsUrl(posixRel, data), video_asset: data.video_asset, _date: extractDate(relPath, data) }];
    });
}

const result = {};
let totalItems = 0;

for (const locale of Object.keys(BLOG_DIRS)) {
  const items = [...parseBlogItems(BLOG_DIRS[locale]), ...parseDocsItems(DOCS_DIRS[locale])]
    .sort((a, b) => b._date.localeCompare(a._date) || b.url.localeCompare(a.url))
    .map(({ _date, ...item }) => item); // strip internal sort key

  result[locale] = items;
  totalItems += items.length;
}

fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2) + '\n');
console.log(`[video-showcase] generated ${totalItems} item(s) → ${OUTPUT_FILE}`);

