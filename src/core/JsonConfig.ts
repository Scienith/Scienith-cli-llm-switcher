/**
 * JSON configuration manager for LLM Switcher
 */

import * as fs from 'fs';
import * as path from 'path';

export interface JsonProvider {
  name: string;
  apiKey?: string;
  baseUrl?: string;
  anthropicUrl?: string;
  defaultModel?: string;
  models?: string[];
}

export interface JsonConfigData {
  providers: Record<string, JsonProvider>;
  currentProvider?: string;
  lastProviders?: {
    claude?: string;
    qwen?: string;
  };
}

export class JsonConfig {
  /**
   * Read and parse JSON file
   */
  static async fromFile(filePath: string): Promise<JsonConfigData> {
    try {
      // Check if file exists first
      if (!fs.existsSync(filePath)) {
        throw new Error(`Configuration file not found: ${filePath}`);
      }
      
      const content = await fs.promises.readFile(filePath, 'utf-8');
      return JSON.parse(content) as JsonConfigData;
    } catch (error) {
      if (error instanceof Error && error.message.startsWith('Configuration file not found')) {
        throw error;
      }
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        throw new Error(`Configuration file not found: ${filePath}`);
      }
      if (error instanceof SyntaxError) {
        throw new Error(`Invalid JSON in configuration file: ${error.message}`);
      }
      throw new Error(`Failed to read JSON file: ${error}`);
    }
  }

  /**
   * Write data to JSON file
   */
  static async toFile(filePath: string, data: JsonConfigData): Promise<void> {
    try {
      const content = JSON.stringify(data, null, 2);
      const dir = path.dirname(filePath);
      
      // Ensure directory exists
      await fs.promises.mkdir(dir, { recursive: true });
      
      // Write file
      await fs.promises.writeFile(filePath, content, 'utf-8');
    } catch (error) {
      throw new Error(`Failed to write JSON file: ${error}`);
    }
  }

  /**
   * Check if JSON file exists
   */
  static async exists(filePath: string): Promise<boolean> {
    try {
      await fs.promises.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Copy JSON file
   */
  static async copy(source: string, destination: string): Promise<void> {
    try {
      const data = await this.fromFile(source);
      await this.toFile(destination, data);
    } catch (error) {
      throw new Error(`Failed to copy JSON file: ${error}`);
    }
  }

  /**
   * Migrate from INI to JSON format
   */
  static migrateFromIni(iniData: any): JsonConfigData {
    const jsonConfig: JsonConfigData = {
      providers: {},
      lastProviders: {}
    };
    
    // Process each provider
    for (const [key, value] of Object.entries(iniData)) {
      // Skip .models sections
      if (key.endsWith('.models')) {
        continue;
      }
      
      // Skip non-object entries
      if (!value || typeof value !== 'object') {
        continue;
      }
      
      const providerData = value as any;
      
      // Convert provider data
      const provider: JsonProvider = {
        name: providerData.name || key
      };
      
      // Add optional fields only if they have values
      if (providerData.api_key) provider.apiKey = providerData.api_key;
      if (providerData.base_url) provider.baseUrl = providerData.base_url;
      if (providerData.anthropic_url && providerData.anthropic_url !== 'undefined') {
        provider.anthropicUrl = providerData.anthropic_url;
      }
      if (providerData.default_model) provider.defaultModel = providerData.default_model;
      
      // Parse models
      if (providerData.models && typeof providerData.models === 'string') {
        const models = providerData.models.split(',').map((m: string) => m.trim()).filter((m: string) => m);
        if (models.length > 0) provider.models = models;
      } else if (iniData[`${key}.models`] && typeof iniData[`${key}.models`] === 'object') {
        const models = Object.keys(iniData[`${key}.models`]);
        if (models.length > 0) provider.models = models;
      }
      
      jsonConfig.providers[key] = provider;
    }
    
    return jsonConfig;
  }
}