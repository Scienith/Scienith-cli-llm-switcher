<div align="center">

<img src="assets/images/logo/logo.jpeg" alt="CLI LLM Umschalter" width="50%">

# CLI LLM Umschalter

*Ein Kommandozeilen-Tool zum nahtlosen Wechseln zwischen mehreren LLM-Anbietern*

[![Version](https://img.shields.io/badge/version-v0.2.0-alpha.14-blue.svg)](https://github.com/Scienith/Scienith-cli-llm-switcher/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

**🌍 Languages**: [English](README.md) | [中文](README_zh.md) | [日本語](README_ja.md) | [한국어](README_ko.md) | [Français](README_fr.md) | Deutsch | [Español](README_es.md) | [Русский](README_ru.md) | [العربية](README_ar.md)

</div>

**Wechseln Sie zwischen DeepSeek, Qwen, Zhipu GLM, Kimi** mit einem einzigen Befehl bei Verwendung von Claude Code oder kompatiblen CLI-Tools.

## 🚀 Schnellstart

```bash
# Klonen und einrichten
git clone https://github.com/Scienith/Scienith-cli-llm-switcher
cd cli-llm-switcher
./install.sh
source ~/.bashrc  # oder source ~/.zshrc (für Zsh)

# API-Schlüssel für Anbieter konfigurieren
lms config
# Befolgen Sie die Eingabeaufforderungen zur Eingabe des API-Schlüssels und zur Auswahl des Standardmodells

# Zu Zhipu GLM wechseln
lms switch zhipu

# Claude mit dem aktuellen Anbieter ausführen
lms run claude
```

## Hauptmerkmale

- **🔄 Multi-Anbieter-Unterstützung**: DeepSeek, Qwen, Zhipu GLM-4.5, Kimi
- **🌍 Plattformübergreifend kompatibel**: macOS, Linux, Windows (Git Bash/Cygwin)
- **🔧 Intelligente Shell-Integration**: Automatische Erkennung und Integration von bash, zsh, fish
- **⚙️ Interaktiver Konfigurationsassistent**: Sichere API-Schlüssel-Eingabe, Modellauswahl
- **📦 Vollständige Installation/Deinstallation**: Ein-Klick-Installation, saubere Entfernung
- **🌐 Mehrsprachige Dokumentation**: Unterstützung für englische und chinesische Dokumentation

## 🤖 Zhipu GLM Integration

<div align="center">
<img src="https://raw.githubusercontent.com/Scienith/Scienith-cli-llm-switcher/main/assets/images/logo/zhipu.png" alt="Zhipu GLM" width="200">
</div>

**Zhipu GLM** is a powerful Chinese large language model series developed by Zhipu AI, offering state-of-the-art performance for various tasks.

### Available Models
- **glm-4.5**: Main model for complex reasoning and generation tasks
- **glm-4.5-air**: Fast model optimized for quick responses

### Get Your API Key
- **🇨🇳 China**: [https://bigmodel.cn/](https://bigmodel.cn/)
- **🌍 International**: [https://z.ai/model-api](https://z.ai/model-api)



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

## Mitwirken

Beiträge sind willkommen! Bitte zögern Sie nicht, einen Pull Request einzureichen.

## Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert - siehe die [LICENSE](LICENSE) Datei für Details.

---

**Brauchen Sie Hilfe?** Schauen Sie sich die vollständige Dokumentation für detaillierte Anleitungen und Fehlerbehebung an.