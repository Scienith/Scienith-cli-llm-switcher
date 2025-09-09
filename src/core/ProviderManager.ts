/**
 * Provider management and switching logic
 */

import { ConfigManager } from './ConfigManager';
import { Provider, EnvironmentVariables, PROVIDER_SHORTCUTS } from './types';

export class ProviderManager {
  constructor(private configManager: ConfigManager) {}

  /**
   * Switch to a specific provider
   */
  async switchProvider(providerName: string): Promise<EnvironmentVariables> {
    // Resolve shortcut if applicable
    const actualName = PROVIDER_SHORTCUTS[providerName] || providerName;
    
    // Load configuration
    await this.configManager.loadConfig();
    
    // Get provider
    const provider = this.configManager.getProvider(actualName);
    
    if (!provider) {
      throw new Error(`Unknown provider: ${actualName}`);
    }

    if (!provider.apiKey) {
      throw new Error(`API key not configured for ${actualName}`);
    }

    // Generate environment variables
    return this.generateEnvironmentVariables(actualName, provider);
  }

  /**
   * Generate environment variables for a provider
   */
  private generateEnvironmentVariables(providerName: string, provider: Provider): EnvironmentVariables {
    const envVars: EnvironmentVariables = {
      set: {},
      unset: []
    };

    // All providers use OpenAI-compatible or Anthropic-compatible APIs
    switch (providerName) {
      default:
        // OpenAI-compatible providers
        envVars.set['OPENAI_API_KEY'] = provider.apiKey!;
        
        if (provider.baseUrl) {
          envVars.set['OPENAI_BASE_URL'] = provider.baseUrl;
        }
        
        if (provider.defaultModel) {
          envVars.set['OPENAI_MODEL'] = provider.defaultModel;
        }

        // Set Anthropic variables for Claude Code compatibility
        if (provider.anthropicUrl) {
          envVars.set['ANTHROPIC_BASE_URL'] = provider.anthropicUrl;
          envVars.set['ANTHROPIC_AUTH_TOKEN'] = provider.apiKey!;
          
          if (provider.defaultModel) {
            envVars.set['ANTHROPIC_MODEL'] = provider.defaultModel;
            // Always use fastModel for ANTHROPIC_SMALL_FAST_MODEL
            envVars.set['ANTHROPIC_SMALL_FAST_MODEL'] = provider.fastModel;
          }
        } else {
          envVars.unset = ['ANTHROPIC_MODEL', 'ANTHROPIC_SMALL_FAST_MODEL', 
                          'ANTHROPIC_BASE_URL', 'ANTHROPIC_AUTH_TOKEN'];
        }
        break;
    }

    return envVars;
  }

  /**
   * Validate if a provider exists and is configured
   */
  async validateProvider(providerName: string): Promise<boolean> {
    const actualName = PROVIDER_SHORTCUTS[providerName] || providerName;
    
    await this.configManager.loadConfig();
    const provider = this.configManager.getProvider(actualName);
    
    return !!(provider && provider.apiKey);
  }

  /**
   * Generate export commands for shell evaluation
   */
  generateExportCommands(envVars: EnvironmentVariables): string[] {
    const commands: string[] = [];

    // Add unset commands first
    for (const key of envVars.unset) {
      commands.push(`unset ${key}`);
    }

    // Add export commands
    for (const [key, value] of Object.entries(envVars.set)) {
      commands.push(`export ${key}="${value}"`);
    }

    return commands;
  }

  /**
   * List all available providers
   */
  async listProviders(): Promise<Provider[]> {
    await this.configManager.loadConfig();
    const providersMap = this.configManager.getAllProviders();
    return Array.from(providersMap.values());
  }

  /**
   * Get provider by name
   */
  async getProvider(providerName: string): Promise<Provider | undefined> {
    const actualName = PROVIDER_SHORTCUTS[providerName] || providerName;
    await this.configManager.loadConfig();
    return this.configManager.getProvider(actualName);
  }

  /**
   * Get models for a specific provider
   */
  async getProviderModels(providerName: string): Promise<string[]> {
    const provider = await this.getProvider(providerName);
    
    if (!provider) {
      throw new Error(`Unknown provider: ${providerName}`);
    }

    return provider.models || [];
  }

  /**
   * Update provider configuration
   */
  async updateProvider(providerName: string, updates: Partial<Provider>): Promise<void> {
    await this.configManager.loadConfig();
    
    const provider = this.configManager.getProvider(providerName);
    if (!provider) {
      throw new Error(`Unknown provider: ${providerName}`);
    }

    // Merge updates
    const updatedProvider: Provider = {
      ...provider,
      ...updates
    };

    this.configManager.setProvider(providerName, updatedProvider);
    await this.configManager.saveConfig();
  }

  /**
   * Set API key for a provider
   */
  async setApiKey(providerName: string, apiKey: string): Promise<void> {
    await this.updateProvider(providerName, { apiKey });
  }

  /**
   * Set default model for a provider
   */
  async setDefaultModel(providerName: string, model: string): Promise<void> {
    await this.updateProvider(providerName, { defaultModel: model });
  }
}