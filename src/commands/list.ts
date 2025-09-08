/**
 * List providers command
 */

import { ConfigManager } from '../core/ConfigManager';
import { Logger } from '../utils/logger';
import chalk from 'chalk';

export async function listProviders(): Promise<void> {
  try {
    const configManager = new ConfigManager();
    await configManager.loadConfig();

    const providers = configManager.getAllProviders();
    
    console.log(chalk.bold('\nAvailable Providers:\n'));
    
    for (const [key, provider] of providers) {
      const apiKeyStatus = provider.apiKey ? chalk.green('[Configured]') : chalk.yellow('[No API Key]');
      console.log(`  ${chalk.cyan(key)}: ${provider.name} ${apiKeyStatus}`);
      
      if (provider.baseUrl) {
        console.log(`    Base URL: ${chalk.gray(provider.baseUrl)}`);
      }
      
      if (provider.defaultModel) {
        console.log(`    Default Model: ${chalk.gray(provider.defaultModel)}`);
      }
      
      if (provider.models && provider.models.length > 0) {
        console.log(`    Models: ${chalk.gray(provider.models.slice(0, 3).join(', '))}${provider.models.length > 3 ? '...' : ''}`);
      }
    }
    
    console.log('\n' + chalk.bold('Shortcuts:'));
    console.log('  q/Q → qwen    z/Z → zhipu    k/K → kimi');
    console.log('  d/D → deepseek    c/C → claude    o/O → openai    g/G → groq');
    console.log('');
  } catch (error) {
    Logger.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}