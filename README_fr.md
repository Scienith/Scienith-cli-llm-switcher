<div align="center">

<img src="assets/images/logo/logo.jpeg" alt="cli-llm-switcher" width="50%">

# cli-llm-switcher

*Un outil en ligne de commande pour basculer facilement entre plusieurs fournisseurs LLM*

[![Version](https://img.shields.io/badge/version-v0.3.4-blue.svg)](https://github.com/Scienith/cli-llm-switcher/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

**🌍 Languages**: [English](README.md) | [中文](README_zh.md) | [日本語](README_ja.md) | [한국어](README_ko.md) | Français | [Deutsch](README_de.md) | [Español](README_es.md) | [Русский](README_ru.md) | [العربية](README_ar.md)

</div>

**Basculez entre DeepSeek, Qwen, Zhipu GLM, Kimi** d'une seule commande avec Claude Code ou des outils CLI compatibles.

## 💡 💡 Pourquoi choisir LLM Switcher ?

### 🔒 Environnement de configuration isolé
- **Aucun impact sur Claude Code natif** : Votre configuration Claude d'origine reste intacte
- **Changement de fournisseur par session** : Chaque session de terminal peut utiliser différents fournisseurs

### 🎯 Meilleures pratiques officielles
- **Configurations recommandées par les fournisseurs** : Suit les directives d'intégration officielles de chaque fournisseur
- **Configuration double modèle Claude Code** : Modèle principal pour conversation/planification/génération de code/raisonnement complexe, modèle rapide (Claude utilise Haiku ex. 3.5 Haiku) pour recherche de fichiers/vérification syntaxique et tâches auxiliaires - optimise intelligemment les performances et les coûts


## 📋 Prérequis

Avant l'installation, assurez-vous que Node.js (v16 ou version ultérieure) est installé :

### Installer Node.js

**Option 1 (Recommandée)** : Utiliser nvm pour gérer facilement Node.js
  ```bash
  # Installer nvm : https://github.com/nvm-sh/nvm#install--update-script
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
  # Redémarrer le terminal, puis installer la dernière version de Node.js
  nvm install node
  nvm use node
  ```
**Option 2** : Télécharger depuis [nodejs.org](https://nodejs.org/) (choisir la version LTS)

Vérifier l'installation :
```bash
node --version  # Devrait afficher v16.0.0 ou plus
npm --version   # Devrait afficher la version npm
```

## Démarrage rapide

```bash
# Installation globale via npm
npm install -g cli-llm-switcher

# Vérifier l'installation
lms --version

# Configurer les clés API
lms config
# Suivez les invites pour entrer votre clé API

# Commencer à utiliser avec Claude Code ou d'autres outils
lms run claude
```

## 🤖 Intégration des fournisseurs

### DeepSeek

<div align="center">
<img src="https://raw.githubusercontent.com/Scienith/cli-llm-switcher/main/assets/images/logo/deepseek_logo.png" alt="DeepSeek" width="200">
</div>

### Configuration des modèles
- **Modèle principal**: `deepseek-chat`
- **Modèle rapide**: `deepseek-chat`

### Obtenir votre clé API
- **Plateforme**: [https://platform.deepseek.com/](https://platform.deepseek.com/)

---

### AlibabaCloud (International)

<div align="center">
<img src="https://raw.githubusercontent.com/Scienith/cli-llm-switcher/main/assets/images/logo/alibaba_cloud.png" alt="AlibabaCloud (International)" width="200">
</div>

### Configuration des modèles
- **Modèle principal**: `qwen3-coder-plus`
- **Modèle rapide**: `qwen3-coder-flash`

### Obtenir votre clé API
- **🌍 International**: [https://modelstudio.console.alibabacloud.com/](https://modelstudio.console.alibabacloud.com/)

---

### AlibabaCloud (China)

<div align="center">
<img src="https://raw.githubusercontent.com/Scienith/cli-llm-switcher/main/assets/images/logo/alibaba_cloud.png" alt="AlibabaCloud (China)" width="200">
</div>

### Configuration des modèles
- **Modèle principal**: `qwen3-coder-plus`
- **Modèle rapide**: `qwen3-coder-flash`

### Obtenir votre clé API
- **🇨🇳 Chine**: [https://bailian.console.aliyun.com/](https://bailian.console.aliyun.com/)

---

### Moonshot AI

<div align="center">
<img src="https://raw.githubusercontent.com/Scienith/cli-llm-switcher/main/assets/images/logo/moonshot_logo.png" alt="Moonshot AI" width="200">
</div>

### Configuration des modèles
- **Modèle principal**: `kimi-k2-0905-preview`
- **Modèle rapide**: `kimi-k2-0905-preview`

### Obtenir votre clé API
- **Plateforme**: [https://platform.moonshot.ai/](https://platform.moonshot.ai/)

---

### Zhipu GLM

<div align="center">
<img src="https://raw.githubusercontent.com/Scienith/cli-llm-switcher/main/assets/images/logo/zhipu.jpg" alt="Zhipu GLM" width="200">
</div>

### Configuration des modèles
- **Modèle principal**: `glm-4.5`
- **Modèle rapide**: `glm-4.5-air`

### Obtenir votre clé API
- **🇨🇳 Chine** : [https://bigmodel.cn/](https://bigmodel.cn/)
- **🌍 International** : [https://z.ai/model-api](https://z.ai/model-api)

---

### Grok Code Fast 1

<div align="center">
<img src="https://raw.githubusercontent.com/Scienith/cli-llm-switcher/main/assets/images/logo/grok_logo.png" alt="Grok Code Fast 1" width="200">
</div>

### Configuration des modèles
- **Modèle principal**: `grok-code-fast-1`
- **Modèle rapide**: `grok-code-fast-1`

###  Get Your API Key
-  **Platform**: [https://console.x.ai](https://console.x.ai)

---



## Désinstallation

### Désinstallation de base (conserve la configuration)

```bash
npm uninstall -g cli-llm-switcher
```

### Désinstallation complète (supprime tout)

Note : Exécutez `lms status` pour voir le chemin du répertoire de configuration avant la désinstallation.

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

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à soumettre une Pull Request.

## Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## Références

Guides de configuration officiels des fournisseurs pour l'intégration Claude Code:

- [DeepSeek Anthropic API Guide](https://api-docs.deepseek.com/guides/anthropic_api)
- [Alibaba Cloud Model Studio - Claude Code Integration](https://help.aliyun.com/zh/model-studio/claude-code)
- [Zhipu GLM - Claude Development Guide](https://docs.bigmodel.cn/cn/guide/develop/claude)

---

**Besoin d'aide ?** Consultez la documentation complète pour des guides détaillés et le dépannage.