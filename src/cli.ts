#!/usr/bin/env node

/**
 * Main CLI entry point
 */

import { program } from 'commander';
import { switchProvider } from './commands/switch';
import { listProviders } from './commands/list';
import { showStatus } from './commands/status';
import { listModels } from './commands/models';
import { configureProvider } from './commands/config';
import { launchCLI } from './commands/launch';
import { runCLI } from './commands/run';
import { Logger } from './utils/logger';
import * as packageJson from '../package.json';

// Version
program
  .version(packageJson.version)
  .description('Manage and switch between LLM providers');

// Switch provider command
program
  .command('switch <provider>')
  .alias('s')
  .description('Switch to a provider')
  .action(async (provider) => {
    await switchProvider(provider);
  });

// List providers command
program
  .command('list')
  .alias('ls')
  .description('List all available providers')
  .action(async () => {
    await listProviders();
  });

// Status command
program
  .command('status')
  .description('Show current provider status')
  .action(async () => {
    await showStatus();
  });

// Models command
program
  .command('models <provider>')
  .description('List models for a provider')
  .action(async (provider) => {
    await listModels(provider);
  });

// Config command
program
  .command('config [provider]')
  .description('Configure a provider (interactive mode if no provider specified)')
  .action(async (provider) => {
    await configureProvider(provider);
  });

// Run command (new primary way to launch CLI tools)
program
  .command('run <tool>')
  .description('Run a CLI tool (claude/qwen) with current provider')
  .allowUnknownOption()
  .action(async (tool) => {
    // Get remaining arguments after 'run <tool>'
    const toolIndex = process.argv.indexOf(tool);
    const args = process.argv.slice(toolIndex + 1);
    await runCLI(tool, args);
  });

// Claude command (backward compatibility - redirects to run)
program
  .command('claude')
  .description('Launch claude CLI with current provider (alias for "run claude")')
  .allowUnknownOption()
  .action(async () => {
    // Get remaining arguments after 'claude'
    const args = process.argv.slice(process.argv.indexOf('claude') + 1);
    await runCLI('claude', args);
  });

// Qwen command (backward compatibility - redirects to run)
program
  .command('qwen')
  .description('Launch qwen CLI with current provider (alias for "run qwen")')
  .allowUnknownOption()
  .action(async () => {
    // Get remaining arguments after 'qwen'
    const args = process.argv.slice(process.argv.indexOf('qwen') + 1);
    await runCLI('qwen', args);
  });

// Handle shortcuts
const shortcuts: Record<string, string> = {
  'q': 'qwen',
  'Q': 'qwen',
  'z': 'zhipu',
  'Z': 'zhipu',
  'k': 'kimi',
  'K': 'kimi',
  'd': 'deepseek',
  'D': 'deepseek',
  'c': 'claude',
  'C': 'claude',
  'o': 'openai',
  'O': 'openai',
  'g': 'groq',
  'G': 'groq'
};

// Check if first argument is a shortcut
const firstArg = process.argv[2];
if (firstArg && shortcuts[firstArg]) {
  // Replace shortcut with full provider name
  process.argv[2] = shortcuts[firstArg];
  // If it's a switch command (no subcommand), insert 'switch'
  if (!['switch', 's', 'list', 'ls', 'status', 'models', 'config', 'run', 'claude', 'qwen'].includes(process.argv[3])) {
    process.argv.splice(2, 0, 'switch');
  }
}

// Parse arguments
program.parse(process.argv);

// Show help if no command provided
if (process.argv.length < 3) {
  program.help();
}