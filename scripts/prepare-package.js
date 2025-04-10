#!/usr/bin/env node

/**
 * This script prepares the package for publishing to npm.
 * It runs build commands, ensures all necessary files are in place,
 * and validates the package.json configuration.
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Configuration
const DIST_DIR = path.resolve('dist');
const WC_DIR = path.resolve('dist/web-components');
const REQUIRED_FILES = ['README.md', 'LICENSE', 'package.json'];

// Colors for console output
const COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function log(message, color = COLORS.reset) {
  console.log(`${color}${message}${COLORS.reset}`);
}

function success(message) {
  log(`✓ ${message}`, COLORS.green);
}

function warn(message) {
  log(`⚠ ${message}`, COLORS.yellow);
}

function error(message) {
  log(`✖ ${message}`, COLORS.red);
  process.exit(1);
}

function runCommand(command) {
  try {
    log(`Running: ${command}`, COLORS.blue);
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (err) {
    error(`Failed to run command: ${command}`);
    return false;
  }
}

function checkRequiredFiles() {
  log('Checking required files...', COLORS.cyan);
  REQUIRED_FILES.forEach(file => {
    if (!fs.existsSync(file)) {
      error(`Missing required file: ${file}`);
    } else {
      success(`Found ${file}`);
    }
  });
}

function validatePackageJson() {
  log('Validating package.json...', COLORS.cyan);
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
  
  // Check for required fields
  const requiredFields = ['name', 'version', 'main', 'module', 'files', 'license'];
  requiredFields.forEach(field => {
    if (!pkg[field]) {
      error(`package.json is missing required field: ${field}`);
    }
  });
  
  // Check for recommended fields
  const recommendedFields = ['description', 'keywords', 'author', 'repository', 'bugs', 'homepage'];
  recommendedFields.forEach(field => {
    if (!pkg[field]) {
      warn(`package.json is missing recommended field: ${field}`);
    }
  });
  
  // Ensure private is not true
  if (pkg.private === true) {
    error('package.json has "private": true - this package cannot be published to npm');
  }
  
  success('package.json is valid');
}

function copyFilesToDist() {
  log('Copying files to dist directory...', COLORS.cyan);
  
  // Create dist directory if it doesn't exist
  if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR, { recursive: true });
  }
  
  // Copy files to dist
  ['README.md', 'LICENSE'].forEach(file => {
    fs.copyFileSync(file, path.join(DIST_DIR, file));
    success(`Copied ${file} to dist/`);
  });
  
  // Create a package.json for the dist directory
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
  const distPkg = {
    name: pkg.name,
    version: pkg.version,
    description: pkg.description,
    main: pkg.main.replace('dist/', ''),
    module: pkg.module.replace('dist/', ''),
    types: pkg.types.replace('dist/', ''),
    keywords: pkg.keywords,
    author: pkg.author,
    license: pkg.license,
    repository: pkg.repository,
    bugs: pkg.bugs,
    homepage: pkg.homepage,
    dependencies: pkg.dependencies,
    peerDependencies: pkg.peerDependencies
  };
  
  fs.writeFileSync(
    path.join(DIST_DIR, 'package.json'),
    JSON.stringify(distPkg, null, 2)
  );
  success('Created package.json in dist/');
}

// Main execution
function main() {
  log('Preparing package for publishing...', COLORS.magenta);
  
  checkRequiredFiles();
  validatePackageJson();
  
  // Clean previous builds
  runCommand('npm run clean');
  
  // Build the package
  runCommand('npm run build:lib');
  
  // Copy files to dist
  copyFilesToDist();
  
  log('\nPackage is ready for publishing! 📦', COLORS.magenta);
  log('Run the following command to publish:', COLORS.blue);
  log('  npm publish dist', COLORS.cyan);
}

main(); 