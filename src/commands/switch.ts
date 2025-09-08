/**
 * Switch provider command
 */

import { ConfigManager } from '../core/ConfigManager';
import { ProviderManager } from '../core/ProviderManager';
import { Logger } from '../utils/logger';

export async function switchProvider(providerName: string): Promise<void> {
  try {
    const configManager = new ConfigManager();
    const providerManager = new ProviderManager(configManager);

    // Validate and switch provider
    const envVars = await providerManager.switchProvider(providerName);
    
    // Generate export commands for shell evaluation
    const commands = providerManager.generateExportCommands(envVars);
    
    // Output commands for shell to eval
    commands.forEach(cmd => Logger.shellOutput(cmd));
    
    // Get provider info for comment
    const provider = await providerManager.getProvider(providerName);
    if (provider) {
      Logger.shellComment(`LLM Switch: Activated ${provider.name} (${providerName})`);
      if (provider.defaultModel) {
        Logger.shellComment(`Model: ${provider.defaultModel}`);
      }
    }

    // Save as current provider
    await configManager.setCurrentProvider(providerName);

  } catch (error) {
    Logger.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}