#!/usr/bin/env node
/**
 * Generate README files from Jekyll i18n data
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Configuration
const PROJECT_ROOT = path.resolve(__dirname, '..');
const I18N_DIR = path.join(PROJECT_ROOT, 'docs', '_data', 'i18n');

// Import PROVIDER_CONFIGS from compiled types - single source of truth
const typesModule = require('../dist/core/types.js');
const PROVIDER_CONFIGS = typesModule.PROVIDER_CONFIGS;

if (!PROVIDER_CONFIGS) {
  console.error('Error: PROVIDER_CONFIGS not found in dist/core/types.js');
  console.error('Please run "npm run build" before generating README files');
  process.exit(1);
}

// Get version from git tags
function getVersion() {
  try {
    const { execSync } = require('child_process');
    // Get the latest git tag
    const tag = execSync('git describe --tags --abbrev=0', { 
      encoding: 'utf8',
      cwd: PROJECT_ROOT 
    }).trim();
    return tag;
  } catch (error) {
    // Fallback to package.json if git tag fails
    try {
      const packagePath = path.join(PROJECT_ROOT, 'package.json');
      if (fs.existsSync(packagePath)) {
        const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
        return packageData.version;
      }
    } catch (e) {
      // ignore
    }
    return 'v0.2.0'; // final fallback
  }
}

// Check if js-yaml is available
try {
  require.resolve('js-yaml');
} catch (e) {
  console.log('📦 Installing js-yaml...');
  const { execSync } = require('child_process');
  execSync('npm install js-yaml --no-save', { stdio: 'inherit', cwd: PROJECT_ROOT });
}

// Validate required i18n fields
function validateI18nData(locale, data) {
  const requiredFields = [
    'home.description',
    'home.subtitle',
    'home.installation_commands',
    'home.provider_integration_title',
    'home.prerequisites_title',
    'home.prerequisites_node_title',
    'home.quick_start',
    'home.uninstallation_title',
    'home.uninstallation_basic_title',
    'home.uninstallation_complete_title',
    'home.uninstallation_commands.basic',
    'home.uninstallation_commands.macos_linux',
    'home.uninstallation_commands.windows_ps',
    'home.uninstallation_commands.windows_cmd',
    'home.contributing',
    'home.contributing_text',
    'home.license',
    'home.license_text',
    'home.need_help'
  ];
  
  const missingFields = [];
  
  requiredFields.forEach(fieldPath => {
    const parts = fieldPath.split('.');
    let current = data;
    
    for (let i = 0; i < parts.length; i++) {
      if (!current || !current[parts[i]]) {
        missingFields.push(fieldPath);
        break;
      }
      current = current[parts[i]];
    }
  });
  
  if (missingFields.length > 0) {
    console.warn(`⚠️  Warning: ${locale}.yml is missing required fields:`);
    missingFields.forEach(field => console.warn(`   - ${field}`));
  }
  
  return missingFields.length === 0;
}

// Load i18n data
function loadI18nData() {
  const localesFile = path.join(I18N_DIR, 'locales.yml');
  if (!fs.existsSync(localesFile)) {
    console.error('❌ Locales file not found:', localesFile);
    process.exit(1);
  }
  
  const locales = yaml.load(fs.readFileSync(localesFile, 'utf8'));
  const i18nData = {};
  
  Object.entries(locales).forEach(([localeCode, localeName]) => {
    const localeFile = path.join(I18N_DIR, `${localeCode}.yml`);
    if (fs.existsSync(localeFile)) {
      i18nData[localeCode] = yaml.load(fs.readFileSync(localeFile, 'utf8'));
      i18nData[localeCode]._localeName = localeName;
      
      // Validate the loaded data
      validateI18nData(localeCode, i18nData[localeCode]);
    }
  });
  
  return i18nData;
}

// Generate provider integration section
function generateProvidersTable(locale, L) {
  const title = L.home.provider_integration_title; // Required field
  
  // Logo base path
  const logoBasePath = 'https://raw.githubusercontent.com/Scienith/Scienith-cli-llm-switcher/main/assets/images/logo/';
  
  // Get providers to display from CONFIGURABLE_PROVIDERS
  const PROVIDER_KEYS = typesModule.PROVIDER_KEYS;
  const CONFIGURABLE_PROVIDERS = typesModule.CONFIGURABLE_PROVIDERS;
  
  // Build provider list from PROVIDER_CONFIGS
  const providers = CONFIGURABLE_PROVIDERS
    .map(key => {
      const config = PROVIDER_CONFIGS[key];
      if (!config) return null;
      
      // Map provider key to i18n field prefix
      const fieldPrefix = key === 'kimi' ? 'moonshot' : 
                         key === 'alibabacloud-int' ? 'alibaba_int' :
                         key === 'alibabacloud' ? 'alibaba' : 
                         key;
      
      return {
        key: key,
        name: config.name,
        logo: `${logoBasePath}${config.logo}`,
        alt: config.name,
        description: L.home[`${fieldPrefix}_description`],
        defaultModel: config.defaultModel,
        fastModel: config.fastModel,
        apiTitle: L.home[`${fieldPrefix}_api_title`],
        apiLinks: L.home[`${fieldPrefix}_api_links`]
      };
    })
    .filter(p => p !== null);
  
  let content = `## ${title}\n\n`;
  
  providers.forEach(provider => {
    if (!provider.description) return; // Skip if no translation available
    
    // Show provider name first
    content += `### ${provider.name}\n\n`;
    
    content += `<div align="center">\n`;
    content += `<img src="${provider.logo}" alt="${provider.alt}" width="200">\n`;
    content += `</div>\n\n`;
    
    // Show configured models
    if (provider.defaultModel || provider.fastModel) {
      content += `### ${L.home.model_config_title || 'Model Configuration'}\n`;
      if (provider.defaultModel) {
        const mainLabel = L.home.model_config_main?.replace(/\*\*/g, '') || 'Main Model';
        content += `- **${mainLabel}**: \`${provider.defaultModel}\`\n`;
      }
      if (provider.fastModel) {
        const fastLabel = L.home.model_config_fast?.replace(/\*\*/g, '') || 'Fast Model';
        content += `- **${fastLabel}**: \`${provider.fastModel}\`\n`;
      }
      content += `\n`;
    }
    
    if (provider.apiLinks && provider.apiLinks.length > 0) {
      content += `### ${provider.apiTitle}\n`;
      provider.apiLinks.forEach(link => {
        content += `- ${link}\n`;
      });
      content += `\n`;
    }
    
    content += `---\n\n`; // Separator between providers
  });
  
  return content;
}

