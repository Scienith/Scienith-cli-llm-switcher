<div align="center">

<img src="assets/images/logo/logo.jpeg" alt="cli-llm-switcher" width="50%">

# cli-llm-switcher

*Un outil en ligne de commande pour basculer facilement entre plusieurs fournisseurs LLM*

[![Version](https://img.shields.io/badge/version-v0.3.1-blue.svg)](https://github.com/Scienith/Scienith-cli-llm-switcher/releases)
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
- **Configuration double modèle Claude Code** : Modèle principal pour les tâches complexes, modèle rapide pour les tâches simples - optimise intelligemment les performances et les coûts


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

---

**Besoin d'aide ?** Consultez la documentation complète pour des guides détaillés et le dépannage.