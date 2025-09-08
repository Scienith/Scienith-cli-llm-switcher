<div align="center">

<img src="assets/images/logo/logo.jpeg" alt="CLI LLM Switcher" width="50%">

# CLI LLM Switcher

*A command-line tool for seamlessly switching between multiple LLM providers*

[![Version](https://img.shields.io/badge/version-v0.1.0a1-blue.svg)](https://github.com/Scienith/Scienith-cli-llm-switcher/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

**🌍 Languages**: English | [中文](README_zh.md) | [日本語](README_ja.md) | [한국어](README_ko.md) | [Français](README_fr.md) | [Deutsch](README_de.md) | [Español](README_es.md) | [Русский](README_ru.md) | [العربية](README_ar.md)

</div>

**Switch between DeepSeek, Qwen, Zhipu GLM, Kimi, Claude, OpenAI, and Groq** with a single command when using Claude Code or compatible CLI tools.

## 🚀 Quick Start

```bash
# Clone and setup
git clone https://github.com/Scienith/Scienith-cli-llm-switcher
cd cli-llm-switcher
./install.sh
source ~/.bashrc  # or source ~/.zshrc for Zsh

# Configure API keys for providers
lms config
# Follow prompts to enter API keys and select default models

# Switch to Zhipu GLM
lms switch zhipu

# Run Claude with the current provider
lms run claude
```

## Core Features

- **🔄 Multi-Provider Support**: DeepSeek, Qwen, Zhipu GLM-4.5, Kimi, Claude, OpenAI, Groq
- **🌍 Cross-Platform Compatible**: macOS, Linux, Windows (Git Bash/Cygwin)
- **🔧 Smart Shell Integration**: Auto-detects and integrates with bash, zsh, fish
- **⚙️ Interactive Configuration Wizard**: Secure API key input, model selection
- **📦 Complete Install/Uninstall**: One-click installation, clean removal
- **🌐 Multi-Language Documentation**: English and Chinese documentation support

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

Special thanks to **Haidong Ji** for the original inspiration and initial scripts that led to this project. Haidong is a co-author of three classic SQL Server textbooks and his insights were invaluable in shaping this tool.

🔗 **Learn more about Haidong Ji**: https://www.haidongji.com/about-me/

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Need help?** Check the complete documentation for detailed guides and troubleshooting.