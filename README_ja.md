<div align="center">

<img src="assets/images/logo/logo.jpeg" alt="CLI LLM スイッチャー" width="50%">

# CLI LLM スイッチャー

*複数のLLMプロバイダー間をシームレスに切り替えるためのコマンドラインツール*

[![Version](https://img.shields.io/badge/version-v0.1.0a1-blue.svg)](https://github.com/Scienith/Scienith-cli-llm-switcher/releases)
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

# プロバイダー設定（インタラクティブセットアップ）
llm-switch config
# プロンプトに従ってAPIキーを入力しデフォルトモデルを選択

# DeepSeekに切り替え
llm-switch deepseek

# Claude Codeが直接使用可能になりました！
claude
```

## 主要機能

- **🔄 マルチプロバイダーサポート**: DeepSeek、Qwen、Zhipu GLM-4.5、Kimi、Claude、OpenAI、Groq
- **🌍 クロスプラットフォーム対応**: macOS、Linux、Windows (Git Bash/Cygwin)
- **🔧 スマートシェル統合**: bash、zsh、fishを自動検出・統合
- **⚙️ インタラクティブ設定ウィザード**: 安全なAPIキー入力、モデル選択
- **📦 完全インストール/アンインストール**: ワンクリックインストール、クリーン削除
- **🌐 多言語ドキュメント**: 英語と中国語ドキュメントサポート

## 貢献

貢献を歓迎します！プルリクエストをお気軽にお送りください。

## 謝辞

このプロジェクトの元となるインスピレーションと初期スクリプトを提供いただいた **季海東** に特別な感謝を申し上げます。季海東は3冊のSQL Server経典教科書の共著者であり、このツールの構築において彼の洞察は非常に貴重でした。

🔗 **季海東についてもっと知る**: https://www.haidongji.com/about-me/

## ライセンス

本プロジェクトはMITライセンスの下でライセンスされています - 詳細については[LICENSE](LICENSE)ファイルをご覧ください。

---

**ヘルプが必要ですか？** 詳細なガイドとトラブルシューティングについては、完全なドキュメントをご確認ください。