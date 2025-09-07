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
    return '0.1.0a1'; // final fallback
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

## 🚀 ${quickStartTitle}

\`\`\`bash
${quickStartCommands}
\`\`\`

## ${featuresTitle}

${featuresList}

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