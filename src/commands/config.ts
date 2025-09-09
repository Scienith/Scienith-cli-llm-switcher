/**
 * Configure provider settings
 */

import { ConfigManager } from '../core/ConfigManager';
import { Logger } from '../utils/logger';
import { prompt } from '../utils/prompt';
import { CONFIGURABLE_PROVIDERS } from '../core/types';
import chalk from 'chalk';

async function interactiveConfig(configManager: ConfigManager): Promise<void> {
  console.log(chalk.bold('LLM Switch Configuration Wizard'));
  console.log('===============================\n');
  
  const providers = configManager.getAllProviders();
  // Filter to only show configurable providers
  const providerList = Array.from(providers.entries())
    .filter(([key]) => CONFIGURABLE_PROVIDERS.includes(key as any));
  
  while (true) {
    console.log(chalk.bold('Select LLM Provider to Configure:'));
    console.log('----------------------------------');
    
    // Show quit option first
    console.log(`   ${chalk.gray('Q.')} Quit`);
    console.log('   ' + chalk.gray('─'.repeat(30)));
    
    // Show provider list
    providerList.forEach(([key, provider], index) => {
      const status = provider.apiKey 
        ? chalk.green('✓ Configured') 
        : chalk.red('✗ Not configured');
      console.log(`   ${index + 1}. ${provider.name.padEnd(30)} [${status}]`);
    });
    
    console.log('');
    
    const choice = await prompt(`Select provider (1-${providerList.length}) or Q to quit: `);
    
    if (choice.toLowerCase() === 'q' || !choice.trim()) {
      console.log('\nExiting configuration.');
      break;
    }
    
    const choiceNum = parseInt(choice);
    
    if (isNaN(choiceNum) || choiceNum < 1 || choiceNum > providerList.length) {
      console.log(chalk.red('Invalid selection. Please try again.\n'));
      continue;
    }
    
    const [providerKey, provider] = providerList[choiceNum - 1];
    console.log(`\n${chalk.bold(`Provide API Key`)}\n`);
    
    // Configure the selected provider
    await configureProviderInteractive(configManager, providerKey, provider);
    console.log('');
  }
}

async function configureProviderInteractive(configManager: ConfigManager, providerKey: string, provider: any): Promise<void> {
  // Prompt for API key with asterisk masking
  const apiKey = await prompt('Enter API Key: ', 'asterisk');

  if (apiKey.trim()) {
    provider.apiKey = apiKey.trim();
    // Save configuration
    await configManager.saveProvider(providerKey, provider);
    Logger.success(`Configuration saved for ${provider.name}`);
  } else {
    console.log(chalk.yellow('No API Key provided, configuration not saved.'));
  }
}


export async function configureProvider(providerName?: string): Promise<void> {
  try {
    const configManager = new ConfigManager();
    await configManager.loadConfig();
    
    // If no provider specified, show interactive menu
    if (!providerName) {
      await interactiveConfig(configManager);
      return;
    }

    if (!configManager.hasProvider(providerName)) {
      Logger.error(`Unknown provider '${providerName}'`);
      process.exit(1);
    }

    // Check if provider is configurable
    if (!CONFIGURABLE_PROVIDERS.includes(providerName as any)) {
      Logger.error(`Provider '${providerName}' is not available for configuration`);
      Logger.info(`Available providers: ${CONFIGURABLE_PROVIDERS.join(', ')}`);
      process.exit(1);
    }

    const provider = configManager.getProvider(providerName);
    if (!provider) {
      Logger.error(`Provider '${providerName}' not found`);
      process.exit(1);
    }

    console.log(chalk.bold(`\nProvide API Key\n`));

    // Prompt for API key with masked input
    const apiKey = await prompt('Enter API Key: ', true);

    if (apiKey.trim()) {
      provider.apiKey = apiKey.trim();
      // Save configuration
      await configManager.saveProvider(providerName, provider);
      Logger.success(`Configuration saved for ${provider.name}`);
    } else {
      console.log(chalk.yellow('No API Key provided, configuration not saved.'));
    }

  } catch (error) {
    Logger.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}