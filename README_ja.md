<div align="center">

<img src="assets/images/logo/logo.jpeg" alt="CLI LLM スイッチャー" width="50%">

# CLI LLM スイッチャー

*複数のLLMプロバイダー間をシームレスに切り替えるためのコマンドラインツール*

[![Version](https://img.shields.io/badge/version-v0.1.0a2-blue.svg)](https://github.com/Scienith/Scienith-cli-llm-switcher/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

**🌍 Languages**: [English](README.md) | [中文](README_zh.md) | 日本語 | [한국어](README_ko.md) | [Français](README_fr.md) | [Deutsch](README_de.md) | [Español](README_es.md) | [Русский](README_ru.md) | [العربية](README_ar.md)

</div>

**DeepSeek、Qwen、Zhipu GLM、Kimi、Claude、OpenAI、Groq を1つのコマンドで切り替え**、Claude Code や互換CLIツールに完璧対応。

## 🚀 クイックスタート

```bash
# クローンとセットアップ
git clone https://github.com/Scienith/Scienith-cli-llm-switcher
cd cli-llm-switcher
./install.sh
source ~/.bashrc  # または source ~/.zshrc (Zshユーザー)

# プロバイダーのAPIキーを設定
lms config
# プロンプトに従ってAPIキーを入力しデフォルトモデルを選択

# Zhipu GLMに切り替え
lms switch zhipu

# 現在のプロバイダーでClaudeを実行
lms run claude
```

## 主要機能

- **🔄 マルチプロバイダーサポート**: DeepSeek、Qwen、Zhipu GLM-4.5、Kimi、Claude、OpenAI、Groq
- **🌍 クロスプラットフォーム対応**: macOS、Linux、Windows (Git Bash/Cygwin)
- **🔧 スマートシェル統合**: bash、zsh、fishを自動検出・統合
- **⚙️ インタラクティブ設定ウィザード**: 安全なAPIキー入力、モデル選択
- **📦 完全インストール/アンインストール**: ワンクリックインストール、クリーン削除
- **🌐 多言語ドキュメント**: 英語と中国語ドキュメントサポート

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

## 貢献

貢献を歓迎します！プルリクエストをお気軽にお送りください。

## 謝辞

このプロジェクトの元となるインスピレーションと初期スクリプトを提供いただいた **季海東** に特別な感謝を申し上げます。季海東は3冊のSQL Server経典教科書の共著者であり、このツールの構築において彼の洞察は非常に貴重でした。

🔗 **季海東についてもっと知る**: https://www.haidongji.com/about-me/

## ライセンス

本プロジェクトはMITライセンスの下でライセンスされています - 詳細については[LICENSE](LICENSE)ファイルをご覧ください。

---

**ヘルプが必要ですか？** 詳細なガイドとトラブルシューティングについては、完全なドキュメントをご確認ください。