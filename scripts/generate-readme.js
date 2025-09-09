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
    }
  });
  
  return i18nData;
}

// Generate providers table with API URLs
function generateProvidersTable(locale) {
  // Import PROVIDER_KEYS for use
  const PROVIDER_KEYS = typesModule.PROVIDER_KEYS;
  
  const providers = [
    {
      key: PROVIDER_KEYS.ZHIPU,
      name: 'Zhipu GLM',
      models: 'glm-4.5, glm-4.5-air',
      urls: PROVIDER_CONFIGS[PROVIDER_KEYS.ZHIPU]?.apiUrls || [],
      labels: PROVIDER_CONFIGS[PROVIDER_KEYS.ZHIPU]?.apiUrlLabels || ['China', 'International']
    },
    {
      key: PROVIDER_KEYS.DEEPSEEK,
      name: 'DeepSeek',
      models: 'deepseek-chat',
      urls: PROVIDER_CONFIGS[PROVIDER_KEYS.DEEPSEEK]?.apiUrls || []
    },
    {
      key: PROVIDER_KEYS.ALIBABACLOUD_INT,
      name: 'Alibaba-Int',
      models: 'qwen3-coder-plus, qwen3-coder-flash',
      urls: PROVIDER_CONFIGS[PROVIDER_KEYS.ALIBABACLOUD_INT]?.apiUrls || []
    },
    {
      key: PROVIDER_KEYS.ALIBABACLOUD,
      name: 'Alibaba',
      models: 'qwen3-coder-plus, qwen3-coder-flash',
      urls: PROVIDER_CONFIGS[PROVIDER_KEYS.ALIBABACLOUD]?.apiUrls || []
    },
    {
      key: PROVIDER_KEYS.KIMI,
      name: 'Kimi (Moonshot AI)',
      models: 'K2-Instruct-0905',
      urls: PROVIDER_CONFIGS[PROVIDER_KEYS.KIMI]?.apiUrls || []
    }
  ];

  const headerProvider = locale === 'zh' ? '供应商' : 'Provider';
  const headerModels = locale === 'zh' ? '模型' : 'Models';
  const headerAPI = locale === 'zh' ? 'API 申请' : 'API Registration';

  let table = `## ${locale === 'zh' ? '支持的供应商' : 'Supported Providers'}\n\n`;
  table += `| ${headerProvider} | ${headerModels} | ${headerAPI} |\n`;
  table += '|----------|--------|------------------|\n';

  for (const provider of providers) {
    let apiLinks = '';
    if (provider.urls.length === 1) {
      const label = locale === 'zh' ? '申请' : 'Apply';
      apiLinks = `[${label}](${provider.urls[0]})`;
    } else if (provider.urls.length > 1) {
      const links = provider.urls.map((url, index) => {
        const label = provider.labels?.[index] || `Link ${index + 1}`;
        return `[${label}](${url})`;
      });
      apiLinks = links.join(' \\| ');
    }
    
    table += `| **${provider.name}** | ${provider.models} | ${apiLinks} |\n`;
  }

  return table;
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
  const quickStartCommands = L.home.installation_commands 
    ? L.home.installation_commands.join('\n')
    : `# One-click installation
curl -sSL https://raw.githubusercontent.com/Scienith/Scienith-cli-llm-switcher/main/install.sh | bash

# Configure provider  
llm-switch config deepseek

# Switch to DeepSeek
llm-switch deepseek

# Now you can use Claude Code!
claude "Help me write a Python function"`;

  // Generate Features list
  const featuresList = L.home.features_list 
    ? L.home.features_list.map(f => `- ${f}`).join('\n')
    : `- 🔄 **Multi-Provider Support**: DeepSeek, Qwen, Zhipu GLM-4.5, Kimi, Claude, OpenAI, Groq
- 🌍 **Cross-Platform Compatible**: macOS, Linux, Windows (Git Bash/Cygwin)
- 🔧 **Smart Shell Integration**: Auto-detects and integrates with bash, zsh, fish
- ⚙️ **Interactive Configuration Wizard**: Secure API key input, model selection
- 📦 **Complete Install/Uninstall**: One-click installation, clean removal
- 🌐 **Multi-Language Documentation**: English and Chinese documentation support`;

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

  const quickStartTitle = L.home.quick_start || 'Quick Start';
  const featuresTitle = L.home.features || 'Features';
  
  // Generate from template for non-English or if English README doesn't exist
  return `<div align="center">

<img src="assets/images/logo/logo.jpeg" alt="${L.home.title}" width="50%">

# ${L.home.title}

*${L.home.description}*

[![Version](https://img.shields.io/badge/version-${getVersion()}-blue.svg)](https://github.com/Scienith/Scienith-cli-llm-switcher/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

${langLinks}

</div>

${L.home.subtitle || '**Switch between multiple LLM providers** with a single command when using Claude Code or compatible CLI tools.'}
${whySection}
## 🚀 ${quickStartTitle}

\`\`\`bash
${quickStartCommands}
\`\`\`

## ${featuresTitle}

${featuresList}

${generateProvidersTable(locale)}

## ${L.home.uninstallation_title || 'Uninstallation'}

### ${L.home.uninstallation_basic_title || 'Basic Uninstall (keeps configuration)'}

\`\`\`bash
${L.home.uninstallation_commands?.basic || 'npm uninstall -g cli-llm-switcher'}
\`\`\`

### ${L.home.uninstallation_complete_title || 'Complete Uninstall (removes everything)'}

${L.home.uninstallation_note || 'Note: Run `lms status` to see the configuration directory path before uninstalling.'}

**macOS/Linux:**
\`\`\`bash
${L.home.uninstallation_commands?.macos_linux?.join('\n') || 'npm uninstall -g cli-llm-switcher\nrm -rf ~/.llm-switch'}
\`\`\`

**Windows (PowerShell):**
\`\`\`powershell
${L.home.uninstallation_commands?.windows_ps?.join('\n') || 'npm uninstall -g cli-llm-switcher\nRemove-Item -Recurse -Force "$env:USERPROFILE\\.llm-switch"'}
\`\`\`

**Windows (Command Prompt):**
\`\`\`cmd
${L.home.uninstallation_commands?.windows_cmd?.join('\n') || 'npm uninstall -g cli-llm-switcher\nrmdir /s /q "%USERPROFILE%\\.llm-switch"'}
\`\`\`

## ${L.home.contributing || 'Contributing'}

${L.home.contributing_text || 'Contributions welcome! Please see our documentation for detailed guidelines.'}

## ${L.home.acknowledgments || 'Acknowledgments'}

${L.home.acknowledgments_text || 'Special thanks to **Haidong Ji** for the original inspiration and initial scripts that led to this project. Haidong is a co-author of three classic SQL Server textbooks and his insights were invaluable in shaping this tool.'}

${L.home.acknowledgments_link || '🔗 **Learn more about Haidong Ji**: https://www.haidongji.com/about-me/'}

## ${L.home.license || 'License'}

${L.home.license_text || 'MIT License - see [LICENSE](LICENSE) file for details.'}

---

${L.home.need_help || '**Need help?** Check the complete documentation for detailed guides and troubleshooting.'}`;
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