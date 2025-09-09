/**
 * Show current status command
 */

import { ConfigManager } from '../core/ConfigManager';
import { PROVIDER_CONFIGS } from '../core/types';
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
      }
    } else {
      console.log(`Current Provider: ${chalk.gray('None')}`);
    }

    // Show all providers in detail
    const providers = configManager.getAllProviders();
    
    console.log('\n' + chalk.bold('Provider Configuration:'));
    console.log('─'.repeat(80));
    
    for (const [key, provider] of providers) {
      const isActive = key === currentProvider;
      const apiConfigured = !!provider.apiKey;
      
      // Get config from PROVIDER_CONFIGS or use provider's own name
      const config = PROVIDER_CONFIGS[key];
      const displayName = config ? config.name : provider.name;
      
      // Provider name line
      console.log('');
      const activeMarker = isActive ? chalk.green(' ✓ [ACTIVE]') : '';
      const apiStatus = apiConfigured ? chalk.green('API: ✅') : chalk.red('API: ❌');
      
      // Calculate padding for right alignment
      const leftContent = displayName + activeMarker;
      const rightContent = apiStatus;
      const padding = 78 - leftContent.replace(/\x1b\[[0-9;]*m/g, '').length - rightContent.replace(/\x1b\[[0-9;]*m/g, '').length;
      
      if (isActive) {
        console.log(chalk.green(displayName) + chalk.green(' ✓ [ACTIVE]') + ' '.repeat(Math.max(1, padding)) + apiStatus);
      } else {
        console.log(displayName + ' '.repeat(Math.max(1, padding)) + apiStatus);
      }
      
      // Provider details
      const labelColor = chalk.gray;
      const urlColor = chalk.cyan;
      
      if (provider.baseUrl) {
        console.log(`  ${labelColor('Base URL:')}    ${urlColor(provider.baseUrl)}`);
      }
      if (provider.anthropicUrl) {
        console.log(`  ${labelColor('Claude URL:')}  ${urlColor(provider.anthropicUrl)}`);
      }
      console.log(`  ${labelColor('Main Model:')}  ${provider.defaultModel}`);
      console.log(`  ${labelColor('Fast Model:')}  ${provider.fastModel}`);
      
      // API registration URLs from PROVIDER_CONFIGS
      if (config && config.apiUrls && config.apiUrls.length > 0) {
        const label = config.apiUrlLabels?.[0] ? ` (${config.apiUrlLabels[0]})` : '';
        console.log(`  ${labelColor('Apply API:')}   ${urlColor(config.apiUrls[0])}${label}`);
        for (let i = 1; i < config.apiUrls.length; i++) {
          const extraLabel = config.apiUrlLabels?.[i] ? ` (${config.apiUrlLabels[i]})` : '';
          console.log(`               ${urlColor(config.apiUrls[i])}${extraLabel}`);
        }
      }
    }

    console.log('\n' + '─'.repeat(80));

    // Show configuration file path
    console.log('\n' + chalk.bold('Configuration:'));
    console.log(`  ${chalk.gray('Config Directory:')} ${chalk.cyan(configManager.getConfigDir())}`);
    console.log(`  ${chalk.gray('Config File:')}      ${chalk.cyan(configManager.getConfigFile())}`);

    console.log('');
  } catch (error) {
    Logger.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

