/**
 * Core type definitions for LLM Switcher
 */

export interface Provider {
  name: string;
  apiKey?: string;
  baseUrl?: string;
  anthropicUrl?: string;
  defaultModel: string;
  fastModel: string;  // Required fast model
  models?: string[];  // Optional, no longer used
}

export interface ProviderConfig {
  key: string;
  name: string;
  baseUrl: string;
  anthropicUrl?: string;
  defaultModel: string;
  fastModel: string;
  apiUrls: string[];
  apiUrlLabels?: string[];  // Labels for multiple URLs, e.g., ['China', 'International']
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
  qwen?: string;
}

// Provider key constants - single source of truth for provider identifiers
export const PROVIDER_KEYS = {
  DEEPSEEK: 'deepseek',
  ALIBABACLOUD_INT: 'alibabacloud-int',
  ALIBABACLOUD: 'alibabacloud',
  ZHIPU: 'zhipu',
  KIMI: 'kimi'
} as const;

// Type for provider keys
export type ProviderKey = typeof PROVIDER_KEYS[keyof typeof PROVIDER_KEYS];

// Provider shortcuts mapping (deprecated - will be removed)
export const PROVIDER_SHORTCUTS: Record<string, string> = {};

// Default provider configurations
export const DEFAULT_PROVIDERS = [
  PROVIDER_KEYS.DEEPSEEK,
  PROVIDER_KEYS.ALIBABACLOUD_INT,
  PROVIDER_KEYS.ALIBABACLOUD,
  PROVIDER_KEYS.ZHIPU,
  PROVIDER_KEYS.KIMI
];

export const CLI_TOOLS = ['qwen'];

// Comprehensive provider configurations - single source of truth
export const PROVIDER_CONFIGS: Record<string, ProviderConfig> = {
  [PROVIDER_KEYS.DEEPSEEK]: {
    key: PROVIDER_KEYS.DEEPSEEK,
    name: 'DeepSeek',
    baseUrl: 'https://api.deepseek.com/v1',
    anthropicUrl: 'https://api.deepseek.com/anthropic',
    defaultModel: 'deepseek-chat',
    fastModel: 'deepseek-chat',
    apiUrls: ['https://platform.deepseek.com/']
  },
  [PROVIDER_KEYS.ALIBABACLOUD_INT]: {
    key: PROVIDER_KEYS.ALIBABACLOUD_INT,
    name: 'AlibabaCloud-Int',
    baseUrl: 'https://dashscope-intl.aliyuncs.com/compatible-mode/v1',
    anthropicUrl: 'https://dashscope-intl.aliyuncs.com/api/v2/apps/claude-code-proxy',
    defaultModel: 'qwen3-coder-plus',
    fastModel: 'qwen3-coder-flash',
    apiUrls: ['https://modelstudio.console.alibabacloud.com/']
  },
  [PROVIDER_KEYS.ALIBABACLOUD]: {
    key: PROVIDER_KEYS.ALIBABACLOUD,
    name: 'AlibabaCloud',
    baseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    anthropicUrl: 'https://dashscope.aliyuncs.com/api/v2/apps/claude-code-proxy',
    defaultModel: 'qwen3-coder-plus',
    fastModel: 'qwen3-coder-flash',
    apiUrls: ['https://bailian.console.aliyun.com/']
  },
  [PROVIDER_KEYS.ZHIPU]: {
    key: PROVIDER_KEYS.ZHIPU,
    name: 'Zhipu GLM',
    baseUrl: 'https://open.bigmodel.cn/api/paas/v4',
    anthropicUrl: 'https://open.bigmodel.cn/api/anthropic',
    defaultModel: 'glm-4.5',
    fastModel: 'glm-4.5-air',
    apiUrls: ['https://bigmodel.cn/', 'https://z.ai/model-api'],
    apiUrlLabels: ['China', 'International']
  },
  [PROVIDER_KEYS.KIMI]: {
    key: PROVIDER_KEYS.KIMI,
    name: 'Kimi (Moonshot AI)',
    baseUrl: 'https://api.moonshot.cn/v1',
    anthropicUrl: 'https://api.moonshot.ai/anthropic',
    defaultModel: 'K2-Instruct-0905',
    fastModel: 'K2-Instruct-0905',
    apiUrls: ['https://platform.moonshot.ai/']
  }
};

// For backward compatibility, export API URLs separately
export const PROVIDER_API_URLS: Record<string, string[]> = Object.fromEntries(
  Object.entries(PROVIDER_CONFIGS).map(([key, config]) => [key, config.apiUrls])
);

export type ShellType = 'bash' | 'zsh' | 'fish' | 'unknown';