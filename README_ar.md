<div align="center">

<img src="assets/images/logo/logo.jpeg" alt="مبدل LLM لسطر الأوامر" width="50%">

# مبدل LLM لسطر الأوامر

*أداة سطر أوامر للتبديل بسلاسة بين عدة مقدمي خدمة LLM*

[![Version](https://img.shields.io/badge/version-v0.1.0a1-blue.svg)](https://github.com/Scienith/Scienith-cli-llm-switcher/releases)
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

- **🔄 دعم متعدد المقدمين**: DeepSeek, Qwen, Zhipu GLM-4.5, Kimi, Claude, OpenAI, Groq
- **🌍 التوافق عبر المنصات**: macOS, Linux, Windows (Git Bash/Cygwin)
- **🔧 تكامل ذكي مع Shell**: الكشف والتكامل التلقائي لـ bash, zsh, fish
- **⚙️ معالج التكوين التفاعلي**: إدخال آمن لمفاتيح API، اختيار النماذج
- **📦 التثبيت/إلغاء التثبيت الكامل**: تثبيت بنقرة واحدة، إزالة نظيفة
- **🌐 الوثائق متعددة اللغات**: دعم الوثائق باللغتين الإنجليزية والصينية

## المساهمة

المساهمات مرحب بها! لا تتردد في إرسال Pull Request.

## الشكر والتقدير

شكر خاص لـ **Haidong Ji** على الإلهام الأصلي والنصوص البرمجية الأولية التي أدت إلى هذا المشروع. Haidong هو مؤلف مشارك لثلاثة كتب كلاسيكية حول SQL Server ورؤاه كانت لا تقدر بثمن في تشكيل هذه الأداة.

🔗 **تعرف على المزيد حول Haidong Ji**: https://www.haidongji.com/about-me/

## الترخيص

هذا المشروع مرخص تحت رخصة MIT - انظر ملف [LICENSE](LICENSE) للتفاصيل.

---

**تحتاج مساعدة؟** تحقق من الوثائق الكاملة للحصول على أدلة مفصلة واستكشاف الأخطاء وإصلاحها.