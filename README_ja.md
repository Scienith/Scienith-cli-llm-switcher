<div align="center">

<img src="assets/images/logo/logo.jpeg" alt="cli-llm-switcher" width="50%">

# cli-llm-switcher

*複数のLLMプロバイダー間をシームレスに切り替えるためのコマンドラインツール*

[![Version](https://img.shields.io/badge/version-v0.2.0-blue.svg)](https://github.com/Scienith/Scienith-cli-llm-switcher/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

**🌍 Languages**: [English](README.md) | [中文](README_zh.md) | 日本語 | [한국어](README_ko.md) | [Français](README_fr.md) | [Deutsch](README_de.md) | [Español](README_es.md) | [Русский](README_ru.md) | [العربية](README_ar.md)

</div>

**DeepSeek、Qwen、Zhipu GLM、Kimi、Claude、OpenAI、Groq を1つのコマンドで切り替え**、Claude Code や互換CLIツールに完璧対応。

## 💡 💡 なぜLLMスイッチャーを選ぶのか？

### 🔒 分離された設定環境
- **ネイティブClaude Codeへの影響ゼロ**: 元のClaude設定は変更されません
- **セッションごとのプロバイダー切り替え**: 各ターミナルセッションで異なるプロバイダーを使用可能

### 🎯 公式ベストプラクティス
- **プロバイダー推奨設定**: 各プロバイダーの公式統合ガイドラインに従う
- **Claude Code デュアルモデル設定**: 複雑なタスク用のメインモデル、簡単なタスク用の高速モデル - パフォーマンスとコストを賢く最適化


## 📋 前提条件

インストールする前に、Node.js（v16以降）がインストールされていることを確認してください：

### Node.js のインストール

**オプション1（推奨）**：nvmを使用してNode.jsを簡単に管理
  ```bash
  # nvmをインストール: https://github.com/nvm-sh/nvm#install--update-script
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
  # ターミナルを再起動し、最新のNode.jsをインストール
  nvm install node
  nvm use node
  ```
**オプション2**：[nodejs.org](https://nodejs.org/)からダウンロード（LTSバージョンを選択）

インストールの確認：
```bash
node --version  # v16.0.0以降が表示されるはずです
npm --version   # npmのバージョンが表示されるはずです
```

## クイックスタート

```bash
# npm でグローバルインストール
npm install -g cli-llm-switcher

# インストールの確認
lms --version

# API キーの設定
lms config
# プロンプトに従って API キーを入力

# Claude Code または他のツールで使用開始
lms run claude
```

## 🤖 Provider Integration

<div align="center">
<img src="https://raw.githubusercontent.com/Scienith/Scienith-cli-llm-switcher/main/assets/images/logo/zhipu.jpg" alt="Zhipu GLM" width="200">
</div>

**Zhipu GLM** is a powerful Chinese large language model series developed by Zhipu AI, offering state-of-the-art performance for various tasks.

### Available Models
- **glm-4.5**: Main model for complex reasoning and generation tasks
- **glm-4.5-air**: Fast model optimized for quick responses

### Get Your API Key
- **🇨🇳 China**: [https://bigmodel.cn/](https://bigmodel.cn/)
- **🌍 International**: [https://z.ai/model-api](https://z.ai/model-api)



## アンインストール

### 基本的なアンインストール（設定を保持）

```bash
npm uninstall -g cli-llm-switcher
```

### 完全なアンインストール（すべて削除）

注意：アンインストール前に `lms status` を実行して設定ディレクトリのパスを確認してください。

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

## ライセンス

本プロジェクトはMITライセンスの下でライセンスされています - 詳細については[LICENSE](LICENSE)ファイルをご覧ください。

---

**ヘルプが必要ですか？** 詳細なガイドとトラブルシューティングについては、完全なドキュメントをご確認ください。