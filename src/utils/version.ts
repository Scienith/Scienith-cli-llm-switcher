/**
 * Version utility
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Get version from git tags or package.json
 */
export function getVersion(): string {
  try {
    // Try to get version from git describe
    const gitVersion = execSync('git describe --tags --always 2>/dev/null', {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'ignore']
    }).trim();
    
    if (gitVersion && gitVersion.startsWith('v')) {
      // Remove 'v' prefix for consistency
      return gitVersion.substring(1);
    }
  } catch {
    // Git command failed, fall back to package.json
  }
  
  // Fall back to package.json version
  try {
    const packagePath = path.resolve(__dirname, '../../package.json');
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
    return packageJson.version;
  } catch {
    // If all else fails, return a default version
    return '1.0.0';
  }
}

/**
 * Get full version string with git info
 */
export function getFullVersion(): string {
  const baseVersion = getVersion();
  
  try {
    // Check if there are uncommitted changes
    const status = execSync('git status --porcelain 2>/dev/null', {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'ignore']
    }).trim();
    
    if (status) {
      return `${baseVersion} (modified)`;
    }
    
    // Get commit hash for more detail
    const commitHash = execSync('git rev-parse --short HEAD 2>/dev/null', {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'ignore']
    }).trim();
    
    if (commitHash && !baseVersion.includes(commitHash)) {
      return `${baseVersion} (${commitHash})`;
    }
  } catch {
    // Git commands failed, just return base version
  }
  
  return baseVersion;
}