#!/usr/bin/env node

import {promises as fs} from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import sharp from 'sharp';

const DOCS_DIR = path.resolve('docs');
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const MAX_WIDTH = Number(process.env.MEDIA_MAX_WIDTH ?? 1600);
const MAX_HEIGHT = Number(process.env.MEDIA_MAX_HEIGHT ?? 1600);
const JPEG_QUALITY = Number(process.env.MEDIA_JPEG_QUALITY ?? 78);
const WEBP_QUALITY = Number(process.env.MEDIA_WEBP_QUALITY ?? 78);
const MIN_BYTES_TO_OPTIMIZE = Number(process.env.MEDIA_MIN_BYTES ?? 256 * 1024);
const MIN_SAVINGS_RATIO = Number(process.env.MEDIA_MIN_SAVINGS_RATIO ?? 0.05);
const DRY_RUN = process.argv.includes('--dry-run');

const totals = {
  scanned: 0,
  optimized: 0,
  skipped: 0,
  savedBytes: 0,
};

const files = await walk(DOCS_DIR);

for (const file of files) {
  await optimizeImage(file);
}

console.log([
  `Scanned ${totals.scanned} images.`,
  `Optimized ${totals.optimized}.`,
  `Skipped ${totals.skipped}.`,
  `Saved ${formatBytes(totals.savedBytes)}${DRY_RUN ? ' (dry run).' : '.'}`,
].join(' '));

async function walk(directory) {
  const entries = await fs.readdir(directory, {withFileTypes: true});
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...await walk(fullPath));
    } else if (entry.isFile() && IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }

  return files;
}

async function optimizeImage(filePath) {
  totals.scanned += 1;

  const ext = path.extname(filePath).toLowerCase();
  const before = await fs.stat(filePath);

  if (before.size < MIN_BYTES_TO_OPTIMIZE) {
    totals.skipped += 1;
    return;
  }

  const tempPath = `${filePath}.optimized`;
  let pipeline = sharp(filePath, {failOn: 'none'})
    .rotate()
    .resize({
      width: MAX_WIDTH,
      height: MAX_HEIGHT,
      fit: 'inside',
      withoutEnlargement: true,
    });

  if (ext === '.jpg' || ext === '.jpeg') {
    pipeline = pipeline.jpeg({
      quality: JPEG_QUALITY,
      progressive: true,
      mozjpeg: true,
    });
  } else if (ext === '.png') {
    pipeline = pipeline.png({
      compressionLevel: 9,
      effort: 10,
      palette: true,
    });
  } else if (ext === '.webp') {
    pipeline = pipeline.webp({
      quality: WEBP_QUALITY,
      effort: 6,
    });
  }

  try {
    await pipeline.toFile(tempPath);
    const after = await fs.stat(tempPath);

    if (!isWorthReplacing(before.size, after.size)) {
      await fs.unlink(tempPath);
      totals.skipped += 1;
      return;
    }

    totals.optimized += 1;
    totals.savedBytes += before.size - after.size;
    console.log(`${DRY_RUN ? 'would optimize' : 'optimized'} ${path.relative(process.cwd(), filePath)} (${formatBytes(before.size)} -> ${formatBytes(after.size)})`);

    if (DRY_RUN) {
      await fs.unlink(tempPath);
    } else {
      await fs.rename(tempPath, filePath);
    }
  } catch (error) {
    await fs.rm(tempPath, {force: true});
    console.warn(`skipped ${path.relative(process.cwd(), filePath)}: ${error.message}`);
    totals.skipped += 1;
  }
}

function isWorthReplacing(beforeBytes, afterBytes) {
  return afterBytes < beforeBytes * (1 - MIN_SAVINGS_RATIO);
}

function formatBytes(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(1)} MiB`;
}
