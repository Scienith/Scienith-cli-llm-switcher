<div align="center">

<img src="assets/images/logo/logo.jpeg" alt="CLI LLM 切换器" width="50%">

# CLI LLM 切换器

*一个用于在多个LLM提供商之间无缝切换的命令行工具*

[![Version](https://img.shields.io/badge/version-v0.2.0-alpha.14-blue.svg)](https://github.com/Scienith/Scienith-cli-llm-switcher/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

**🌍 Languages**: [English](README.md) | 中文 | [日本語](README_ja.md) | [한국어](README_ko.md) | [Français](README_fr.md) | [Deutsch](README_de.md) | [Español](README_es.md) | [Русский](README_ru.md) | [العربية](README_ar.md)

</div>

**在不影响原生 Claude Code 设置的情况下，无缝切换 LLM 提供商。** 采用模型提供商官方最佳实践的隔离配置。

## 💡 为什么选择 LLM 切换器？

### 🔒 隔离的配置环境
- **对原生 Claude Code 零影响**: 您的原始 Claude 设置保持不变
- **按会话切换提供商**: 每个终端会话可以使用不同的提供商
- **安全的 API 密钥管理**: 配置隔离在 `~/.llm-switch/` 中

### 🎯 官方最佳实践
- **提供商推荐配置**: 遵循智谱、阿里、DeepSeek 的官方集成指南
- **双 API 支持**: 同时支持 OpenAI 兼容和 Anthropic 兼容端点
- **优化的模型选择**: 为每个提供商预配置主模型和快速模型

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

- **🔄 多提供商支持**: DeepSeek、通义千问、智谱GLM-4.5、Kimi
- **🌍 跨平台兼容**: macOS、Linux、Windows (Git Bash/Cygwin)
- **🔧 智能Shell集成**: 自动检测并集成 bash、zsh、fish
- **⚙️ 交互式配置向导**: 安全的API密钥输入、模型选择
- **📦 完整的安装/卸载**: 一键安装，干净移除
- **🌐 多语言文档**: 支持英文和中文文档

## 🤖 智谱GLM集成

<div align="center">
<img src="https://raw.githubusercontent.com/Scienith/Scienith-cli-llm-switcher/main/assets/images/logo/zhipu.png" alt="Zhipu GLM" width="200">
</div>

**智谱GLM** 是由智谱AI开发的强大中文大语言模型系列，为各种任务提供最先进的性能。

### 可用模型
- **glm-4.5**: 用于复杂推理和生成任务的主要模型
- **glm-4.5-air**: 优化快速响应的轻量模型

### 获取您的API密钥
- **🇨🇳 中国**: [https://bigmodel.cn/](https://bigmodel.cn/)
- **🌍 国际版**: [https://z.ai/model-api](https://z.ai/model-api)



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

## 贡献

欢迎贡献！请随时提交 Pull Request。

## 许可证

本项目基于 MIT 许可证 - 详情请参阅 [LICENSE](LICENSE) 文件。

---

**需要帮助？** 查看完整文档以获取详细指南和故障排除。