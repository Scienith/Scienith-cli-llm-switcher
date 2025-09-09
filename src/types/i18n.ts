/**
 * TypeScript type definitions for i18n data structure
 */

export interface I18nHome {
  description: string;
  subtitle: string;
  
  // Prerequisites section
  prerequisites_title: string;
  prerequisites_desc: string;
  prerequisites_node_title: string;
  prerequisites_node_options: string[];
  
  // Quick Start section
  quick_start: string;
  installation_commands: string[];
  
  // Why Choose section
  why_title: string;
  why_isolated_title: string;
  why_isolated_items: string[];
  why_practices_title: string;
  why_practices_items: string[];
  
  // Provider Integration section
  provider_integration_title: string;
  zhipu_logo_path: string;
  zhipu_description: string;
  zhipu_models_title: string;
  zhipu_models: string[];
  zhipu_api_title: string;
  zhipu_api_links: string[];
  
  // Model Configuration section
  model_config_title: string;
  model_config_desc: string;
  model_config_main: string;
  model_config_fast: string;
  model_config_example: string;
  model_config_example_main: string;
  model_config_example_fast: string;
  
  // Configuration section
  configuration_title: string;
  configuration_desc: string;
  configuration_steps: string[];
  
  // Usage section
  usage_title: string;
  usage_desc: string;
  usage_examples: string[];
  
  // Troubleshooting section
  troubleshooting_title: string;
  troubleshooting_common: string;
  troubleshooting_tips: string[];
  
  // Uninstallation section
  uninstallation_title: string;
  uninstallation_basic_title: string;
  uninstallation_complete_title: string;
  uninstallation_note: string;
  uninstallation_commands: {
    basic: string;
    macos_linux: string[];
    windows_ps: string[];
    windows_cmd: string[];
  };
  
  // Contributing section
  contributing: string;
  contributing_text: string;
  
  // License section
  license: string;
  license_text: string;
  
  // Help section
  need_help: string;
}

export interface I18nData {
  home: I18nHome;
}

// Type guard to validate i18n data structure
export function isValidI18nData(data: any): data is I18nData {
  if (!data || typeof data !== 'object') return false;
  if (!data.home || typeof data.home !== 'object') return false;
  
  const home = data.home;
  const requiredStringFields = [
    'description', 'subtitle', 'prerequisites_title', 'prerequisites_desc',
    'prerequisites_node_title', 'quick_start', 'why_title', 'why_isolated_title',
    'why_practices_title', 'provider_integration_title', 'zhipu_logo_path',
    'zhipu_description', 'zhipu_models_title', 'zhipu_api_title',
    'model_config_title', 'model_config_desc', 'model_config_main',
    'model_config_fast', 'model_config_example', 'model_config_example_main',
    'model_config_example_fast', 'configuration_title', 'configuration_desc',
    'usage_title', 'usage_desc', 'troubleshooting_title', 'troubleshooting_common',
    'uninstallation_title', 'uninstallation_basic_title', 'uninstallation_complete_title',
    'uninstallation_note', 'contributing', 'contributing_text', 'license',
    'license_text', 'need_help'
  ];
  
  const requiredArrayFields = [
    'prerequisites_node_options', 'installation_commands', 'why_isolated_items',
    'why_practices_items', 'zhipu_models', 'zhipu_api_links',
    'configuration_steps', 'usage_examples', 'troubleshooting_tips'
  ];
  
  // Check required string fields
  for (const field of requiredStringFields) {
    if (typeof home[field] !== 'string') {
      console.error(`Missing or invalid string field: ${field}`);
      return false;
    }
  }
  
  // Check required array fields
  for (const field of requiredArrayFields) {
    if (!Array.isArray(home[field])) {
      console.error(`Missing or invalid array field: ${field}`);
      return false;
    }
  }
  
  // Check uninstallation_commands structure
  if (!home.uninstallation_commands || typeof home.uninstallation_commands !== 'object') {
    console.error('Missing or invalid uninstallation_commands');
    return false;
  }
  
  const commands = home.uninstallation_commands;
  if (typeof commands.basic !== 'string') {
    console.error('Missing or invalid uninstallation_commands.basic');
    return false;
  }
  
  const commandArrays = ['macos_linux', 'windows_ps', 'windows_cmd'];
  for (const field of commandArrays) {
    if (!Array.isArray(commands[field])) {
      console.error(`Missing or invalid uninstallation_commands.${field}`);
      return false;
    }
  }
  
  return true;
}