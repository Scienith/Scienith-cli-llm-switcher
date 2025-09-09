<div align="center">

<img src="assets/images/logo/logo.jpeg" alt="cli-llm-switcher" width="50%">

# cli-llm-switcher

*A command-line tool for seamlessly switching between multiple LLM providers*

[![Version](https://img.shields.io/badge/version-v0.3.1-blue.svg)](https://github.com/Scienith/Scienith-cli-llm-switcher/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

**🌍 Languages**: English | [中文](README_zh.md) | [日本語](README_ja.md) | [한국어](README_ko.md) | [Français](README_fr.md) | [Deutsch](README_de.md) | [Español](README_es.md) | [Русский](README_ru.md) | [العربية](README_ar.md)

</div>

**Seamlessly switch between LLM providers without affecting your native Claude Code setup.** Isolated configuration with official best practices from model providers.

## 💡 Why LLM Switcher?

### 🔒 Isolated Configuration Environment
- **Zero impact on native Claude Code**: Your original Claude setup remains untouched
- **Per-session provider switching**: Each terminal session can use different providers

### 🎯 Official Best Practices
- **Provider-recommended configurations**: Following official integration guidelines from each provider
- **Claude Code dual-model configuration**: Main model for conversation/planning/code generation/complex reasoning, fast model (Claude uses Haiku e.g. 3.5 Haiku) for file search/syntax checking and auxiliary tasks - intelligently optimizing performance and cost


## 📋 Prerequisites

Before installing, ensure you have Node.js (v16 or later) installed:

### Install Node.js

**Option 1 (Recommended)**: Use nvm for easy Node.js management
  ```bash
  # Install nvm: https://github.com/nvm-sh/nvm#install--update-script
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
  # Restart terminal, then install latest Node.js
  nvm install node
  nvm use node
  ```
**Option 2**: Download from [nodejs.org](https://nodejs.org/) (choose LTS version)

Verify installation:
```bash
node --version  # Should show v16.0.0 or higher
npm --version   # Should show npm version
```

## 🚀 Installation

```bash
# Install globally via npm
npm install -g cli-llm-switcher

# Verify installation
lms --version

# Configure API keys
lms config
# Follow prompts to enter your API key

# Start using with Claude Code or other tools
lms run claude
```

## 🤖 Provider Integration

### DeepSeek

<div align="center">
<img src="https://raw.githubusercontent.com/Scienith/Scienith-cli-llm-switcher/main/assets/images/logo/deepseek_logo.png" alt="DeepSeek" width="200">
</div>

### Model Configuration
- **Main Model**: `deepseek-chat`
- **Fast Model**: `deepseek-chat`

### Get Your API Key
- **Platform**: [https://platform.deepseek.com/](https://platform.deepseek.com/)

---

### AlibabaCloud (International)

<div align="center">
<img src="https://raw.githubusercontent.com/Scienith/Scienith-cli-llm-switcher/main/assets/images/logo/alibaba_cloud.png" alt="AlibabaCloud (International)" width="200">
</div>

### Model Configuration
- **Main Model**: `qwen3-coder-plus`
- **Fast Model**: `qwen3-coder-flash`

### Get Your API Key
- **🌍 International**: [https://modelstudio.console.alibabacloud.com/](https://modelstudio.console.alibabacloud.com/)

---

### AlibabaCloud (China)

<div align="center">
<img src="https://raw.githubusercontent.com/Scienith/Scienith-cli-llm-switcher/main/assets/images/logo/alibaba_cloud.png" alt="AlibabaCloud (China)" width="200">
</div>

### Model Configuration
- **Main Model**: `qwen3-coder-plus`
- **Fast Model**: `qwen3-coder-flash`

### Get Your API Key
- **🇨🇳 China**: [https://bailian.console.aliyun.com/](https://bailian.console.aliyun.com/)

---

### Moonshot AI

<div align="center">
<img src="https://raw.githubusercontent.com/Scienith/Scienith-cli-llm-switcher/main/assets/images/logo/moonshot_logo.png" alt="Moonshot AI" width="200">
</div>

### Model Configuration
- **Main Model**: `K2-Instruct-0905`
- **Fast Model**: `K2-Instruct-0905`

### Get Your API Key
- **Platform**: [https://platform.moonshot.ai/](https://platform.moonshot.ai/)

---

### Zhipu GLM

<div align="center">
<img src="https://raw.githubusercontent.com/Scienith/Scienith-cli-llm-switcher/main/assets/images/logo/zhipu.jpg" alt="Zhipu GLM" width="200">
</div>

### Model Configuration
- **Main Model**: `glm-4.5`
- **Fast Model**: `glm-4.5-air`

### Get Your API Key
- **🇨🇳 China**: [https://bigmodel.cn/](https://bigmodel.cn/)
- **🌍 International**: [https://z.ai/model-api](https://z.ai/model-api)

---



## Uninstallation

### Basic Uninstall (keeps configuration)

```bash
npm uninstall -g cli-llm-switcher
```

### Complete Uninstall (removes everything)

Note: Run `lms status` to see the configuration directory path before uninstalling.

**macOS/Linux:**
```bash
npm uninstall -g cli-llm-switcher
rm -rf ~/.llm-switch
```

**Windows (PowerShell):**
```powershell
npm uninstall -g cli-llm-switcher
Remove-Item -Recurse -Force "$env:USERPROFILE\.llm-switch"
```

**Windows (Command Prompt):**
```cmd
npm uninstall -g cli-llm-switcher
rmdir /s /q "%USERPROFILE%\.llm-switch"
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## References

Official provider configuration guides for Claude Code integration:

- [DeepSeek Anthropic API Guide](https://api-docs.deepseek.com/guides/anthropic_api)
- [Alibaba Cloud Model Studio - Claude Code Integration](https://help.aliyun.com/zh/model-studio/claude-code)
- [Zhipu GLM - Claude Development Guide](https://docs.bigmodel.cn/cn/guide/develop/claude)

---

**Need help?** Check the complete documentation for detailed guides and troubleshooting.