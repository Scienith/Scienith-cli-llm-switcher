#!/usr/bin/env node
/**
 * Generate providers.json.template from PROVIDER_CONFIGS
 * This ensures the template is always in sync with the TypeScript definitions
 */

const fs = require('fs');
const path = require('path');

// Import PROVIDER_CONFIGS from compiled types
const typesModule = require('../dist/core/types.js');
const PROVIDER_CONFIGS = typesModule.PROVIDER_CONFIGS;

if (!PROVIDER_CONFIGS) {
  console.error('Error: PROVIDER_CONFIGS not found in dist/core/types.js');
  console.error('Please run "npm run build" first');
  process.exit(1);
}

// Generate template JSON structure
function generateTemplate() {
  const template = {
    providers: {},
    currentProvider: null,
    lastProviders: {}
  };

  // Convert PROVIDER_CONFIGS to template format
  for (const [key, config] of Object.entries(PROVIDER_CONFIGS)) {
    template.providers[key] = {
      name: config.name,
      baseUrl: config.baseUrl,
      anthropicUrl: config.anthropicUrl,
      defaultModel: config.defaultModel,
      fastModel: config.fastModel
    };
    
    // Remove undefined fields
    if (!config.anthropicUrl) {
      delete template.providers[key].anthropicUrl;
    }
  }

  return template;
}

// Main function
function main() {
  console.log('📝 Generating providers.json.template from PROVIDER_CONFIGS...');
  
  const template = generateTemplate();
  const templatePath = path.resolve(__dirname, '..', 'config', 'providers.json.template');
  
  // Ensure config directory exists
  const configDir = path.dirname(templatePath);
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }
  
  // Write template file
  fs.writeFileSync(
    templatePath,
    JSON.stringify(template, null, 2) + '\n',
    'utf-8'
  );
  
  console.log('✅ Generated config/providers.json.template');
  console.log(`   Providers: ${Object.keys(template.providers).join(', ')}`);
}

if (require.main === module) {
  main();
}

module.exports = { generateTemplate };