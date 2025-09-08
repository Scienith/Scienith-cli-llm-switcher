<div align="center">

<img src="assets/images/logo/logo.jpeg" alt="CLI LLM Umschalter" width="50%">

# CLI LLM Umschalter

*Ein Kommandozeilen-Tool zum nahtlosen Wechseln zwischen mehreren LLM-Anbietern*

[![Version](https://img.shields.io/badge/version-v0.1.0a1-blue.svg)](https://github.com/Scienith/Scienith-cli-llm-switcher/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

**🌍 Languages**: [English](README.md) | [中文](README_zh.md) | [日本語](README_ja.md) | [한국어](README_ko.md) | [Français](README_fr.md) | Deutsch | [Español](README_es.md) | [Русский](README_ru.md) | [العربية](README_ar.md)

</div>

**Wechseln Sie zwischen DeepSeek, Qwen, Zhipu GLM, Kimi, Claude, OpenAI und Groq** mit einem einzigen Befehl bei Verwendung von Claude Code oder kompatiblen CLI-Tools.

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

- **🔄 Multi-Anbieter-Unterstützung**: DeepSeek, Qwen, Zhipu GLM-4.5, Kimi, Claude, OpenAI, Groq
- **🌍 Plattformübergreifend kompatibel**: macOS, Linux, Windows (Git Bash/Cygwin)
- **🔧 Intelligente Shell-Integration**: Automatische Erkennung und Integration von bash, zsh, fish
- **⚙️ Interaktiver Konfigurationsassistent**: Sichere API-Schlüssel-Eingabe, Modellauswahl
- **📦 Vollständige Installation/Deinstallation**: Ein-Klick-Installation, saubere Entfernung
- **🌐 Mehrsprachige Dokumentation**: Unterstützung für englische und chinesische Dokumentation

## Mitwirken

Beiträge sind willkommen! Bitte zögern Sie nicht, einen Pull Request einzureichen.

## Danksagungen

Besonderen Dank an **Haidong Ji** für die ursprüngliche Inspiration und die ersten Skripte, die zu diesem Projekt führten. Haidong ist Mitautor von drei klassischen SQL Server-Lehrbüchern und seine Einsichten waren bei der Gestaltung dieses Tools von unschätzbarem Wert.

🔗 **Mehr über Haidong Ji erfahren**: https://www.haidongji.com/about-me/

## Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert - siehe die [LICENSE](LICENSE) Datei für Details.

---

**Brauchen Sie Hilfe?** Schauen Sie sich die vollständige Dokumentation für detaillierte Anleitungen und Fehlerbehebung an.