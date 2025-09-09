<div align="center">

<img src="assets/images/logo/logo.jpeg" alt="cli-llm-switcher" width="50%">

# cli-llm-switcher

*Ein Kommandozeilen-Tool zum nahtlosen Wechseln zwischen mehreren LLM-Anbietern*

[![Version](https://img.shields.io/badge/version-v0.3.1-blue.svg)](https://github.com/Scienith/Scienith-cli-llm-switcher/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

**🌍 Languages**: [English](README.md) | [中文](README_zh.md) | [日本語](README_ja.md) | [한국어](README_ko.md) | [Français](README_fr.md) | Deutsch | [Español](README_es.md) | [Русский](README_ru.md) | [العربية](README_ar.md)

</div>

**Wechseln Sie zwischen DeepSeek, Qwen, Zhipu GLM, Kimi** mit einem einzigen Befehl bei Verwendung von Claude Code oder kompatiblen CLI-Tools.

## 💡 💡 Warum LLM Switcher wählen?

### 🔒 Isolierte Konfigurationsumgebung
- **Keine Auswirkung auf natives Claude Code**: Ihre ursprüngliche Claude-Einrichtung bleibt unverändert
- **Anbieterwechsel pro Sitzung**: Jede Terminal-Sitzung kann verschiedene Anbieter verwenden

### 🎯 Offizielle Best Practices
- **Anbieter-empfohlene Konfigurationen**: Folgt den offiziellen Integrationsrichtlinien jedes Anbieters
- **Claude Code Dual-Modell-Konfiguration**: Hauptmodell für komplexe Aufgaben, schnelles Modell für einfache Aufgaben - optimiert intelligent Leistung und Kosten


## 📋 Voraussetzungen

Stellen Sie vor der Installation sicher, dass Node.js (v16 oder höher) installiert ist:

### Node.js installieren

**Option 1 (Empfohlen)**: Verwenden Sie nvm für einfaches Node.js-Management
  ```bash
  # nvm installieren: https://github.com/nvm-sh/nvm#install--update-script
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
  # Terminal neu starten, dann neueste Node.js installieren
  nvm install node
  nvm use node
  ```
**Option 2**: Von [nodejs.org](https://nodejs.org/) herunterladen (LTS-Version wählen)

Installation überprüfen:
```bash
node --version  # Sollte v16.0.0 oder höher anzeigen
npm --version   # Sollte npm-Version anzeigen
```

## Schnellstart

```bash
# Global über npm installieren
npm install -g cli-llm-switcher

# Installation überprüfen
lms --version

# API-Schlüssel konfigurieren
lms config
# Folgen Sie den Anweisungen zur Eingabe Ihres API-Schlüssels

# Mit Claude Code oder anderen Tools beginnen
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



## Deinstallation

### Basis-Deinstallation (behält Konfiguration)

```bash
npm uninstall -g cli-llm-switcher
```

### Vollständige Deinstallation (entfernt alles)

Hinweis: Führen Sie `lms status` aus, um den Konfigurationsverzeichnispfad vor der Deinstallation zu sehen.

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