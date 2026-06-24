import { promises as fs } from 'node:fs';
import { execFile } from 'node:child_process';
import path from 'node:path';
import process from 'node:process';
import { promisify } from 'node:util';
import sharp from 'sharp';

const DOCS_DIR = path.resolve('docs');
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const VIDEO_EXTENSIONS = new Set(['.mp4']);
const MAX_WIDTH = Number(process.env.MEDIA_MAX_WIDTH ?? 1600);
const MAX_HEIGHT = Number(process.env.MEDIA_MAX_HEIGHT ?? 1600);
const JPEG_QUALITY = Number(process.env.MEDIA_JPEG_QUALITY ?? 78);
const WEBP_QUALITY = Number(process.env.MEDIA_WEBP_QUALITY ?? 78);
const MIN_BYTES_TO_OPTIMIZE = Number(process.env.MEDIA_MIN_BYTES ?? 256 * 1024);
const VIDEO_MAX_WIDTH = Number(process.env.MEDIA_VIDEO_MAX_WIDTH ?? 960);
const VIDEO_CRF = Number(process.env.MEDIA_VIDEO_CRF ?? 30);
const MIN_VIDEO_BYTES_TO_OPTIMIZE = Number(process.env.MEDIA_MIN_VIDEO_BYTES ?? 1024 * 1024);
const MIN_SAVINGS_RATIO = Number(process.env.MEDIA_MIN_SAVINGS_RATIO ?? 0.05);
const execFileAsync = promisify(execFile);

const totals = {
  imagesScanned: 0,
  imagesOptimized: 0,
  imagesSkipped: 0,
  videosScanned: 0,
  videosOptimized: 0,
  videosSkipped: 0,
  savedBytes: 0,
};

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...await walk(fullPath));
    } else if (entry.isFile()) {
      files.push(fullPath);
    }
  }

  return files;
}

async function optimizeImage(filePath) {
  totals.imagesScanned += 1;

  const ext = path.extname(filePath).toLowerCase();
  const before = await fs.stat(filePath);

  if (before.size < MIN_BYTES_TO_OPTIMIZE) {
    totals.imagesSkipped += 1;
    return;
  }

  const tempPath = `${filePath}.optimized`;
  let pipeline = sharp(filePath, { failOn: 'none' })
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
      totals.imagesSkipped += 1;
      return;
    }

    await fs.rename(tempPath, filePath);
    totals.imagesOptimized += 1;
    totals.savedBytes += before.size - after.size;
    console.log(`optimized ${path.relative(process.cwd(), filePath)} (${formatBytes(before.size)} -> ${formatBytes(after.size)})`);
  } catch (error) {
    await fs.rm(tempPath, { force: true });
    console.warn(`skipped ${path.relative(process.cwd(), filePath)}: ${error.message}`);
    totals.imagesSkipped += 1;
  }
}

async function canRunFfmpeg() {
  try {
    await execFileAsync('ffmpeg', ['-version']);
    return true;
  } catch {
    return false;
  }
}

async function optimizeVideo(filePath) {
  totals.videosScanned += 1;

  const before = await fs.stat(filePath);
  if (before.size < MIN_VIDEO_BYTES_TO_OPTIMIZE) {
    totals.videosSkipped += 1;
    return;
  }

  const tempPath = `${filePath}.optimized.mp4`;

  try {
    await execFileAsync('ffmpeg', [
      '-y',
      '-i',
      filePath,
      '-vf',
      `scale='min(${VIDEO_MAX_WIDTH},iw)':-2`,
      '-c:v',
      'libx264',
      '-preset',
      'slow',
      '-crf',
      String(VIDEO_CRF),
      '-c:a',
      'aac',
      '-b:a',
      '96k',
      '-movflags',
      '+faststart',
      tempPath,
    ]);

    const after = await fs.stat(tempPath);
    if (!isWorthReplacing(before.size, after.size)) {
      await fs.unlink(tempPath);
      totals.videosSkipped += 1;
      return;
    }

    await fs.rename(tempPath, filePath);
    totals.videosOptimized += 1;
    totals.savedBytes += before.size - after.size;
    console.log(`optimized ${path.relative(process.cwd(), filePath)} (${formatBytes(before.size)} -> ${formatBytes(after.size)})`);
  } catch (error) {
    await fs.rm(tempPath, { force: true });
    console.warn(`skipped ${path.relative(process.cwd(), filePath)}: ${error.message}`);
    totals.videosSkipped += 1;
  }
}

function formatBytes(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(1)} MiB`;
}

function isWorthReplacing(beforeBytes, afterBytes) {
  return afterBytes < beforeBytes * (1 - MIN_SAVINGS_RATIO);
}

const files = await walk(DOCS_DIR);
const hasFfmpeg = await canRunFfmpeg();

for (const file of files) {
  const ext = path.extname(file).toLowerCase();

  if (IMAGE_EXTENSIONS.has(ext)) {
    await optimizeImage(file);
  } else if (VIDEO_EXTENSIONS.has(ext)) {
    if (hasFfmpeg) {
      await optimizeVideo(file);
    } else {
      totals.videosScanned += 1;
      totals.videosSkipped += 1;
    }
  }
}

console.log([
  `Scanned ${totals.imagesScanned} images and ${totals.videosScanned} videos.`,
  `Optimized ${totals.imagesOptimized} images and ${totals.videosOptimized} videos.`,
  `Skipped ${totals.imagesSkipped} images and ${totals.videosSkipped} videos.`,
  `Saved ${formatBytes(totals.savedBytes)}.`,
].join(' '));
