/**
 * Run CLI tools (e.g., qwen) with current provider or selected provider
 */

import { spawn } from 'child_process';
import { ConfigManager } from '../core/ConfigManager';
import { ProviderManager } from '../core/ProviderManager';
import { Logger } from '../utils/logger';
import { prompt } from '../utils/prompt';
import chalk from 'chalk';

export async function runCLI(cliTool: string, args: string[] = []): Promise<void> {
  try {
    const configManager = new ConfigManager();
    const providerManager = new ProviderManager(configManager);

    // Load config
    await configManager.loadConfig();

    // Get all providers with configured API keys
    const allProviders = configManager.getAllProviders();
    const configuredProviders = Array.from(allProviders.entries())
      .filter(([_, provider]) => provider.apiKey)
      .map(([key, provider]) => ({ key, name: provider.name }));

    if (configuredProviders.length === 0) {
      Logger.error('No providers have API keys configured');
      Logger.error('Run \'lms config\' to set up providers first');
      process.exit(1);
    }

    // Get current provider
    let selectedProvider = configManager.getCurrentProvider();
    
    // Show provider selection menu
    console.log(chalk.bold(`\nSelect provider for ${cliTool}:\n`));
    
    configuredProviders.forEach((provider, index) => {
      const isCurrent = provider.key === selectedProvider;
      const marker = isCurrent ? chalk.green(' ← current') : '';
      console.log(`  ${chalk.cyan(`${index + 1}.`)} ${provider.name}${marker}`);
    });
    
    console.log('');
    const defaultChoice = selectedProvider 
      ? configuredProviders.findIndex(p => p.key === selectedProvider) + 1
      : 1;
    
    const choice = await prompt(`Select provider (1-${configuredProviders.length}) [${defaultChoice}]: `);
    
    // Use default if empty input
    const selectedIndex = choice.trim() === '' 
      ? defaultChoice - 1 
      : parseInt(choice) - 1;
    
    if (isNaN(selectedIndex) || selectedIndex < 0 || selectedIndex >= configuredProviders.length) {
      Logger.error('Invalid selection');
      process.exit(1);
    }
    
    selectedProvider = configuredProviders[selectedIndex].key;
    
    // Save the selected provider as current
    await configManager.setCurrentProvider(selectedProvider);
    
    Logger.info(`Using ${configuredProviders[selectedIndex].name} for ${cliTool}...`);
    
    const provider = configManager.getProvider(selectedProvider);
    if (!provider) {
      Logger.error(`Provider '${selectedProvider}' not found`);
      process.exit(1);
    }

    // Get environment variables for the provider
    const envVars = await providerManager.switchProvider(selectedProvider);
    
    // Set up environment for the CLI tool
    const env = { ...process.env };
    
    // Apply environment variables
    Object.assign(env, envVars.set);
    envVars.unset.forEach(key => delete env[key]);

    // Check if the CLI tool exists
    const { execSync } = require('child_process');
    try {
      execSync(`which ${cliTool}`, { stdio: 'ignore' });
      
      Logger.info(`Launching ${cliTool}...`);

      // Launch the CLI tool with inherited stdio
      const child = spawn(cliTool, args, {
        stdio: 'inherit',
        env
      });

      child.on('error', (error) => {
        Logger.error(`Failed to launch ${cliTool}: ${error.message}`);
        process.exit(1);
      });

      child.on('exit', (code) => {
        process.exit(code || 0);
      });
    } catch {
      // CLI tool doesn't exist, just set environment and exit
      Logger.info(`${cliTool} command not found. Environment variables have been set for ${currentProvider}.`);
      Logger.success(`You can now use ${cliTool} if it's installed.`);
    }

  } catch (error) {
    Logger.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}