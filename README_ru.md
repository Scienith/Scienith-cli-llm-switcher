<div align="center">

<img src="assets/images/logo/logo.jpeg" alt="CLI LLM Переключатель" width="50%">

# CLI LLM Переключатель

*Инструмент командной строки для беспрепятственного переключения между несколькими провайдерами LLM*

[![Version](https://img.shields.io/badge/version-v0.1.0a2-blue.svg)](https://github.com/Scienith/Scienith-cli-llm-switcher/releases)
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

## Вклад в разработку

Вклад приветствуется! Пожалуйста, не стесняйтесь отправлять Pull Request.

## Благодарности

Особая благодарность **Haidong Ji** за оригинальное вдохновение и начальные скрипты, которые привели к этому проекту. Haidong является соавтором трех классических учебников по SQL Server, и его идеи были бесценными при создании этого инструмента.

🔗 **Узнать больше о Haidong Ji**: https://www.haidongji.com/about-me/

## Лицензия

Этот проект лицензирован под лицензией MIT - см. файл [LICENSE](LICENSE) для подробностей.

---

**Нужна помощь?** Ознакомьтесь с полной документацией для подробных руководств и устранения неполадок.