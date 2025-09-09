<div align="center">

<img src="assets/images/logo/logo.jpeg" alt="cli-llm-switcher" width="50%">

# cli-llm-switcher

*一个用于在多个LLM提供商之间无缝切换的命令行工具*

[![Version](https://img.shields.io/badge/version-v0.3.1-blue.svg)](https://github.com/Scienith/Scienith-cli-llm-switcher/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

**🌍 Languages**: [English](README.md) | 中文 | [日本語](README_ja.md) | [한국어](README_ko.md) | [Français](README_fr.md) | [Deutsch](README_de.md) | [Español](README_es.md) | [Русский](README_ru.md) | [العربية](README_ar.md)

</div>

**在不影响原生 Claude Code 设置的情况下，无缝切换 LLM 提供商。** 采用模型提供商官方最佳实践的隔离配置。

## 💡 💡 为什么选择 LLM 切换器？

### 🔒 隔离的配置环境
- **对原生 Claude Code 零影响**: 您的原始 Claude 设置保持不变
- **按会话切换提供商**: 每个终端会话可以使用不同的提供商

### 🎯 官方最佳实践
- **提供商推荐配置**: 遵循各供应商的官方集成指南
- **Claude Code 双模型配置**: 主模型用于对话/规划/代码编写/复杂推理等场景，快速模型（Claude使用Haiku如3.5 Haiku）用于文件搜索/语法检查等辅助场景，智能优化性能与成本


## 📋 前置要求

在安装之前，请确保已安装 Node.js（v16 或更高版本）：

### 安装 Node.js

**选项 1（推荐）**：使用 nvm 轻松管理 Node.js
  ```bash
  # 安装 nvm: https://github.com/nvm-sh/nvm#install--update-script
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
  # 重启终端，然后安装最新的 Node.js
  nvm install node
  nvm use node
  ```
**选项 2**：从 [nodejs.org](https://nodejs.org/) 下载（选择 LTS 版本）

验证安装：
```bash
node --version  # 应显示 v16.0.0 或更高版本
npm --version   # 应显示 npm 版本
```

## 🚀 快速开始

```bash
# 通过 npm 全局安装
npm install -g cli-llm-switcher

# 验证安装
lms --version

# 配置 API 密钥
lms config
# 按提示输入您的 API 密钥

# 开始使用 Claude Code 或其他工具
lms run claude
```

## 🤖 供应商集成

### DeepSeek

<div align="center">
<img src="https://raw.githubusercontent.com/Scienith/Scienith-cli-llm-switcher/main/assets/images/logo/deepseek_logo.png" alt="DeepSeek" width="200">
</div>

### 模型配置
- **主模型**: `deepseek-chat`
- **快速模型**: `deepseek-chat`

### 获取您的API密钥
- **平台**: [https://platform.deepseek.com/](https://platform.deepseek.com/)

---

### AlibabaCloud (International)

<div align="center">
<img src="https://raw.githubusercontent.com/Scienith/Scienith-cli-llm-switcher/main/assets/images/logo/alibaba_cloud.png" alt="AlibabaCloud (International)" width="200">
</div>

### 模型配置
- **主模型**: `qwen3-coder-plus`
- **快速模型**: `qwen3-coder-flash`

### 获取您的API密钥
- **🌍 国际版**: [https://modelstudio.console.alibabacloud.com/](https://modelstudio.console.alibabacloud.com/)

---

### AlibabaCloud (China)

<div align="center">
<img src="https://raw.githubusercontent.com/Scienith/Scienith-cli-llm-switcher/main/assets/images/logo/alibaba_cloud.png" alt="AlibabaCloud (China)" width="200">
</div>

### 模型配置
- **主模型**: `qwen3-coder-plus`
- **快速模型**: `qwen3-coder-flash`

### 获取您的API密钥
- **🇨🇳 中国**: [https://bailian.console.aliyun.com/](https://bailian.console.aliyun.com/)

---

### Moonshot AI

<div align="center">
<img src="https://raw.githubusercontent.com/Scienith/Scienith-cli-llm-switcher/main/assets/images/logo/moonshot_logo.png" alt="Moonshot AI" width="200">
</div>

### 模型配置
- **主模型**: `K2-Instruct-0905`
- **快速模型**: `K2-Instruct-0905`

### 获取您的API密钥
- **平台**: [https://platform.moonshot.ai/](https://platform.moonshot.ai/)

---

### Zhipu GLM

<div align="center">
<img src="https://raw.githubusercontent.com/Scienith/Scienith-cli-llm-switcher/main/assets/images/logo/zhipu.jpg" alt="Zhipu GLM" width="200">
</div>

### 模型配置
- **主模型**: `glm-4.5`
- **快速模型**: `glm-4.5-air`

### 获取您的API密钥
- **🇨🇳 中国**: [https://bigmodel.cn/](https://bigmodel.cn/)
- **🌍 国际版**: [https://z.ai/model-api](https://z.ai/model-api)

---



## 卸载

### 基本卸载（保留配置）

```bash
npm uninstall -g cli-llm-switcher
```

### 完全卸载（删除所有内容）

注意：卸载前运行 `lms status` 查看配置目录路径。

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

## 参考资料

官方提供的 Claude Code 集成配置指南：

- [DeepSeek Anthropic API 指南](https://api-docs.deepseek.com/guides/anthropic_api)
- [阿里云模型服务 - Claude Code 集成](https://help.aliyun.com/zh/model-studio/claude-code)
- [智谱 GLM - Claude 开发指南](https://docs.bigmodel.cn/cn/guide/develop/claude)

---

**需要帮助？** 查看完整文档以获取详细指南和故障排除。