// Generate language switcher links
function generateLangLinks(currentLocale, locales) {
  const links = [];
  Object.entries(locales).forEach(([code, data]) => {
    if (code === currentLocale) {
      links.push(data._localeName);
    } else {
      const filename = code === 'en' ? 'README.md' : `README_${code.replace('-', '_')}.md`;
      links.push(`[${data._localeName}](${filename})`);
    }
  });
  return `**🌍 Languages**: ${links.join(' | ')}`;
}

// README template
function generateReadmeContent(locale, L, langLinks) {
  // Generate all languages from template to ensure consistency
  
  // Generate Quick Start commands
  if (!L.home.installation_commands) {
    throw new Error(`Missing required field 'installation_commands' in ${locale}.yml`);
  }
  const quickStartCommands = L.home.installation_commands.join('\n');

  // Features list is optional - skip if not present
  const featuresList = L.home.features_list 
    ? L.home.features_list.map(f => `- ${f}`).join('\n')
    : '';

  // Generate Why LLM Switcher section
  let whySection = '';
  if (L.home.why_title) {
    whySection = `\n## 💡 ${L.home.why_title}\n\n`;
    
    if (L.home.why_isolated_title && L.home.why_isolated_items) {
      whySection += `### ${L.home.why_isolated_title}\n`;
      whySection += L.home.why_isolated_items.map(item => `- ${item}`).join('\n') + '\n\n';
    }
    
    if (L.home.why_practices_title && L.home.why_practices_items) {
      whySection += `### ${L.home.why_practices_title}\n`;
      whySection += L.home.why_practices_items.map(item => `- ${item}`).join('\n') + '\n';
    }
  }

  const prerequisitesTitle = L.home.prerequisites_title; // Required field
  const quickStartTitle = L.home.quick_start; // Required field
  const featuresTitle = L.home.features; // Optional field, not used currently
  
  // Generate prerequisites section
  let prerequisitesSection = '';
  if (L.home.prerequisites_desc && L.home.prerequisites_node_options) {
    prerequisitesSection = `
## ${prerequisitesTitle}

${L.home.prerequisites_desc}

### ${L.home.prerequisites_node_title}

${L.home.prerequisites_node_options.map(item => item).join('\n')}
`;
  }
  
  // Generate from template for non-English or if English README doesn't exist
  return `<div align="center">

<img src="assets/images/logo/logo.jpeg" alt="cli-llm-switcher" width="50%">

# cli-llm-switcher

*${L.home.description}*

[![Version](https://img.shields.io/badge/version-${getVersion()}-blue.svg)](https://github.com/Scienith/Scienith-cli-llm-switcher/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

${langLinks}

</div>

${L.home.subtitle || ''}
${whySection}
${prerequisitesSection}
## ${quickStartTitle}

\`\`\`bash
${quickStartCommands}
\`\`\`

${generateProvidersTable(locale, L)}

## ${L.home.uninstallation_title}

### ${L.home.uninstallation_basic_title}

\`\`\`bash
${L.home.uninstallation_commands?.basic || ''}
\`\`\`

### ${L.home.uninstallation_complete_title}

${L.home.uninstallation_note || ''}

**macOS/Linux:**
\`\`\`bash
${L.home.uninstallation_commands?.macos_linux?.join('\n') || ''}
\`\`\`

**Windows (PowerShell):**
\`\`\`powershell
${L.home.uninstallation_commands?.windows_ps?.join('\n') || ''}
\`\`\`

**Windows (Command Prompt):**
\`\`\`cmd
${L.home.uninstallation_commands?.windows_cmd?.join('\n') || ''}
\`\`\`

## ${L.home.contributing}

${L.home.contributing_text || ''}

## ${L.home.license}

${L.home.license_text || ''}

## ${L.home.references_title || 'References'}

${L.home.references_text || ''}

${L.home.references_links ? L.home.references_links.map(link => `- ${link}`).join('\n') : ''}

---

${L.home.need_help || ''}`;
}

function main() {
  console.log('🌍 Generating README files from Jekyll i18n data...');
  
  // Load i18n data
  const i18nData = loadI18nData();
  
  if (Object.keys(i18nData).length === 0) {
    console.error('❌ No i18n data found!');
    process.exit(1);
  }
  
  // Generate README for each language
  Object.entries(i18nData).forEach(([locale, data]) => {
    console.log(`📝 Generating README for ${locale} (${data._localeName})...`);
    
    // Generate language links
    const langLinks = generateLangLinks(locale, i18nData);
    
    // Generate content
    const content = generateReadmeContent(locale, data, langLinks);
    
    // Determine output filename
    const filename = locale === 'en' ? 'README.md' : `README_${locale.replace('-', '_')}.md`;
    
    // Write file
    const outputPath = path.join(PROJECT_ROOT, filename);
    fs.writeFileSync(outputPath, content);
    
    console.log(`✅ Generated ${filename}`);
  });
  
  console.log('🎉 All README files generated successfully!');
}

if (require.main === module) {
  main();
}