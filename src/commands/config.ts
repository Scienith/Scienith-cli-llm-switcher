/**
 * Configure provider settings
 */

import * as readline from 'readline';
import { ConfigManager } from '../core/ConfigManager';
import { Logger } from '../utils/logger';
import chalk from 'chalk';

async function interactiveConfig(configManager: ConfigManager): Promise<void> {
  console.log(chalk.bold('LLM Switch Configuration Wizard'));
  console.log('===============================\n');
  
  const providers = configManager.getAllProviders();
  const providerList = Array.from(providers.entries());
  
  while (true) {
    console.log(chalk.bold('Available LLM Providers:'));
    console.log('------------------------');
    
    providerList.forEach(([key, provider], index) => {
      const status = provider.apiKey 
        ? chalk.green('✓ Configured') 
        : chalk.red('✗ Not configured');
      console.log(`   ${index + 1}. ${provider.name.padEnd(30)} [${status}]`);
    });
    
    console.log(`   ${providerList.length + 1}. Exit (退出配置)\n`);
    
    const choice = await prompt(`Select a provider to configure (1-${providerList.length + 1}): `);
    const choiceNum = parseInt(choice);
    
    if (choiceNum === providerList.length + 1 || !choice.trim()) {
      console.log('\nConfiguration complete!');
      break;
    }
    
    if (choiceNum < 1 || choiceNum > providerList.length) {
      console.log(chalk.red('Invalid selection. Please try again.\n'));
      continue;
    }
    
    const [providerKey, provider] = providerList[choiceNum - 1];
    console.log(`\n${chalk.bold(`Configuring ${provider.name}`)}\n`);
    
    // Configure the selected provider
    await configureProviderInteractive(configManager, providerKey, provider);
    console.log('');
  }
}

async function configureProviderInteractive(configManager: ConfigManager, providerKey: string, provider: any): Promise<void> {
  // Prompt for API key
  const currentKey = provider.apiKey ? chalk.gray('(configured)') : chalk.yellow('(not set)');
  console.log(`Current API Key: ${currentKey}`);
  const apiKey = await prompt('Enter API Key (or press Enter to keep current): ');

  if (apiKey.trim()) {
    provider.apiKey = apiKey.trim();
  }

  // Show base URL but don't allow modification
  if (provider.baseUrl) {
    console.log(`\nBase URL: ${chalk.gray(provider.baseUrl)}`);
  }

  // Prompt for default model
  if (provider.models && provider.models.length > 0) {
    console.log(`\nAvailable models: ${chalk.cyan(provider.models.join(', '))}`);
    console.log(`Current default: ${chalk.gray(provider.defaultModel || '(not set)')}`);
    const defaultModel = await prompt('Enter default model (or press Enter to keep current): ');
    if (defaultModel.trim()) {
      if (provider.models.includes(defaultModel.trim())) {
        provider.defaultModel = defaultModel.trim();
      } else {
        Logger.warn(`Model '${defaultModel}' not in available models list`);
      }
    }
  }

  // Save configuration
  await configManager.saveProvider(providerKey, provider);
  
  Logger.success(`Configuration saved for ${provider.name}`);
}

function prompt(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
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

    const provider = configManager.getProvider(providerName);
    if (!provider) {
      Logger.error(`Provider '${providerName}' not found`);
      process.exit(1);
    }

    console.log(chalk.bold(`\nConfiguring ${provider.name}\n`));

    // Prompt for API key
    const currentKey = provider.apiKey ? chalk.gray('(configured)') : chalk.yellow('(not set)');
    console.log(`Current API Key: ${currentKey}`);
    const apiKey = await prompt('Enter API Key (or press Enter to keep current): ');

    if (apiKey.trim()) {
      provider.apiKey = apiKey.trim();
    }

    // Show base URL but don't allow modification
    if (provider.baseUrl) {
      console.log(`\nBase URL: ${chalk.gray(provider.baseUrl)}`);
    }

    // Prompt for default model
    if (provider.models && provider.models.length > 0) {
      console.log(`\nAvailable models: ${chalk.cyan(provider.models.join(', '))}`);
      console.log(`Current default: ${chalk.gray(provider.defaultModel || '(not set)')}`);
      const defaultModel = await prompt('Enter default model (or press Enter to keep current): ');
      if (defaultModel.trim()) {
        if (provider.models.includes(defaultModel.trim())) {
          provider.defaultModel = defaultModel.trim();
        } else {
          Logger.warn(`Model '${defaultModel}' not in available models list`);
        }
      }
    }

    // Save configuration
    await configManager.saveProvider(providerName, provider);
    
    Logger.success(`Configuration saved for ${provider.name}`);

  } catch (error) {
    Logger.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}