/**
 * Core type definitions for LLM Switcher
 */

export interface Provider {
  name: string;
  apiKey?: string;
  baseUrl?: string;
  anthropicUrl?: string;
  defaultModel: string;
  models: string[];
}

export interface Config {
  providers: Map<string, Provider>;
  currentProvider?: string;
}

export interface EnvironmentVariables {
  set: Record<string, string>;
  unset: string[];
}

export interface CLIOptions {
  verbose?: boolean;
  config?: string;
}

export interface LastProviderState {
  claude?: string;
  qwen?: string;
}

// Provider shortcuts mapping
export const PROVIDER_SHORTCUTS: Record<string, string> = {
  'q': 'qwen',
  'Q': 'qwen',
  'z': 'zhipu',
  'Z': 'zhipu',
  'k': 'kimi',
  'K': 'kimi',
  'd': 'deepseek',
  'D': 'deepseek',
  'c': 'claude',
  'C': 'claude',
  'o': 'openai',
  'O': 'openai',
  'g': 'groq',
  'G': 'groq'
};

// Default provider configurations
export const DEFAULT_PROVIDERS = [
  'deepseek',
  'qwen-intl',
  'qwen-cn',
  'zhipu',
  'kimi',
  'claude',
  'openai',
  'groq'
];

export const CLI_TOOLS = ['claude', 'qwen'];

export type ShellType = 'bash' | 'zsh' | 'fish' | 'unknown';