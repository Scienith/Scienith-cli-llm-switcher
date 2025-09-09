<div align="center">

<img src="assets/images/logo/logo.jpeg" alt="مبدل LLM لسطر الأوامر" width="50%">

# مبدل LLM لسطر الأوامر

*أداة سطر أوامر للتبديل بسلاسة بين عدة مقدمي خدمة LLM*

[![Version](https://img.shields.io/badge/version-v0.2.0-alpha.14-blue.svg)](https://github.com/Scienith/Scienith-cli-llm-switcher/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

**🌍 Languages**: [English](README.md) | [中文](README_zh.md) | [日本語](README_ja.md) | [한국어](README_ko.md) | [Français](README_fr.md) | [Deutsch](README_de.md) | [Español](README_es.md) | [Русский](README_ru.md) | العربية

</div>

**التبديل بين DeepSeek و Qwen و Zhipu GLM و Kimi و Claude و OpenAI و Groq** بأمر واحد عند استخدام Claude Code أو أدوات CLI المتوافقة.

## 🚀 البداية السريعة

```bash
# استنساخ وإعداد
git clone https://github.com/Scienith/Scienith-cli-llm-switcher
cd cli-llm-switcher
./install.sh
source ~/.bashrc  # أو source ~/.zshrc (لمستخدمي Zsh)

# تكوين مفاتيح API لمقدمي الخدمة
lms config
# اتبع المطالبات لإدخال مفتاح API واختيار النموذج الافتراضي

# التبديل إلى Zhipu GLM
lms switch zhipu

# تشغيل Claude بالمزود الحالي
lms run claude
```

## الميزات الأساسية

- **🔄 دعم متعدد المقدمين**: DeepSeek, Qwen, Zhipu GLM-4.5, Kimi
- **🌍 التوافق عبر المنصات**: macOS, Linux, Windows (Git Bash/Cygwin)
- **🔧 تكامل ذكي مع Shell**: الكشف والتكامل التلقائي لـ bash, zsh, fish
- **⚙️ معالج التكوين التفاعلي**: إدخال آمن لمفاتيح API، اختيار النماذج
- **📦 التثبيت/إلغاء التثبيت الكامل**: تثبيت بنقرة واحدة، إزالة نظيفة
- **🌐 الوثائق متعددة اللغات**: دعم الوثائق باللغتين الإنجليزية والصينية

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

## المساهمة

المساهمات مرحب بها! لا تتردد في إرسال Pull Request.

## الترخيص

هذا المشروع مرخص تحت رخصة MIT - انظر ملف [LICENSE](LICENSE) للتفاصيل.

---

**تحتاج مساعدة؟** تحقق من الوثائق الكاملة للحصول على أدلة مفصلة واستكشاف الأخطاء وإصلاحها.