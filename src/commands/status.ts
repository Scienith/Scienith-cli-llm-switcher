/**
 * Show current status command
 */

import { ConfigManager } from '../core/ConfigManager';
import { Logger } from '../utils/logger';
import chalk from 'chalk';

export async function showStatus(): Promise<void> {
  try {
    const configManager = new ConfigManager();
    await configManager.loadConfig();

    // Get current provider
    const currentProvider = configManager.getCurrentProvider();
    
    console.log(chalk.bold('\n=== LLM Switch Status ===\n'));
    
    if (currentProvider) {
      const provider = configManager.getProvider(currentProvider);
      if (provider) {
        console.log(`Current Provider: ${chalk.green(provider.name)} (${chalk.cyan(currentProvider)})`);
        if (provider.defaultModel) {
          console.log(`Default Model: ${chalk.yellow(provider.defaultModel)}`);
        }
        console.log(`API Key: ${provider.apiKey ? chalk.green('Configured') : chalk.red('Not configured')}`);
      }
    } else {
      console.log(`Current Provider: ${chalk.gray('None')}`);
    }

    // Show all configured providers
    const providers = configManager.getAllProviders();
    
    console.log('\n' + chalk.bold('Available Providers:'));
    for (const [key, provider] of providers) {
      const status = provider.apiKey ? chalk.green('✓') : chalk.red('✗');
      const active = key === currentProvider ? chalk.yellow(' [active]') : '';
      console.log(`  ${status} ${key}: ${provider.name}${active}`);
    }

    console.log('');
  } catch (error) {
    Logger.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}