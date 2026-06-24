#!/usr/bin/env node

import {execFileSync} from 'node:child_process';
import path from 'node:path';

const DOCS_ROOT = 'docs';
const DEFAULT_BASE = process.env.GITHUB_BASE_REF
  ? `origin/${process.env.GITHUB_BASE_REF}`
  : 'origin/main';
const DEFAULT_HEAD = 'HEAD';
const KEBAB_CASE_SEGMENT = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const UUID_SEGMENT =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const RESERVED_DOC_FILENAMES = new Set(['_category_.json']);

const args = parseArgs(process.argv.slice(2));
const baseRef = args.base ?? DEFAULT_BASE;
const headRef = args.head ?? DEFAULT_HEAD;

const changedPaths = getChangedDocsPaths(baseRef, headRef);
const violations = [];

for (const changedPath of changedPaths) {
  checkFileName(changedPath, violations);
  checkNewDirectories(changedPath, baseRef, violations);
}

if (violations.length > 0) {
  console.error('Naming convention check failed.\n');
  console.error(
    'New docs paths must use lowercase kebab-case names and avoid spaces, parentheses, trailing whitespace, and UUID-only folders.\n',
  );

  for (const violation of violations) {
    console.error(`- ${violation.path}: ${violation.message}`);
  }

  console.error(
    '\nSee docs/maintainers/repository-organization.md for repository naming rules.',
  );
  process.exit(1);
}

console.log(
  changedPaths.length === 0
    ? 'No added, copied, or renamed docs paths to check.'
    : `Naming convention check passed for ${changedPaths.length} docs path(s).`,
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

function getChangedDocsPaths(baseRef, headRef) {
  const output = git([
    'diff',
    '--name-status',
    '--diff-filter=ACR',
    '--find-renames',
    `${baseRef}...${headRef}`,
    '--',
    DOCS_ROOT,
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

function checkFileName(filePath, violations) {
  const filename = path.posix.basename(filePath);

  if (RESERVED_DOC_FILENAMES.has(filename)) {
    return;
  }

  const parsedPath = path.posix.parse(filename);
  const basename = parsedPath.name;
  const extension = parsedPath.ext;

  if (!extension) {
    violations.push({
      path: filePath,
      message: 'file names in docs must include a lowercase extension',
    });
    return;
  }

  if (extension !== extension.toLowerCase()) {
    violations.push({
      path: filePath,
      message: `extension "${extension}" must be lowercase`,
    });
  }

  checkSegment(filePath, basename, 'file name', violations);
}

function checkNewDirectories(filePath, baseRef, violations) {
  const directory = path.posix.dirname(filePath);

  if (directory === '.' || directory === DOCS_ROOT) {
    return;
  }

  const segments = directory.split('/');
  let currentPath = '';

  for (const segment of segments) {
    currentPath = currentPath ? `${currentPath}/${segment}` : segment;

    if (currentPath === DOCS_ROOT || pathExistsAtRef(baseRef, currentPath)) {
      continue;
    }

    checkSegment(currentPath, segment, 'folder name', violations);

    if (UUID_SEGMENT.test(segment)) {
      violations.push({
        path: currentPath,
        message: 'folder name must not be a UUID-only value',
      });
    }
  }
}

function checkSegment(displayPath, segment, label, violations) {
  if (segment.trim() !== segment) {
    violations.push({
      path: displayPath,
      message: `${label} must not contain leading or trailing whitespace`,
    });
  }

  if (/\s/.test(segment)) {
    violations.push({
      path: displayPath,
      message: `${label} must not contain spaces or other whitespace`,
    });
  }

  if (/[()]/.test(segment)) {
    violations.push({
      path: displayPath,
      message: `${label} must not contain parentheses`,
    });
  }

  if (!KEBAB_CASE_SEGMENT.test(segment)) {
    violations.push({
      path: displayPath,
      message: `${label} must be lowercase kebab-case`,
    });
  }
}

function pathExistsAtRef(ref, filePath) {
  try {
    git(['cat-file', '-e', `${ref}:${filePath}`], {stdio: 'ignore'});
    return true;
  } catch {
    return false;
  }
}

function git(args, options = {}) {
  const output = execFileSync('git', args, {
    encoding: 'utf8',
    stdio: options.stdio ?? ['ignore', 'pipe', 'pipe'],
  });

  return typeof output === 'string' ? output.trim() : '';
}
