/**
 * Configuration management for LLM Switcher
 */

import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { JsonConfig, JsonConfigData, JsonProvider } from './JsonConfig';
import { Provider, Config, LastProviderState, PROVIDER_SHORTCUTS, PROVIDER_KEYS } from './types';

export class ConfigManager {
  private configDir: string;
  private configFile: string;
  private templateFile: string;
  private config: Config | null = null;
  private currentProvider: string | null = null;

  constructor(configDir?: string) {
    // Use provided config dir or default locations
    if (configDir) {
      this.configDir = configDir;
    } else if (process.env.CONFIG_DIR) {
      this.configDir = process.env.CONFIG_DIR;
    } else {
      // Use user's home directory for configuration
      const homeDir = os.homedir();
      this.configDir = path.join(homeDir, '.llm-switch');
    }

    // Ensure config directory exists
    if (!fs.existsSync(this.configDir)) {
      fs.mkdirSync(this.configDir, { recursive: true });
    }

    this.configFile = path.join(this.configDir, 'providers.json');
    
    // Template file is still in the project directory
    const projectRoot = path.resolve(__dirname, '..', '..');
    this.templateFile = path.join(projectRoot, 'config', 'providers.json.template');
  }

  /**
   * Load configuration from JSON file
   */
  async loadConfig(): Promise<Config> {
    try {
      // If config file doesn't exist, create from template
      if (!fs.existsSync(this.configFile)) {
        await this.initFromTemplate();
      }
      
      // Debug: log the config file path
      if (process.env.DEBUG) {
        console.error(`[DEBUG] Loading config from: ${this.configFile}`);
        console.error(`[DEBUG] File exists: ${fs.existsSync(this.configFile)}`);
      }
      
      const jsonData = await JsonConfig.fromFile(this.configFile);
      const providers = new Map<string, Provider>();

      // Parse providers from JSON data
      for (const [key, jsonProvider] of Object.entries(jsonData.providers)) {
        // Get default fastModel based on provider
        let defaultFastModel = jsonProvider.defaultModel || '';
        if (key === PROVIDER_KEYS.ZHIPU && jsonProvider.defaultModel === 'glm-4.5') {
          defaultFastModel = 'glm-4.5-air';
        } else if (key === PROVIDER_KEYS.DEEPSEEK) {
          defaultFastModel = 'deepseek-chat';
        } else if (key === PROVIDER_KEYS.ALIBABACLOUD_INT || key === PROVIDER_KEYS.ALIBABACLOUD) {
          defaultFastModel = 'qwen3-coder-flash';
        } else if (key === PROVIDER_KEYS.KIMI) {
          defaultFastModel = 'K2-Instruct-0905';
        }
        
        const provider: Provider = {
          name: jsonProvider.name,
          apiKey: jsonProvider.apiKey,
          baseUrl: jsonProvider.baseUrl,
          anthropicUrl: jsonProvider.anthropicUrl,
          defaultModel: jsonProvider.defaultModel || '',
          fastModel: jsonProvider.fastModel || defaultFastModel
        };
        
        // Only add models if they exist (for backward compatibility)
        if (jsonProvider.models && jsonProvider.models.length > 0) {
          provider.models = jsonProvider.models;
        }

        providers.set(key, provider);
      }

      // Read currentProvider if exists
      if (jsonData.currentProvider) {
        this.currentProvider = jsonData.currentProvider;
      }
      
      // Migrate from old lastProviders format if needed
      if (!this.currentProvider && jsonData.lastProviders) {
        // Use the claude provider as default if it exists
        this.currentProvider = jsonData.lastProviders.claude || null;
      }

      this.config = { providers, currentProvider: this.currentProvider };
      return this.config;
    } catch (error) {
      throw new Error(`Failed to load configuration: ${error}`);
    }
  }

  /**
   * Save configuration to JSON file
   */
  async saveConfig(): Promise<void> {
    if (!this.config) {
      throw new Error('No configuration loaded');
    }

    const jsonData: JsonConfigData = {
      providers: {},
      currentProvider: this.currentProvider
    };

    // Convert providers map to JSON structure
    for (const [key, provider] of this.config.providers) {
      const jsonProvider: JsonProvider = {
        name: provider.name
      };
      
      // Only add optional fields if they have values
      if (provider.apiKey) jsonProvider.apiKey = provider.apiKey;
      if (provider.baseUrl) jsonProvider.baseUrl = provider.baseUrl;
      if (provider.anthropicUrl) jsonProvider.anthropicUrl = provider.anthropicUrl;
      if (provider.defaultModel) jsonProvider.defaultModel = provider.defaultModel;
      if (provider.fastModel) jsonProvider.fastModel = provider.fastModel;
      if (provider.models && provider.models.length > 0) {
        jsonProvider.models = provider.models;
      }
      
      jsonData.providers[key] = jsonProvider;
    }

    await JsonConfig.toFile(this.configFile, jsonData);
  }

  /**
   * Get a specific provider
   */
  getProvider(name: string): Provider | undefined {
    if (!this.config) {
      throw new Error('Configuration not loaded');
    }

    // Check for shortcut
    const actualName = PROVIDER_SHORTCUTS[name] || name;
    return this.config.providers.get(actualName);
  }

  /**
   * Set or update a provider
   */
  setProvider(name: string, provider: Provider): void {
    if (!this.config) {
      throw new Error('Configuration not loaded');
    }

    this.config.providers.set(name, provider);
  }

  /**
   * Save a provider configuration to file
   */
  async saveProvider(name: string, provider: Provider): Promise<void> {
    if (!this.config) {
      throw new Error('Configuration not loaded');
    }

    this.config.providers.set(name, provider);
    await this.saveConfig();
  }

  /**
   * Get all providers
   */
  getAllProviders(): Map<string, Provider> {
    if (!this.config) {
      throw new Error('Configuration not loaded');
    }

    return this.config.providers;
  }

  /**
   * Check if provider exists
   */
  hasProvider(name: string): boolean {
    if (!this.config) {
      throw new Error('Configuration not loaded');
    }

    const actualName = PROVIDER_SHORTCUTS[name] || name;
    return this.config.providers.has(actualName);
  }

  /**
   * Get current provider
   */
  getCurrentProvider(): string | null {
    return this.currentProvider;
  }

  /**
   * Set current provider
   */
  async setCurrentProvider(provider: string): Promise<void> {
    this.currentProvider = provider;
    // Save to JSON file
    await this.saveConfig();
  }

  /**
   * Get last used provider for a CLI tool (deprecated, for backward compatibility)
   */
  async getLastProvider(cliTool: string): Promise<string | null> {
    // Now just returns the current provider
    return this.currentProvider;
  }

  /**
   * Set last used provider for a CLI tool (deprecated, for backward compatibility)
   */
  async setLastProvider(cliTool: string, provider: string): Promise<void> {
    // Now just sets the current provider
    await this.setCurrentProvider(provider);
  }

  /**
   * Initialize configuration from template
   */
  async initFromTemplate(): Promise<void> {
    const templateExists = await JsonConfig.exists(this.templateFile);
    const configExists = await JsonConfig.exists(this.configFile);

    if (!configExists && templateExists) {
      await JsonConfig.copy(this.templateFile, this.configFile);
    } else if (!configExists) {
      throw new Error('No template file found to initialize configuration');
    }
  }

  /**
   * Get config directory path
   */
  getConfigDir(): string {
    return this.configDir;
  }

  /**
   * Get config file path
   */
  getConfigFile(): string {
    return this.configFile;
  }
}