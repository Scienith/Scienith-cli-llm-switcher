/**
 * Launch CLI tools (claude/qwen) with provider switching
 */

import { spawn } from 'child_process';
import { ConfigManager } from '../core/ConfigManager';
import { ProviderManager } from '../core/ProviderManager';
import { Logger } from '../utils/logger';

export async function launchCLI(cliTool: string, args: string[] = []): Promise<void> {
  try {
    const configManager = new ConfigManager();
    const providerManager = new ProviderManager(configManager);

    // Load config first to get lastProviders
    await configManager.loadConfig();

    // Get last used provider for this CLI tool
    let targetProvider = await configManager.getLastProvider(cliTool);
    
    if (!targetProvider) {
      // Default to the CLI tool name as provider
      targetProvider = cliTool;
    }

    Logger.info(`Switching to ${targetProvider} for ${cliTool}...`);
    
    if (!configManager.hasProvider(targetProvider)) {
      Logger.error(`Unknown provider '${targetProvider}'`);
      process.exit(1);
    }

    const provider = configManager.getProvider(targetProvider);
    if (!provider) {
      Logger.error(`Provider '${targetProvider}' not found`);
      process.exit(1);
    }

    if (!provider.apiKey) {
      Logger.error(`API key not configured for ${targetProvider}`);
      Logger.error(`Run 'llm-switch config ${targetProvider}' to set it up`);
      process.exit(1);
    }

    // Get environment variables
    const envVars = await providerManager.switchProvider(targetProvider);
    
    // Set up environment for the CLI tool
    const env = { ...process.env };
    
    // Apply environment variables
    Object.assign(env, envVars.set);
    envVars.unset.forEach(key => delete env[key]);

    // Save this as the last used provider
    await configManager.setLastProvider(cliTool, targetProvider);

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
      Logger.info(`${cliTool} command not found. Environment variables have been set for ${targetProvider}.`);
      Logger.success(`You can now use ${cliTool} if it's installed.`);
    }

  } catch (error) {
    Logger.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}