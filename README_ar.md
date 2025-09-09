<div align="center">

<img src="assets/images/logo/logo.jpeg" alt="cli-llm-switcher" width="50%">

# cli-llm-switcher

*أداة سطر أوامر للتبديل بسلاسة بين عدة مقدمي خدمة LLM*

[![Version](https://img.shields.io/badge/version-v0.3.1-blue.svg)](https://github.com/Scienith/Scienith-cli-llm-switcher/releases)
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
- **تكوين النموذج المزدوج لـ Claude Code**: النموذج الرئيسي للمحادثة/التخطيط/توليد الكود/التفكير المعقد، النموذج السريع (يستخدم Claude نموذج Haiku مثل 3.5 Haiku) للبحث في الملفات/فحص بناء الجملة والمهام المساعدة - يحسن الأداء والتكلفة بذكاء


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

## 🤖 تكامل المزودين

### DeepSeek

<div align="center">
<img src="https://raw.githubusercontent.com/Scienith/Scienith-cli-llm-switcher/main/assets/images/logo/deepseek_logo.png" alt="DeepSeek" width="200">
</div>

### تكوين النموذج
- **[NEEDS TRANSLATION] Main Model**: `deepseek-chat`
- **[NEEDS TRANSLATION] Fast Model**: `deepseek-chat`

### [NEEDS TRANSLATION] Get Your API Key
- [NEEDS TRANSLATION] **Platform**: [https://platform.deepseek.com/](https://platform.deepseek.com/)

---

### AlibabaCloud (International)

<div align="center">
<img src="https://raw.githubusercontent.com/Scienith/Scienith-cli-llm-switcher/main/assets/images/logo/alibaba_cloud.png" alt="AlibabaCloud (International)" width="200">
</div>

### تكوين النموذج
- **[NEEDS TRANSLATION] Main Model**: `qwen3-coder-plus`
- **[NEEDS TRANSLATION] Fast Model**: `qwen3-coder-flash`

### [NEEDS TRANSLATION] Get Your API Key
- [NEEDS TRANSLATION] **🌍 International**: [https://modelstudio.console.alibabacloud.com/](https://modelstudio.console.alibabacloud.com/)

---

### AlibabaCloud (China)

<div align="center">
<img src="https://raw.githubusercontent.com/Scienith/Scienith-cli-llm-switcher/main/assets/images/logo/alibaba_cloud.png" alt="AlibabaCloud (China)" width="200">
</div>

### تكوين النموذج
- **[NEEDS TRANSLATION] Main Model**: `qwen3-coder-plus`
- **[NEEDS TRANSLATION] Fast Model**: `qwen3-coder-flash`

### [NEEDS TRANSLATION] Get Your API Key
- [NEEDS TRANSLATION] **🇨🇳 China**: [https://bailian.console.aliyun.com/](https://bailian.console.aliyun.com/)

---

### Moonshot AI

<div align="center">
<img src="https://raw.githubusercontent.com/Scienith/Scienith-cli-llm-switcher/main/assets/images/logo/moonshot_logo.png" alt="Moonshot AI" width="200">
</div>

### تكوين النموذج
- **[NEEDS TRANSLATION] Main Model**: `K2-Instruct-0905`
- **[NEEDS TRANSLATION] Fast Model**: `K2-Instruct-0905`

### [NEEDS TRANSLATION] Get Your API Key
- [NEEDS TRANSLATION] **Platform**: [https://platform.moonshot.ai/](https://platform.moonshot.ai/)

---

### Zhipu GLM

<div align="center">
<img src="https://raw.githubusercontent.com/Scienith/Scienith-cli-llm-switcher/main/assets/images/logo/zhipu.jpg" alt="Zhipu GLM" width="200">
</div>

### تكوين النموذج
- **[NEEDS TRANSLATION] Main Model**: `glm-4.5`
- **[NEEDS TRANSLATION] Fast Model**: `glm-4.5-air`

### احصل على مفتاح API الخاص بك
- **🇨🇳 الصين**: [https://bigmodel.cn/](https://bigmodel.cn/)
- **🌍 دولي**: [https://z.ai/model-api](https://z.ai/model-api)

---



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