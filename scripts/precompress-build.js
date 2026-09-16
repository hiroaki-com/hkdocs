// @ts-check
'use strict';

// Pre-generates .br / .gz siblings for the Docusaurus build output.
// http-server does not compress on the fly: its --brotli / --gzip flags only
// serve an already-existing `<file>.br` / `<file>.gz`. Without this step every
// asset is delivered raw (main.js was 680KB over the wire).

// zlib's async API runs on the libuv threadpool, which defaults to 4 threads.
// Must be set before the first threadpool use or it has no effect.
process.env.UV_THREADPOOL_SIZE = String(require('os').cpus().length);

const fs = require('fs');
const os = require('os');
const path = require('path');
const zlib = require('zlib');

const BUILD_DIR = path.join(__dirname, '../build');
const COMPRESSIBLE = new Set(['.html', '.js', '.css', '.svg', '.xml', '.txt']);
// Below this size the transfer saving is smaller than the extra request overhead,
// and the two extra files per asset would bloat the image for nothing.
const MIN_BYTES = 1024;
const CONCURRENCY = os.cpus().length;

/** @param {string} dir @returns {string[]} */
function collect(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return collect(full);
    if (!entry.isFile() || !COMPRESSIBLE.has(path.extname(entry.name))) return [];
    return fs.statSync(full).size >= MIN_BYTES ? [full] : [];
  });
}

/** @param {string} file */
async function compress(file) {
  const raw = fs.readFileSync(file);
  const [br, gz] = await Promise.all([
    new Promise((resolve, reject) => zlib.brotliCompress(raw, {
      params: {
        [zlib.constants.BROTLI_PARAM_QUALITY]: zlib.constants.BROTLI_MAX_QUALITY,
        [zlib.constants.BROTLI_PARAM_SIZE_HINT]: raw.length,
      },
    }, (err, out) => (err ? reject(err) : resolve(out)))),
    new Promise((resolve, reject) => zlib.gzip(raw, {
      level: zlib.constants.Z_BEST_COMPRESSION,
    }, (err, out) => (err ? reject(err) : resolve(out)))),
  ]);
  fs.writeFileSync(`${file}.br`, br);
  fs.writeFileSync(`${file}.gz`, gz);
  return { raw: raw.length, br: br.length };
}

async function main() {
  if (!fs.existsSync(BUILD_DIR)) {
    throw new Error(`build output not found: ${BUILD_DIR} (run \`pnpm build\` first)`);
  }

  // Largest first, so one slow 680KB bundle cannot become the tail of the run.
  const files = collect(BUILD_DIR).sort((a, b) => fs.statSync(b).size - fs.statSync(a).size);
  let raw = 0;
  let br = 0;
  let next = 0;

  await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
    while (next < files.length) {
      const result = await compress(files[next++]);
      raw += result.raw;
      br += result.br;
    }
  }));

  const ratio = raw === 0 ? 0 : Math.round((1 - br / raw) * 100);
  console.log(`precompress: ${files.length} files, ${Math.round(raw / 1024)}KB -> ${Math.round(br / 1024)}KB brotli (-${ratio}%)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
