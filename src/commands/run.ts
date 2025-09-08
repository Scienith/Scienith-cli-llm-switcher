/**
 * Run CLI tools (claude/qwen) with current provider
 */

import { spawn } from 'child_process';
import { ConfigManager } from '../core/ConfigManager';
import { ProviderManager } from '../core/ProviderManager';
import { Logger } from '../utils/logger';

export async function runCLI(cliTool: string, args: string[] = []): Promise<void> {
  try {
    const configManager = new ConfigManager();
    const providerManager = new ProviderManager(configManager);

    // Load config to get current provider
    await configManager.loadConfig();

    // Get current provider
    const currentProvider = configManager.getCurrentProvider();
    
    if (!currentProvider) {
      Logger.error('No provider currently active');
      Logger.error('Run \'llm-switch switch <provider>\' to activate a provider first');
      process.exit(1);
    }

    Logger.info(`Using ${currentProvider} provider for ${cliTool}...`);
    
    const provider = configManager.getProvider(currentProvider);
    if (!provider) {
      Logger.error(`Provider '${currentProvider}' not found`);
      process.exit(1);
    }

    if (!provider.apiKey) {
      Logger.error(`API key not configured for ${currentProvider}`);
      Logger.error(`Run 'llm-switch config ${currentProvider}' to set it up`);
      process.exit(1);
    }

    // Get environment variables for the provider
    const envVars = await providerManager.switchProvider(currentProvider);
    
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