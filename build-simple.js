#!/usr/bin/env node

/**
 * Simple build script that transpiles TypeScript files without bundling
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Transpiling TypeScript files...');

// Use npx to run tsc-compatible transpilation with esbuild
try {
  // Build all TypeScript files to JavaScript
  execSync('npx esbuild src/**/*.ts src/*.ts --outdir=dist --platform=node --target=node14 --format=cjs', {
    stdio: 'inherit',
    cwd: __dirname
  });
  
  // Make cli.js executable
  const cliFile = path.join(__dirname, 'dist/cli.js');
  if (fs.existsSync(cliFile)) {
    // Add shebang to cli.js
    const content = fs.readFileSync(cliFile, 'utf-8');
    if (!content.startsWith('#!/usr/bin/env node')) {
      fs.writeFileSync(cliFile, '#!/usr/bin/env node\n' + content);
    }
    fs.chmodSync(cliFile, '755');
  }
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}