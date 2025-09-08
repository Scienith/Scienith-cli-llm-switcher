<div align="center">

<img src="assets/images/logo/logo.jpeg" alt="CLI LLM 切换器" width="50%">

# CLI LLM 切换器

*一个用于在多个LLM提供商之间无缝切换的命令行工具*

[![Version](https://img.shields.io/badge/version-v0.1.0a1-blue.svg)](https://github.com/Scienith/Scienith-cli-llm-switcher/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

**🌍 Languages**: [English](README.md) | 中文 | [日本語](README_ja.md) | [한국어](README_ko.md) | [Français](README_fr.md) | [Deutsch](README_de.md) | [Español](README_es.md) | [Русский](README_ru.md) | [العربية](README_ar.md)

</div>

**一键切换DeepSeek、通义千问、智谱GLM、Kimi、Claude、OpenAI和Groq**，完美适配Claude Code等兼容CLI工具。

## 🚀 快速开始

```bash
# 克隆并设置
git clone https://github.com/Scienith/Scienith-cli-llm-switcher
cd cli-llm-switcher
./install.sh
source ~/.bashrc  # 或者 source ~/.zshrc (Zsh用户)

# 配置提供商的 API 密钥
lms config
# 按提示输入 API 密钥并选择默认模型

# 切换到智谱 GLM
lms switch zhipu

# 使用当前提供商运行 Claude
lms run claude
```

## 核心功能

- **🔄 多提供商支持**: DeepSeek、通义千问、智谱GLM-4.5、Kimi、Claude、OpenAI、Groq
- **🌍 跨平台兼容**: macOS、Linux、Windows (Git Bash/Cygwin)
- **🔧 智能Shell集成**: 自动检测并集成 bash、zsh、fish
- **⚙️ 交互式配置向导**: 安全的API密钥输入、模型选择
- **📦 完整的安装/卸载**: 一键安装，干净移除
- **🌐 多语言文档**: 支持英文和中文文档

## 贡献

欢迎贡献！请随时提交 Pull Request。

## 致谢

特别感谢 **季海东** 提供的原始灵感和初始脚本，促成了这个项目的诞生。季海东是三本经典SQL Server教材的合著者，他的见解对塑造这个工具非常宝贵。

🔗 **了解更多关于季海东**: https://www.haidongji.com/about-me/

## 许可证

本项目基于 MIT 许可证 - 详情请参阅 [LICENSE](LICENSE) 文件。

---

**需要帮助？** 查看完整文档以获取详细指南和故障排除。