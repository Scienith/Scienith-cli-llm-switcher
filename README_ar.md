<div align="center">

<img src="assets/images/logo/logo.jpeg" alt="cli-llm-switcher" width="50%">

# cli-llm-switcher

*أداة سطر أوامر للتبديل بسلاسة بين عدة مقدمي خدمة LLM*

[![Version](https://img.shields.io/badge/version-v0.2.0-blue.svg)](https://github.com/Scienith/Scienith-cli-llm-switcher/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

**🌍 Languages**: [English](README.md) | [中文](README_zh.md) | [日本語](README_ja.md) | [한국어](README_ko.md) | [Français](README_fr.md) | [Deutsch](README_de.md) | [Español](README_es.md) | [Русский](README_ru.md) | العربية

</div>

**التبديل بين DeepSeek و Qwen و Zhipu GLM و Kimi و Claude و OpenAI و Groq** بأمر واحد عند استخدام Claude Code أو أدوات CLI المتوافقة.

## 💡 💡 لماذا تختار LLM Switcher؟

### 🔒 بيئة تكوين معزولة
- **بدون تأثير على Claude Code الأصلي**: يبقى إعداد Claude الأصلي الخاص بك كما هو
- **تبديل المزود حسب الجلسة**: يمكن لكل جلسة طرفية استخدام مزودين مختلفين

### 🎯 أفضل الممارسات الرسمية
- **التكوينات الموصى بها من المزودين**: يتبع إرشادات التكامل الرسمية لكل مزود
- **تكوين النموذج المزدوج لـ Claude Code**: النموذج الرئيسي للمهام المعقدة، النموذج السريع للمهام البسيطة - يحسن الأداء والتكلفة بذكاء


## 📋 المتطلبات الأساسية

قبل التثبيت، تأكد من تثبيت Node.js (الإصدار 16 أو أحدث):

### تثبيت Node.js

**الخيار 1 (موصى به)**: استخدم nvm لإدارة Node.js بسهولة
  ```bash
  # تثبيت nvm: https://github.com/nvm-sh/nvm#install--update-script
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
  # أعد تشغيل الطرفية، ثم قم بتثبيت أحدث إصدار من Node.js
  nvm install node
  nvm use node
  ```
**الخيار 2**: التنزيل من [nodejs.org](https://nodejs.org/) (اختر إصدار LTS)

التحقق من التثبيت:
```bash
node --version  # يجب أن يعرض v16.0.0 أو أعلى
npm --version   # يجب أن يعرض إصدار npm
```

## البداية السريعة

```bash
# التثبيت عالمياً عبر npm
npm install -g cli-llm-switcher

# التحقق من التثبيت
lms --version

# تكوين مفاتيح API
lms config
# اتبع المطالبات لإدخال مفتاح API الخاص بك

# ابدأ الاستخدام مع Claude Code أو أدوات أخرى
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



## إلغاء التثبيت

### إلغاء التثبيت الأساسي (يحتفظ بالتكوين)

```bash
npm uninstall -g cli-llm-switcher
```

### إلغاء التثبيت الكامل (يزيل كل شيء)

ملاحظة: قم بتشغيل `lms status` لرؤية مسار دليل التكوين قبل إلغاء التثبيت.

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