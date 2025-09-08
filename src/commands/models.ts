/**
 * List models for a provider
 */

import { ConfigManager } from '../core/ConfigManager';
import { Logger } from '../utils/logger';
import chalk from 'chalk';

export async function listModels(providerName: string): Promise<void> {
  try {
    const configManager = new ConfigManager();
    await configManager.loadConfig();

    if (!configManager.hasProvider(providerName)) {
      Logger.error(`Unknown provider '${providerName}'`);
      process.exit(1);
    }

    const provider = configManager.getProvider(providerName);
    if (!provider) {
      Logger.error(`Provider '${providerName}' not found`);
      process.exit(1);
    }

    console.log(chalk.bold(`\nModels for ${provider.name}:\n`));

    if (!provider.models || provider.models.length === 0) {
      console.log(chalk.gray('  No models configured'));
    } else {
      provider.models.forEach(model => {
        const isDefault = model === provider.defaultModel;
        const marker = isDefault ? chalk.green(' (default)') : '';
        console.log(`  ${chalk.cyan(model)}${marker}`);
      });
    }

    console.log('');
  } catch (error) {
    Logger.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}