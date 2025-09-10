<div align="center">

<img src="assets/images/logo/logo.jpeg" alt="cli-llm-switcher" width="50%">

# cli-llm-switcher

*Ein Kommandozeilen-Tool zum nahtlosen Wechseln zwischen mehreren LLM-Anbietern*

[![Version](https://img.shields.io/badge/version-v0.3.4-blue.svg)](https://github.com/Scienith/cli-llm-switcher/releases)
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
- **Claude Code Dual-Modell-Konfiguration**: Hauptmodell für Konversation/Planung/Code-Generierung/komplexes Schlussfolgern, schnelles Modell (Claude nutzt Haiku z.B. 3.5 Haiku) für Dateisuche/Syntaxprüfung und Hilfsaufgaben - optimiert intelligent Leistung und Kosten


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

## 🤖 Anbieter-Integration

### DeepSeek

<div align="center">
<img src="https://raw.githubusercontent.com/Scienith/cli-llm-switcher/main/assets/images/logo/deepseek_logo.png" alt="DeepSeek" width="200">
</div>

### Modellkonfiguration
- **[NEEDS TRANSLATION] Main Model**: `deepseek-chat`
- **[NEEDS TRANSLATION] Fast Model**: `deepseek-chat`

### [NEEDS TRANSLATION] Get Your API Key
- [NEEDS TRANSLATION] **Platform**: [https://platform.deepseek.com/](https://platform.deepseek.com/)

---

### AlibabaCloud (International)

<div align="center">
<img src="https://raw.githubusercontent.com/Scienith/cli-llm-switcher/main/assets/images/logo/alibaba_cloud.png" alt="AlibabaCloud (International)" width="200">
</div>

### Modellkonfiguration
- **[NEEDS TRANSLATION] Main Model**: `qwen3-coder-plus`
- **[NEEDS TRANSLATION] Fast Model**: `qwen3-coder-flash`

### [NEEDS TRANSLATION] Get Your API Key
- [NEEDS TRANSLATION] **🌍 International**: [https://modelstudio.console.alibabacloud.com/](https://modelstudio.console.alibabacloud.com/)

---

### AlibabaCloud (China)

<div align="center">
<img src="https://raw.githubusercontent.com/Scienith/cli-llm-switcher/main/assets/images/logo/alibaba_cloud.png" alt="AlibabaCloud (China)" width="200">
</div>

### Modellkonfiguration
- **[NEEDS TRANSLATION] Main Model**: `qwen3-coder-plus`
- **[NEEDS TRANSLATION] Fast Model**: `qwen3-coder-flash`

### [NEEDS TRANSLATION] Get Your API Key
- [NEEDS TRANSLATION] **🇨🇳 China**: [https://bailian.console.aliyun.com/](https://bailian.console.aliyun.com/)

---

### Moonshot AI

<div align="center">
<img src="https://raw.githubusercontent.com/Scienith/cli-llm-switcher/main/assets/images/logo/moonshot_logo.png" alt="Moonshot AI" width="200">
</div>

### Modellkonfiguration
- **[NEEDS TRANSLATION] Main Model**: `kimi-k2-0905-preview`
- **[NEEDS TRANSLATION] Fast Model**: `kimi-k2-0905-preview`

### [NEEDS TRANSLATION] Get Your API Key
- [NEEDS TRANSLATION] **Platform**: [https://platform.moonshot.ai/](https://platform.moonshot.ai/)

---

### Zhipu GLM

<div align="center">
<img src="https://raw.githubusercontent.com/Scienith/cli-llm-switcher/main/assets/images/logo/zhipu.jpg" alt="Zhipu GLM" width="200">
</div>

### Modellkonfiguration
- **[NEEDS TRANSLATION] Main Model**: `glm-4.5`
- **[NEEDS TRANSLATION] Fast Model**: `glm-4.5-air`

### API-Schlüssel erhalten
- **🇨🇳 China**: [https://bigmodel.cn/](https://bigmodel.cn/)
- **🌍 International**: [https://z.ai/model-api](https://z.ai/model-api)

---



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

## [NEEDS TRANSLATION] References

[NEEDS TRANSLATION] Official provider configuration guides for Claude Code integration:

- [DeepSeek Anthropic API Guide](https://api-docs.deepseek.com/guides/anthropic_api)
- [Alibaba Cloud Model Studio - Claude Code Integration](https://help.aliyun.com/zh/model-studio/claude-code)
- [Zhipu GLM - Claude Development Guide](https://docs.bigmodel.cn/cn/guide/develop/claude)

---

**Brauchen Sie Hilfe?** Schauen Sie sich die vollständige Dokumentation für detaillierte Anleitungen und Fehlerbehebung an.