<div align="center">

<img src="assets/images/logo/logo.jpeg" alt="Commutateur CLI LLM" width="50%">

# Commutateur CLI LLM

*Un outil en ligne de commande pour basculer facilement entre plusieurs fournisseurs LLM*

[![Version](https://img.shields.io/badge/version-v0.1.0a2-blue.svg)](https://github.com/Scienith/Scienith-cli-llm-switcher/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

**🌍 Languages**: [English](README.md) | [中文](README_zh.md) | [日本語](README_ja.md) | [한국어](README_ko.md) | Français | [Deutsch](README_de.md) | [Español](README_es.md) | [Русский](README_ru.md) | [العربية](README_ar.md)

</div>

**Basculez entre DeepSeek, Qwen, Zhipu GLM, Kimi** d'une seule commande avec Claude Code ou des outils CLI compatibles.

## 🚀 Démarrage rapide

```bash
# Cloner et configurer
git clone https://github.com/Scienith/Scienith-cli-llm-switcher
cd cli-llm-switcher
./install.sh
source ~/.bashrc  # ou source ~/.zshrc (pour Zsh)

# Configurer les clés API des fournisseurs
lms config
# Suivez les invites pour entrer la clé API et sélectionner le modèle par défaut

# Basculer vers Zhipu GLM
lms switch zhipu

# Exécuter Claude avec le fournisseur actuel
lms run claude
```

## Fonctionnalités principales

- **🔄 Support multi-fournisseur**: DeepSeek, Qwen, Zhipu GLM-4.5, Kimi
- **🌍 Compatible multiplateforme**: macOS, Linux, Windows (Git Bash/Cygwin)
- **🔧 Intégration shell intelligente**: Détection et intégration automatiques bash, zsh, fish
- **⚙️ Assistant de configuration interactif**: Saisie sécurisée des clés API, sélection de modèles
- **📦 Installation/désinstallation complète**: Installation en un clic, suppression propre
- **🌐 Documentation multilingue**: Support de documentation en anglais et chinois

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

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à soumettre une Pull Request.

## Remerciements

Remerciements particuliers à **Haidong Ji** pour l'inspiration originale et les scripts initiaux qui ont mené à ce projet. Haidong est co-auteur de trois manuels classiques SQL Server et ses idées ont été inestimables pour façonner cet outil.

🔗 **En savoir plus sur Haidong Ji**: https://www.haidongji.com/about-me/

## Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

**Besoin d'aide ?** Consultez la documentation complète pour des guides détaillés et le dépannage.