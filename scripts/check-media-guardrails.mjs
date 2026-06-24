#!/usr/bin/env node

import {execFileSync} from 'node:child_process';
import {statSync} from 'node:fs';
import path from 'node:path';

const DEFAULT_BASE = process.env.GITHUB_BASE_REF
  ? `origin/${process.env.GITHUB_BASE_REF}`
  : 'origin/main';
const DEFAULT_HEAD = 'HEAD';
const VIDEO_EXTENSIONS = new Set(['.mp4', '.mov']);
const IMAGE_EXTENSIONS = new Set(['.avif', '.gif', '.jpeg', '.jpg', '.png', '.webp']);
const MAX_IMAGE_BYTES = Number(process.env.MAX_NEW_IMAGE_BYTES ?? 2 * 1024 * 1024);

const args = parseArgs(process.argv.slice(2));
const baseRef = args.base ?? DEFAULT_BASE;
const headRef = args.head ?? DEFAULT_HEAD;
const changedPaths = getAddedCopiedRenamedPaths(baseRef, headRef);
const violations = [];

for (const changedPath of changedPaths) {
  const extension = path.posix.extname(changedPath).toLowerCase();

  if (VIDEO_EXTENSIONS.has(extension)) {
    violations.push({
      path: changedPath,
      message: 'new local video files must be uploaded externally and linked from docs instead',
    });
    continue;
  }

  if (IMAGE_EXTENSIONS.has(extension)) {
    const size = statSync(changedPath).size;

    if (size > MAX_IMAGE_BYTES) {
      violations.push({
        path: changedPath,
        message: `new image is ${formatBytes(size)}; optimize it below ${formatBytes(MAX_IMAGE_BYTES)} before committing`,
      });
    }
  }
}

if (violations.length > 0) {
  console.error('Media guardrail check failed.\n');

  for (const violation of violations) {
    console.error(`- ${violation.path}: ${violation.message}`);
  }

  console.error('\nUse Dropbox or another external store for videos. Run image optimization before committing large images.');
  process.exit(1);
}

console.log(
  changedPaths.length === 0
    ? 'No added, copied, or renamed media paths to check.'
    : `Media guardrail check passed for ${changedPaths.length} added/copied/renamed path(s).`,
);

function parseArgs(argv) {
  const parsed = {};

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === '--base') {
      parsed.base = readValue(argv, index, arg);
      index += 1;
    } else if (arg === '--head') {
      parsed.head = readValue(argv, index, arg);
      index += 1;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return parsed;
}

function readValue(argv, index, name) {
  const value = argv[index + 1];

  if (!value || value.startsWith('--')) {
    throw new Error(`Missing value for ${name}`);
  }

  return value;
}

function getAddedCopiedRenamedPaths(baseRef, headRef) {
  const output = git([
    'diff',
    '--name-status',
    '--diff-filter=ACR',
    '--find-renames',
    `${baseRef}...${headRef}`,
  ]);

  return output
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      const [status, firstPath, secondPath] = line.split('\t');
      return status.startsWith('R') || status.startsWith('C')
        ? secondPath
        : firstPath;
    })
    .filter(Boolean)
    .sort();
}

function git(args) {
  return execFileSync('git', args, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  }).trim();
}

function formatBytes(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(1)} MiB`;
}
