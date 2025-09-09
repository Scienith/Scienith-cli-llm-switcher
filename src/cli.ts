#!/usr/bin/env node

/**
 * Main CLI entry point
 */

import { program } from 'commander';
import { showStatus } from './commands/status';
import { configureProvider } from './commands/config';
import { runCLI } from './commands/run';
import { Logger } from './utils/logger';
import { getFullVersion } from './utils/version';

// Version
program
  .version(getFullVersion())
  .description('Manage LLM providers and run CLI tools');

// Status command
program
  .command('status')
  .description('Show current provider status')
  .action(async () => {
    await showStatus();
  });

// Config command
program
  .command('config [provider]')
  .description('Configure a provider (interactive mode if no provider specified)')
  .action(async (provider) => {
    await configureProvider(provider);
  });

// Run command
program
  .command('run <tool>')
  .description('Run a CLI tool with current provider')
  .allowUnknownOption()
  .action(async (tool) => {
    // Get remaining arguments after 'run <tool>'
    const toolIndex = process.argv.indexOf(tool);
    const args = process.argv.slice(toolIndex + 1);
    await runCLI(tool, args);
  });

// Parse arguments
program.parse(process.argv);

// Show help if no command provided
if (process.argv.length < 3) {
  program.help();
}