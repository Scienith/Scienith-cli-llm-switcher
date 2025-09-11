<div align="center">

<img src="assets/images/logo/logo.jpeg" alt="cli-llm-switcher" width="50%">

# cli-llm-switcher

*複数のLLMプロバイダー間をシームレスに切り替えるためのコマンドラインツール*

[![Version](https://img.shields.io/badge/version-v0.3.4-blue.svg)](https://github.com/Scienith/cli-llm-switcher/releases)
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
- **Claude Code デュアルモデル構成**: メインモデルは会話/計画立案/コード生成/複雑な推論に使用、高速モデル（Claudeは3.5 Haikuなどを使用）はファイル検索/構文チェックなどの補助タスクに使用 - パフォーマンスとコストを賢く最適化


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

## 🤖 プロバイダー統合

### DeepSeek

<div align="center">
<img src="https://raw.githubusercontent.com/Scienith/cli-llm-switcher/main/assets/images/logo/deepseek_logo.png" alt="DeepSeek" width="200">
</div>

### モデル設定
- **メインモデル**: `deepseek-chat`
- **高速モデル**: `deepseek-chat`

### APIキーを取得
- **プラットフォーム**: [https://platform.deepseek.com/](https://platform.deepseek.com/)

---

### AlibabaCloud (International)

<div align="center">
<img src="https://raw.githubusercontent.com/Scienith/cli-llm-switcher/main/assets/images/logo/alibaba_cloud.png" alt="AlibabaCloud (International)" width="200">
</div>

### モデル設定
- **メインモデル**: `qwen3-coder-plus`
- **高速モデル**: `qwen3-coder-flash`

### APIキーを取得
- **🌍 国際**: [https://modelstudio.console.alibabacloud.com/](https://modelstudio.console.alibabacloud.com/)

---

### AlibabaCloud (China)

<div align="center">
<img src="https://raw.githubusercontent.com/Scienith/cli-llm-switcher/main/assets/images/logo/alibaba_cloud.png" alt="AlibabaCloud (China)" width="200">
</div>

### モデル設定
- **メインモデル**: `qwen3-coder-plus`
- **高速モデル**: `qwen3-coder-flash`

### APIキーを取得
- **🇨🇳 中国**: [https://bailian.console.aliyun.com/](https://bailian.console.aliyun.com/)

---

### Moonshot AI

<div align="center">
<img src="https://raw.githubusercontent.com/Scienith/cli-llm-switcher/main/assets/images/logo/moonshot_logo.png" alt="Moonshot AI" width="200">
</div>

### モデル設定
- **メインモデル**: `kimi-k2-0905-preview`
- **高速モデル**: `kimi-k2-0905-preview`

### APIキーを取得
- **プラットフォーム**: [https://platform.moonshot.ai/](https://platform.moonshot.ai/)

---

### Zhipu GLM

<div align="center">
<img src="https://raw.githubusercontent.com/Scienith/cli-llm-switcher/main/assets/images/logo/zhipu.jpg" alt="Zhipu GLM" width="200">
</div>

### モデル設定
- **メインモデル**: `glm-4.5`
- **高速モデル**: `glm-4.5-air`

### APIキーを取得
- **🇨🇳 中国**: [https://bigmodel.cn/](https://bigmodel.cn/)
- **🌍 国際版**: [https://z.ai/model-api](https://z.ai/model-api)

---

### Grok Code Fast 1

<div align="center">
<img src="https://raw.githubusercontent.com/Scienith/cli-llm-switcher/main/assets/images/logo/grok_logo.png" alt="Grok Code Fast 1" width="200">
</div>

### モデル設定
- **メインモデル**: `grok-code-fast-1`
- **高速モデル**: `grok-code-fast-1`

###  Get Your API Key
-  **Platform**: [https://console.x.ai](https://console.x.ai)

---



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

## 参考文献

Claude Code統合のための公式プロバイダー設定ガイド:

- [DeepSeek Anthropic API Guide](https://api-docs.deepseek.com/guides/anthropic_api)
- [Alibaba Cloud Model Studio - Claude Code Integration](https://help.aliyun.com/zh/model-studio/claude-code)
- [Zhipu GLM - Claude Development Guide](https://docs.bigmodel.cn/cn/guide/develop/claude)

---

**ヘルプが必要ですか？** 詳細なガイドとトラブルシューティングについては、完全なドキュメントをご確認ください。