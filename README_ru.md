<div align="center">

<img src="assets/images/logo/logo.jpeg" alt="CLI LLM Переключатель" width="50%">

# CLI LLM Переключатель

*Инструмент командной строки для беспрепятственного переключения между несколькими провайдерами LLM*

[![Version](https://img.shields.io/badge/version-v0.2.0-alpha.14-blue.svg)](https://github.com/Scienith/Scienith-cli-llm-switcher/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

**🌍 Languages**: [English](README.md) | [中文](README_zh.md) | [日本語](README_ja.md) | [한국어](README_ko.md) | [Français](README_fr.md) | [Deutsch](README_de.md) | [Español](README_es.md) | Русский | [العربية](README_ar.md)

</div>

**Переключайтесь между DeepSeek, Qwen, Zhipu GLM, Kimi, OpenAI и Groq** одной командой при использовании Claude Code или совместимых CLI инструментов.

## 🚀 Быстрый старт

```bash
# Клонировать и настроить
git clone https://github.com/Scienith/Scienith-cli-llm-switcher
cd cli-llm-switcher
./install.sh
source ~/.bashrc  # или source ~/.zshrc (для Zsh)

# Настроить API ключи провайдеров
lms config
# Следуйте подсказкам для ввода API ключа и выбора модели по умолчанию

# Переключиться на Zhipu GLM
lms switch zhipu

# Запустить Claude с текущим провайдером
lms run claude
```

## Основные функции

- **🔄 Поддержка нескольких провайдеров**: DeepSeek, Qwen, Zhipu GLM-4.5, Kimi
- **🌍 Кроссплатформенная совместимость**: macOS, Linux, Windows (Git Bash/Cygwin)
- **🔧 Умная интеграция с shell**: Автоопределение и интеграция bash, zsh, fish
- **⚙️ Интерактивный мастер настройки**: Безопасный ввод API ключей, выбор моделей
- **📦 Полная установка/удаление**: Установка в один клик, чистое удаление
- **🌐 Многоязычная документация**: Поддержка документации на английском и китайском языках

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

## Вклад в разработку

Вклад приветствуется! Пожалуйста, не стесняйтесь отправлять Pull Request.

## Лицензия

Этот проект лицензирован под лицензией MIT - см. файл [LICENSE](LICENSE) для подробностей.

---

**Нужна помощь?** Ознакомьтесь с полной документацией для подробных руководств и устранения неполадок.