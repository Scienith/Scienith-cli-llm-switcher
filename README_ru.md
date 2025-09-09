<div align="center">

<img src="assets/images/logo/logo.jpeg" alt="cli-llm-switcher" width="50%">

# cli-llm-switcher

*Инструмент командной строки для беспрепятственного переключения между несколькими провайдерами LLM*

[![Version](https://img.shields.io/badge/version-v0.3.0-blue.svg)](https://github.com/Scienith/Scienith-cli-llm-switcher/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

**🌍 Languages**: [English](README.md) | [中文](README_zh.md) | [日本語](README_ja.md) | [한국어](README_ko.md) | [Français](README_fr.md) | [Deutsch](README_de.md) | [Español](README_es.md) | Русский | [العربية](README_ar.md)

</div>

**Переключайтесь между DeepSeek, Qwen, Zhipu GLM, Kimi, OpenAI и Groq** одной командой при использовании Claude Code или совместимых CLI инструментов.

## 💡 💡 Почему выбрать LLM Switcher?

### 🔒 Изолированная среда конфигурации
- **Нулевое влияние на нативный Claude Code**: Ваша исходная настройка Claude остается нетронутой
- **Переключение провайдера по сеансам**: Каждая сессия терминала может использовать разных провайдеров

### 🎯 Официальные лучшие практики
- **Рекомендованные провайдерами конфигурации**: Следует официальным руководствам интеграции каждого провайдера
- **Двойная модель конфигурации Claude Code**: Основная модель для диалога/планирования/генерации кода/сложных рассуждений, быстрая модель (Claude использует Haiku, например 3.5 Haiku) для поиска файлов/проверки синтаксиса и вспомогательных задач - интеллектуально оптимизирует производительность и затраты


## 📋 Предварительные требования

Перед установкой убедитесь, что установлен Node.js (v16 или новее):

### Установка Node.js

**Вариант 1 (Рекомендуется)**: Используйте nvm для простого управления Node.js
  ```bash
  # Установить nvm: https://github.com/nvm-sh/nvm#install--update-script
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
  # Перезапустите терминал, затем установите последнюю версию Node.js
  nvm install node
  nvm use node
  ```
**Вариант 2**: Скачать с [nodejs.org](https://nodejs.org/) (выберите LTS версию)

Проверка установки:
```bash
node --version  # Должно показать v16.0.0 или выше
npm --version   # Должно показать версию npm
```

## Быстрый старт

```bash
# Глобальная установка через npm
npm install -g cli-llm-switcher

# Проверка установки
lms --version

# Настройка API ключей
lms config
# Следуйте инструкциям для ввода вашего API ключа

# Начните использовать с Claude Code или другими инструментами
lms run claude
```

## 🤖 Интеграция провайдеров

### DeepSeek

<div align="center">
<img src="https://raw.githubusercontent.com/Scienith/Scienith-cli-llm-switcher/main/assets/images/logo/deepseek_logo.png" alt="DeepSeek" width="200">
</div>

### Конфигурация моделей
- **[NEEDS TRANSLATION] Main Model**: `deepseek-chat`
- **[NEEDS TRANSLATION] Fast Model**: `deepseek-chat`

### [NEEDS TRANSLATION] Get Your API Key
- [NEEDS TRANSLATION] **Platform**: [https://platform.deepseek.com/](https://platform.deepseek.com/)

---

### AlibabaCloud (International)

<div align="center">
<img src="https://raw.githubusercontent.com/Scienith/Scienith-cli-llm-switcher/main/assets/images/logo/alibaba_cloud.png" alt="AlibabaCloud (International)" width="200">
</div>

### Конфигурация моделей
- **[NEEDS TRANSLATION] Main Model**: `qwen3-coder-plus`
- **[NEEDS TRANSLATION] Fast Model**: `qwen3-coder-flash`

### [NEEDS TRANSLATION] Get Your API Key
- [NEEDS TRANSLATION] **🌍 International**: [https://modelstudio.console.alibabacloud.com/](https://modelstudio.console.alibabacloud.com/)

---

### AlibabaCloud (China)

<div align="center">
<img src="https://raw.githubusercontent.com/Scienith/Scienith-cli-llm-switcher/main/assets/images/logo/alibaba_cloud.png" alt="AlibabaCloud (China)" width="200">
</div>

### Конфигурация моделей
- **[NEEDS TRANSLATION] Main Model**: `qwen3-coder-plus`
- **[NEEDS TRANSLATION] Fast Model**: `qwen3-coder-flash`

### [NEEDS TRANSLATION] Get Your API Key
- [NEEDS TRANSLATION] **🇨🇳 China**: [https://bailian.console.aliyun.com/](https://bailian.console.aliyun.com/)

---

### Moonshot AI

<div align="center">
<img src="https://raw.githubusercontent.com/Scienith/Scienith-cli-llm-switcher/main/assets/images/logo/moonshot_logo.png" alt="Moonshot AI" width="200">
</div>

### Конфигурация моделей
- **[NEEDS TRANSLATION] Main Model**: `K2-Instruct-0905`
- **[NEEDS TRANSLATION] Fast Model**: `K2-Instruct-0905`

### [NEEDS TRANSLATION] Get Your API Key
- [NEEDS TRANSLATION] **Platform**: [https://platform.moonshot.ai/](https://platform.moonshot.ai/)

---

### Zhipu GLM

<div align="center">
<img src="https://raw.githubusercontent.com/Scienith/Scienith-cli-llm-switcher/main/assets/images/logo/zhipu.jpg" alt="Zhipu GLM" width="200">
</div>

### Конфигурация моделей
- **[NEEDS TRANSLATION] Main Model**: `glm-4.5`
- **[NEEDS TRANSLATION] Fast Model**: `glm-4.5-air`

### Получить API ключ
- **🇨🇳 Китай**: [https://bigmodel.cn/](https://bigmodel.cn/)
- **🌍 Международный**: [https://z.ai/model-api](https://z.ai/model-api)

---



## Удаление

### Базовое удаление (сохраняет конфигурацию)

```bash
npm uninstall -g cli-llm-switcher
```

### Полное удаление (удаляет всё)

Примечание: Запустите `lms status`, чтобы увидеть путь к каталогу конфигурации перед удалением.

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