#!/usr/bin/env node
/**
 * optimize-images.mjs
 *
 * Compresses oversized images in content/asset/image/ in-place.
 * Only writes the result if it's actually smaller than the original.
 *
 * Strategy:
 *   - JPEG/WEBP photos: resize to max 1800px wide at quality 82, keep if smaller
 *   - PNG files: resize to max 1600px wide, keep if smaller
 *
 * Usage:
 *   node site/scripts/optimize-images.mjs           # dry-run (prints plan)
 *   node site/scripts/optimize-images.mjs --apply   # actually convert
 *
 * Requires: cwebp and convert (ImageMagick) in PATH.
 */

import { readdir, stat, rename, unlink } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const exec = promisify(execFile);
const __dirname = dirname(fileURLToPath(import.meta.url));
const IMAGE_DIR = join(__dirname, '../../content/asset/image');

// Files over these sizes are candidates
const PHOTO_MAX_BYTES = 500_000;   // 500 KB
const PNG_MAX_BYTES   = 300_000;   // 300 KB

// Resize + quality targets
const PHOTO_MAX_WIDTH = 1800;
const WEBP_QUALITY    = 82;
const JPEG_QUALITY    = 82;
const PNG_MAX_WIDTH   = 1600;

const APPLY = process.argv.includes('--apply');

// Returns tmp path on success, null if output is not smaller
async function tryResizeJpeg(src, quality, maxWidth) {
  const tmp = src + '.tmp.jpg';
  await exec('convert', [src, '-resize', `${maxWidth}x>`, '-quality', String(quality),
    '-sampling-factor', '4:2:0', '-strip', tmp]);
  const { size: before } = await stat(src);
  const { size: after } = await stat(tmp);
  if (after >= before) { await unlink(tmp); return null; }
  return { tmp, before, after };
}

async function tryResizeWebp(src, quality, maxWidth) {
  const tmp = src + '.tmp.webp';
  await exec('cwebp', ['-q', String(quality), '-resize', String(maxWidth), '0', src, '-o', tmp]);
  const { size: before } = await stat(src);
  const { size: after } = await stat(tmp);
  if (after >= before) { await unlink(tmp); return null; }
  return { tmp, before, after };
}

async function tryResizePng(src, maxWidth) {
  const tmp = src + '.tmp.png';
  await exec('convert', [src, '-resize', `${maxWidth}x>`, '-strip', tmp]);
  const { size: before } = await stat(src);
  const { size: after } = await stat(tmp);
  if (after >= before) { await unlink(tmp); return null; }
  return { tmp, before, after };
}

async function main() {
  const files = (await readdir(IMAGE_DIR)).sort();
  const tasks = [];

  for (const file of files) {
    const ext = extname(file).toLowerCase();
    if (!['.jpg', '.jpeg', '.webp', '.png'].includes(ext)) continue;
    const path = join(IMAGE_DIR, file);
    const { size } = await stat(path);

    if ((ext === '.jpg' || ext === '.jpeg') && size > PHOTO_MAX_BYTES) {
      tasks.push({ file, size, action: 'jpeg', path });
    } else if (ext === '.webp' && size > PHOTO_MAX_BYTES) {
      tasks.push({ file, size, action: 'webp', path });
    } else if (ext === '.png' && size > PNG_MAX_BYTES) {
      tasks.push({ file, size, action: 'png', path });
    }
  }

  if (tasks.length === 0) {
    console.log('All images are within size targets.');
    return;
  }

  console.log(`\n${APPLY ? 'Optimizing' : 'DRY RUN —'} ${tasks.length} candidate(s):\n`);
  for (const t of tasks) {
    console.log(`  [${t.action}] ${t.file} (${(t.size/1024).toFixed(0)} KB)`);
  }

  if (!APPLY) {
    console.log('\nRe-run with --apply to compress these files (only saves if result is smaller).');
    return;
  }

  console.log('');
  let savedTotal = 0;
  let skipped = 0;
  for (const t of tasks) {
    try {
      let result = null;
      if (t.action === 'jpeg') {
        result = await tryResizeJpeg(t.path, JPEG_QUALITY, PHOTO_MAX_WIDTH);
      } else if (t.action === 'webp') {
        result = await tryResizeWebp(t.path, WEBP_QUALITY, PHOTO_MAX_WIDTH);
      } else if (t.action === 'png') {
        result = await tryResizePng(t.path, PNG_MAX_WIDTH);
      }
      if (result) {
        await unlink(t.path);
        await rename(result.tmp, t.path);
        savedTotal += result.before - result.after;
        console.log(`  ✓ ${t.file}: ${(result.before/1024).toFixed(0)} KB → ${(result.after/1024).toFixed(0)} KB  (-${((1 - result.after/result.before)*100).toFixed(0)}%)`);
      } else {
        skipped++;
        console.log(`  – ${t.file}: already optimal, skipped`);
      }
    } catch (e) {
      console.error(`  ✗ ${t.file}: ${e.message}`);
    }
  }
  console.log(`\nSaved: ${(savedTotal / 1024 / 1024).toFixed(1)} MB across ${tasks.length - skipped} file(s). ${skipped} already optimal.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
