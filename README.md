<div align="center">

<img src="assets/images/logo/logo.jpeg" alt="CLI LLM Switcher" width="50%">

# CLI LLM Switcher

*A command-line tool for seamlessly switching between multiple LLM providers*

[![Version](https://img.shields.io/badge/version-v0.1.0a2-blue.svg)](https://github.com/Scienith/Scienith-cli-llm-switcher/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

**🌍 Languages**: English | [中文](README_zh.md) | [日本語](README_ja.md) | [한국어](README_ko.md) | [Français](README_fr.md) | [Deutsch](README_de.md) | [Español](README_es.md) | [Русский](README_ru.md) | [العربية](README_ar.md)

</div>

**Seamlessly switch between LLM providers without affecting your native Claude Code setup.** Isolated configuration with official best practices from model providers.

## 💡 Why LLM Switcher?

### 🔒 Isolated Configuration Environment
- **Zero impact on native Claude Code**: Your original Claude setup remains untouched
- **Per-session provider switching**: Each terminal session can use different providers
- **Secure API key management**: Isolated configuration in `~/.llm-switch/`

### 🎯 Official Best Practices
- **Provider-recommended configurations**: Following official integration guidelines from Zhipu, Alibaba, DeepSeek
- **Dual API support**: Both OpenAI-compatible and Anthropic-compatible endpoints
- **Optimized model selection**: Pre-configured main and fast models for each provider

## 🚀 Quick Start

```bash
# Install via npm (recommended)
npm install -g cli-llm-switcher

# Or clone and setup from source
git clone https://github.com/Scienith/Scienith-cli-llm-switcher
cd cli-llm-switcher
npm install && npm run build
npm link

# Configure API keys for providers
lms config
# Follow prompts to enter API keys and select default models

# Switch to Zhipu GLM
lms switch zhipu

# Run qwen CLI with the current provider
lms run qwen
```

## Core Features

- **🔒 Isolated Environment**: Doesn't affect your native Claude Code configuration
- **🎯 Official Integration**: Follows each provider's recommended best practices
- **🔄 Multi-Provider Support**: DeepSeek, AlibabaCloud, Zhipu GLM, Kimi
- **⚡ Zero Conflict**: Run multiple providers in different terminal sessions
- **🌍 Cross-Platform**: macOS, Linux, Windows (via npm)
- **📦 Easy Installation**: Single npm command, no shell configuration needed

## Supported Providers

| Provider | Models | API Registration |
|----------|--------|------------------|
| **Zhipu GLM** | glm-4.5, glm-4.5-air | [China](https://bigmodel.cn/) \| [International](https://z.ai/model-api) |
| **DeepSeek** | deepseek-chat | [Apply](https://platform.deepseek.com/) |
| **Alibaba-Int** | qwen3-coder-plus, qwen3-coder-flash | [Apply](https://modelstudio.console.alibabacloud.com/) |
| **Alibaba** | qwen3-coder-plus, qwen3-coder-flash | [Apply](https://bailian.console.aliyun.com/) |
| **Kimi (Moonshot AI)** | K2-Instruct-0905 | [Apply](https://platform.moonshot.ai/) |


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

## Acknowledgments

Special thanks to **Haidong Ji** for the original inspiration and initial scripts that led to this project. Haidong is a co-author of three classic SQL Server textbooks and his insights were invaluable in shaping this tool.

🔗 **Learn more about Haidong Ji**: https://www.haidongji.com/about-me/

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Need help?** Check the complete documentation for detailed guides and troubleshooting.