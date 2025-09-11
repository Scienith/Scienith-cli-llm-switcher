#!/usr/bin/env npx ts-node

import { readFileSync, writeFileSync } from 'fs';
import { load, dump } from 'js-yaml';
import { join } from 'path';

interface TranslationData {
  [key: string]: any;
}

// Translation mappings for all languages
const translations = {
  ja: {
    deepseek_description: '**DeepSeek** は深層推論とコード理解に焦点を当てた先進的なAIモデルシリーズで、プログラミングタスクに優れたパフォーマンスを提供します。',
    deepseek_models_title: '利用可能なモデル',
    deepseek_models: [
      '**deepseek-chat**: 複雑な推論と迅速な応答の両方に適した汎用モデル'
    ],
    deepseek_api_title: 'APIキーを取得',
    deepseek_api_links: [
      '**プラットフォーム**: [https://platform.deepseek.com/](https://platform.deepseek.com/)'
    ],
    alibaba_int_description: '**Alibaba Cloud Qwen (International)** は優れた多言語対応とコード生成機能を備えた強力な大規模言語モデルを提供します。',
    alibaba_int_api_title: 'APIキーを取得',
    alibaba_int_api_links: [
      '**🌍 国際**: [https://modelstudio.console.alibabacloud.com/](https://modelstudio.console.alibabacloud.com/)'
    ],
    alibaba_description: '**Alibaba Cloud Qwen (China)** は優れた多言語対応とコード生成機能を備えた強力な大規模言語モデルを提供します。',
    alibaba_models_title: '利用可能なモデル',
    alibaba_models: [
      '**qwen3-coder-plus**: 高度なコード生成と分析用のメインモデル',
      '**qwen3-coder-flash**: 迅速なコード補完と構文チェック用の高速モデル'
    ],
    alibaba_api_title: 'APIキーを取得',
    alibaba_api_links: [
      '**🇨🇳 中国**: [https://bailian.console.aliyun.com/](https://bailian.console.aliyun.com/)'
    ],
    moonshot_description: '**Moonshot AI (Kimi)** は優れたコンテキスト理解と会話機能を備えたインテリジェントな言語モデルを提供します。',
    moonshot_models_title: '利用可能なモデル',
    moonshot_models: [
      '**kimi-k2-0905-preview**: 優れた指示遵守機能を備えた高度なモデル'
    ],
    moonshot_api_title: 'APIキーを取得',
    moonshot_api_links: [
      '**プラットフォーム**: [https://platform.moonshot.ai/](https://platform.moonshot.ai/)'
    ],
    grok_code_fast_1_description: '**xAI Grok Code Fast 1** はxAIの高速で効率的な言語モデルで、コーディングタスクと迅速な開発ワークフローに最適化されています。',
    grok_code_fast_1_models_title: '利用可能なモデル',
    grok_code_fast_1_models: [
      '**grok-code-fast-1**: コーディングと開発タスクに最適化された高速で効率的なモデル'
    ],
    grok_code_fast_1_api_title: 'APIキーを取得',
    grok_code_fast_1_api_links: [
      '**プラットフォーム**: [https://console.x.ai](https://console.x.ai)'
    ],
    model_config_main: '**メインモデル**',
    model_config_fast: '**高速モデル**',
    references_title: '参考文献',
    references_text: 'Claude Code統合のための公式プロバイダー設定ガイド:'
  },
  ko: {
    deepseek_description: '**DeepSeek**는 깊은 추론과 코드 이해에 초점을 맞춘 고급 AI 모델 시리즈로, 프로그래밍 작업에 탁월한 성능을 제공합니다.',
    deepseek_models_title: '사용 가능한 모델',
    deepseek_models: [
      '**deepseek-chat**: 복잡한 추론과 빠른 응답 모두에 적합한 다목적 모델'
    ],
    deepseek_api_title: 'API 키 받기',
    deepseek_api_links: [
      '**플랫폼**: [https://platform.deepseek.com/](https://platform.deepseek.com/)'
    ],
    alibaba_int_description: '**Alibaba Cloud Qwen (International)**는 뛰어난 다국어 기능과 코드 생성 기능을 갖춘 강력한 대규모 언어 모델을 제공합니다.',
    alibaba_int_api_title: 'API 키 받기',
    alibaba_int_api_links: [
      '**🌍 국제**: [https://modelstudio.console.alibabacloud.com/](https://modelstudio.console.alibabacloud.com/)'
    ],
    alibaba_description: '**Alibaba Cloud Qwen (China)**는 뛰어난 다국어 기능과 코드 생성 기능을 갖춘 강력한 대규모 언어 모델을 제공합니다.',
    alibaba_models_title: '사용 가능한 모델',
    alibaba_models: [
      '**qwen3-coder-plus**: 고급 코드 생성과 분석용 메인 모델',
      '**qwen3-coder-flash**: 빠른 코드 완성과 구문 검사용 고속 모델'
    ],
    alibaba_api_title: 'API 키 받기',
    alibaba_api_links: [
      '**🇨🇳 중국**: [https://bailian.console.aliyun.com/](https://bailian.console.aliyun.com/)'
    ],
    moonshot_description: '**Moonshot AI (Kimi)**는 뛰어난 컨텍스트 이해와 대화 기능을 갖춘 지능형 언어 모델을 제공합니다.',
    moonshot_models_title: '사용 가능한 모델',
    moonshot_models: [
      '**kimi-k2-0905-preview**: 탁월한 지시 준수 기능을 갖춘 고급 모델'
    ],
    moonshot_api_title: 'API 키 받기',
    moonshot_api_links: [
      '**플랫폼**: [https://platform.moonshot.ai/](https://platform.moonshot.ai/)'
    ],
    grok_code_fast_1_description: '**xAI Grok Code Fast 1**은 xAI의 빠르고 효율적인 언어 모델로, 코딩 작업과 빠른 개발 워크플로에 최적화되었습니다.',
    grok_code_fast_1_models_title: '사용 가능한 모델',
    grok_code_fast_1_models: [
      '**grok-code-fast-1**: 코딩과 개발 작업에 최적화된 빠르고 효율적인 모델'
    ],
    grok_code_fast_1_api_title: 'API 키 받기',
    grok_code_fast_1_api_links: [
      '**플랫폼**: [https://console.x.ai](https://console.x.ai)'
    ],
    model_config_main: '**메인 모델**',
    model_config_fast: '**고속 모델**',
    references_title: '참고 자료',
    references_text: 'Claude Code 통합을 위한 공식 제공자 구성 가이드:'
  },
  fr: {
    deepseek_description: '**DeepSeek** est une série avancée de modèles d\'IA axée sur le raisonnement profond et la compréhension du code, offrant des performances exceptionnelles pour les tâches de programmation.',
    deepseek_models_title: 'Modèles disponibles',
    deepseek_models: [
      '**deepseek-chat**: Modèle polyvalent adapté au raisonnement complexe et aux réponses rapides'
    ],
    deepseek_api_title: 'Obtenir votre clé API',
    deepseek_api_links: [
      '**Plateforme**: [https://platform.deepseek.com/](https://platform.deepseek.com/)'
    ],
    alibaba_int_description: '**Alibaba Cloud Qwen (International)** offre de puissants modèles de langage large avec d\'excellentes capacités multilingues et des fonctionnalités de génération de code.',
    alibaba_int_api_title: 'Obtenir votre clé API',
    alibaba_int_api_links: [
      '**🌍 International**: [https://modelstudio.console.alibabacloud.com/](https://modelstudio.console.alibabacloud.com/)'
    ],
    alibaba_description: '**Alibaba Cloud Qwen (China)** offre de puissants modèles de langage large avec d\'excellentes capacités multilingues et des fonctionnalités de génération de code.',
    alibaba_models_title: 'Modèles disponibles',
    alibaba_models: [
      '**qwen3-coder-plus**: Modèle principal pour génération et analyse avancée de code',
      '**qwen3-coder-flash**: Modèle rapide pour complétions de code rapides et vérification de syntaxe'
    ],
    alibaba_api_title: 'Obtenir votre clé API',
    alibaba_api_links: [
      '**🇨🇳 Chine**: [https://bailian.console.aliyun.com/](https://bailian.console.aliyun.com/)'
    ],
    moonshot_description: '**Moonshot AI (Kimi)** fournit des modèles de langage intelligents avec une forte compréhension contextuelle et des capacités conversationnelles.',
    moonshot_models_title: 'Modèles disponibles',
    moonshot_models: [
      '**kimi-k2-0905-preview**: Modèle avancé avec d\'excellentes capacités de suivi des instructions'
    ],
    moonshot_api_title: 'Obtenir votre clé API',
    moonshot_api_links: [
      '**Plateforme**: [https://platform.moonshot.ai/](https://platform.moonshot.ai/)'
    ],
    grok_code_fast_1_description: '**xAI Grok Code Fast 1** est le modèle de langage rapide et efficace de xAI, optimisé pour les tâches de codage et les workflows de développement rapides.',
    grok_code_fast_1_models_title: 'Modèles disponibles',
    grok_code_fast_1_models: [
      '**grok-code-fast-1**: Modèle rapide et efficace optimisé pour le codage et les tâches de développement'
    ],
    grok_code_fast_1_api_title: 'Obtenir votre clé API',
    grok_code_fast_1_api_links: [
      '**Plateforme**: [https://console.x.ai](https://console.x.ai)'
    ],
    model_config_main: '**Modèle principal**',
    model_config_fast: '**Modèle rapide**',
    references_title: 'Références',
    references_text: 'Guides de configuration officiels des fournisseurs pour l\'intégration Claude Code:'
  },
  de: {
    deepseek_description: '**DeepSeek** ist eine fortschrittliche KI-Modellreihe, die sich auf tiefes Denken und Codeverständnis konzentriert und außergewöhnliche Leistung für Programmieraufgaben bietet.',
    deepseek_models_title: 'Verfügbare Modelle',
    deepseek_models: [
      '**deepseek-chat**: Vielseitiges Modell für komplexes Denken und schnelle Antworten'
    ],
    deepseek_api_title: 'API-Schlüssel erhalten',
    deepseek_api_links: [
      '**Plattform**: [https://platform.deepseek.com/](https://platform.deepseek.com/)'
    ],
    alibaba_int_description: '**Alibaba Cloud Qwen (International)** bietet leistungsstarke große Sprachmodelle mit hervorragenden Mehrsprachenfähigkeiten und Codegenerierungsfunktionen.',
    alibaba_int_api_title: 'API-Schlüssel erhalten',
    alibaba_int_api_links: [
      '**🌍 International**: [https://modelstudio.console.alibabacloud.com/](https://modelstudio.console.alibabacloud.com/)'
    ],
    alibaba_description: '**Alibaba Cloud Qwen (China)** bietet leistungsstarke große Sprachmodelle mit hervorragenden Mehrsprachenfähigkeiten und Codegenerierungsfunktionen.',
    alibaba_models_title: 'Verfügbare Modelle',
    alibaba_models: [
      '**qwen3-coder-plus**: Hauptmodell für erweiterte Codegenerierung und -analyse',
      '**qwen3-coder-flash**: Schnelles Modell für schnelle Codevervollständigungen und Syntaxprüfungen'
    ],
    alibaba_api_title: 'API-Schlüssel erhalten',
    alibaba_api_links: [
      '**🇨🇳 China**: [https://bailian.console.aliyun.com/](https://bailian.console.aliyun.com/)'
    ],
    moonshot_description: '**Moonshot AI (Kimi)** bietet intelligente Sprachmodelle mit starkem Kontextverständnis und Konversationsfähigkeiten.',
    moonshot_models_title: 'Verfügbare Modelle',
    moonshot_models: [
      '**kimi-k2-0905-preview**: Fortgeschrittenes Modell mit hervorragenden Anweisungsfolgefähigkeiten'
    ],
    moonshot_api_title: 'API-Schlüssel erhalten',
    moonshot_api_links: [
      '**Plattform**: [https://platform.moonshot.ai/](https://platform.moonshot.ai/)'
    ],
    grok_code_fast_1_description: '**xAI Grok Code Fast 1** ist xAI\'s schnelles und effizientes Sprachmodell, optimiert für Codierungsaufgaben und schnelle Entwicklungsworkflows.',
    grok_code_fast_1_models_title: 'Verfügbare Modelle',
    grok_code_fast_1_models: [
      '**grok-code-fast-1**: Schnelles und effizientes Modell, optimiert für Codierung und Entwicklungsaufgaben'
    ],
    grok_code_fast_1_api_title: 'API-Schlüssel erhalten',
    grok_code_fast_1_api_links: [
      '**Plattform**: [https://console.x.ai](https://console.x.ai)'
    ],
    model_config_main: '**Hauptmodell**',
    model_config_fast: '**Schnelles Modell**',
    references_title: 'Referenzen',
    references_text: 'Offizielle Anbieterkonfigurationshandbücher für Claude Code Integration:'
  },
  es: {
    deepseek_description: '**DeepSeek** es una serie avanzada de modelos de IA enfocada en el razonamiento profundo y la comprensión del código, proporcionando un rendimiento excepcional para tareas de programación.',
    deepseek_models_title: 'Modelos disponibles',
    deepseek_models: [
      '**deepseek-chat**: Modelo versátil para razonamiento complejo y respuestas rápidas'
    ],
    deepseek_api_title: 'Obtener tu clave API',
    deepseek_api_links: [
      '**Plataforma**: [https://platform.deepseek.com/](https://platform.deepseek.com/)'
    ],
    alibaba_int_description: '**Alibaba Cloud Qwen (International)** ofrece potentes modelos de lenguaje grande con excelentes capacidades multilingües y funciones de generación de código.',
    alibaba_int_api_title: 'Obtener tu clave API',
    alibaba_int_api_links: [
      '**🌍 Internacional**: [https://modelstudio.console.alibabacloud.com/](https://modelstudio.console.alibabacloud.com/)'
    ],
    alibaba_description: '**Alibaba Cloud Qwen (China)** ofrece potentes modelos de lenguaje grande con excelentes capacidades multilingües y funciones de generación de código.',
    alibaba_models_title: 'Modelos disponibles',
    alibaba_models: [
      '**qwen3-coder-plus**: Modelo principal para generación y análisis avanzado de código',
      '**qwen3-coder-flash**: Modelo rápido para completaciones rápidas de código y verificación de sintaxis'
    ],
    alibaba_api_title: 'Obtener tu clave API',
    alibaba_api_links: [
      '**🇨🇳 China**: [https://bailian.console.aliyun.com/](https://bailian.console.aliyun.com/)'
    ],
    moonshot_description: '**Moonshot AI (Kimi)** proporciona modelos de lenguaje inteligentes con fuerte comprensión contextual y capacidades conversacionales.',
    moonshot_models_title: 'Modelos disponibles',
    moonshot_models: [
      '**kimi-k2-0905-preview**: Modelo avanzado con excelentes capacidades de seguimiento de instrucciones'
    ],
    moonshot_api_title: 'Obtener tu clave API',
    moonshot_api_links: [
      '**Plataforma**: [https://platform.moonshot.ai/](https://platform.moonshot.ai/)'
    ],
    grok_code_fast_1_description: '**xAI Grok Code Fast 1** es el modelo de lenguaje rápido y eficiente de xAI, optimizado para tareas de codificación y workflows de desarrollo rápidos.',
    grok_code_fast_1_models_title: 'Modelos disponibles',
    grok_code_fast_1_models: [
      '**grok-code-fast-1**: Modelo rápido y eficiente optimizado para tareas de codificación y desarrollo'
    ],
    grok_code_fast_1_api_title: 'Obtener tu clave API',
    grok_code_fast_1_api_links: [
      '**Plataforma**: [https://console.x.ai](https://console.x.ai)'
    ],
    model_config_main: '**Modelo principal**',
    model_config_fast: '**Modelo rápido**',
    references_title: 'Referencias',
    references_text: 'Guías oficiales de configuración de proveedores para integración de Claude Code:'
  },
  ru: {
    deepseek_description: '**DeepSeek** — это продвинутая серия моделей ИИ, ориентированная на глубокий анализ и понимание кода, предоставляющая исключительную производительность для задач программирования.',
    deepseek_models_title: 'Доступные модели',
    deepseek_models: [
      '**deepseek-chat**: Универсальная модель для сложного рассуждения и быстрого реагирования'
    ],
    deepseek_api_title: 'Получить ключ API',
    deepseek_api_links: [
      '**Платформа**: [https://platform.deepseek.com/](https://platform.deepseek.com/)'
    ],
    alibaba_int_description: '**Alibaba Cloud Qwen (International)** предлагает мощные большие языковые модели с превосходными многоязычными возможностями и функциями генерации кода.',
    alibaba_int_api_title: 'Получить ключ API',
    alibaba_int_api_links: [
      '**🌍 Международный**: [https://modelstudio.console.alibabacloud.com/](https://modelstudio.console.alibabacloud.com/)'
    ],
    alibaba_description: '**Alibaba Cloud Qwen (China)** предлагает мощные большие языковые модели с превосходными многоязычными возможностями и функциями генерации кода.',
    alibaba_models_title: 'Доступные модели',
    alibaba_models: [
      '**qwen3-coder-plus**: Основная модель для продвинутой генерации и анализа кода',
      '**qwen3-coder-flash**: Быстрая модель для быстрого завершения кода и проверки синтаксиса'
    ],
    alibaba_api_title: 'Получить ключ API',
    alibaba_api_links: [
      '**🇨🇳 Китай**: [https://bailian.console.aliyun.com/](https://bailian.console.aliyun.com/)'
    ],
    moonshot_description: '**Moonshot AI (Kimi)** предоставляет интеллектуальные языковые модели с сильным пониманием контекста и разговорными способностями.',
    moonshot_models_title: 'Доступные модели',
    moonshot_models: [
      '**kimi-k2-0905-preview**: Продвинутая модель с отличными возможностями следования инструкциям'
    ],
    moonshot_api_title: 'Получить ключ API',
    moonshot_api_links: [
      '**Платформа**: [https://platform.moonshot.ai/](https://platform.moonshot.ai/)'
    ],
    grok_code_fast_1_description: '**xAI Grok Code Fast 1** — это быстрый и эффективный языковой модель xAI, оптимизированный для задач кодирования и быстрого рабочего процесса разработки.',
    grok_code_fast_1_models_title: 'Доступные модели',
    grok_code_fast_1_models: [
      '**grok-code-fast-1**: Быстрый и эффективный модель, оптимизированный для задач кодирования и разработки'
    ],
    grok_code_fast_1_api_title: 'Получить ключ API',
    grok_code_fast_1_api_links: [
      '**Платформа**: [https://console.x.ai](https://console.x.ai)'
    ],
    model_config_main: '**Основная модель**',
    model_config_fast: '**Быстрая модель**',
    references_title: 'Ссылки',
    references_text: 'Официальные руководства по конфигурации провайдеров для интеграции Claude Code:'
  },
  ar: {
    deepseek_description: '**DeepSeek** هي سلسلة متقدمة من نماذج الذكاء الاصطناعي تركز على التفكير العميق والفهم البرمجي، توفر أداءً استثنائياً لمهام البرمجة.',
    deepseek_models_title: 'النماذج المتاحة',
    deepseek_models: [
      '**deepseek-chat**: نموذج متعدد الاستخدامات للتفكير المعقد والاستجابات السريعة'
    ],
    deepseek_api_title: 'احصل على مفتاح API الخاص بك',
    deepseek_api_links: [
      '**المنصة**: [https://platform.deepseek.com/](https://platform.deepseek.com/)'
    ],
    alibaba_int_description: '**Alibaba Cloud Qwen (International)** يقدم نماذج لغوية كبيرة قوية مع إمكانيات متعددة اللغات ممتازة وميزات إنشاء الكود.',
    alibaba_int_api_title: 'احصل على مفتاح API الخاص بك',
    alibaba_int_api_links: [
      '**🌍 دولي**: [https://modelstudio.console.alibabacloud.com/](https://modelstudio.console.alibabacloud.com/)'
    ],
    alibaba_description: '**Alibaba Cloud Qwen (China)** يقدم نماذج لغوية كبيرة قوية مع إمكانيات متعددة اللغات ممتازة وميزات إنشاء الكود.',
    alibaba_models_title: 'النماذج المتاحة',
    alibaba_models: [
      '**qwen3-coder-plus**: النموذج الرئيسي لإنشاء وتحليل الكود المتقدم',
      '**qwen3-coder-flash**: نموذج سريع لإكمال الكود السريع وفحص البناء اللغوي'
    ],
    alibaba_api_title: 'احصل على مفتاح API الخاص بك',
    alibaba_api_links: [
      '**🇨🇳 الصين**: [https://bailian.console.aliyun.com/](https://bailian.console.aliyun.com/)'
    ],
    moonshot_description: '**Moonshot AI (Kimi)** يوفر نماذج لغوية ذكية مع فهم قوي للسياق ومهارات محادثة.',
    moonshot_models_title: 'النماذج المتاحة',
    moonshot_models: [
      '**kimi-k2-0905-preview**: نموذج متقدم مع مهارات ممتازة لمتابعة التعليمات'
    ],
    moonshot_api_title: 'احصل على مفتاح API الخاص بك',
    moonshot_api_links: [
      '**المنصة**: [https://platform.moonshot.ai/](https://platform.moonshot.ai/)'
    ],
    grok_code_fast_1_description: '**xAI Grok Code Fast 1** هو نموذج لغوي سريع وفعال من xAI، محسن لمهام البرمجة وسير عمل التطوير السريع.',
    grok_code_fast_1_models_title: 'النماذج المتاحة',
    grok_code_fast_1_models: [
      '**grok-code-fast-1**: نموذج سريع وفعال محسن لمهام البرمجة والتطوير'
    ],
    grok_code_fast_1_api_title: 'احصل على مفتاح API الخاص بك',
    grok_code_fast_1_api_links: [
      '**المنصة**: [https://console.x.ai](https://console.x.ai)'
    ],
    model_config_main: '**النموذج الرئيسي**',
    model_config_fast: '**النموذج السريع**',
    references_title: 'المراجع',
    references_text: 'دليل تكوين مزود رسمي لدمج Claude Code:'
  }
};

// Function to load YAML file
function loadYamlFile(filePath: string): TranslationData {
  try {
    const content = readFileSync(filePath, 'utf8');
    return load(content) as TranslationData;
  } catch (error) {
    console.error(`Error loading ${filePath}:`, error);
    return {};
  }
}

// Function to save YAML file
function saveYamlFile(filePath: string, data: TranslationData): void {
  try {
    const content = dump(data, { indent: 2 });
    writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated ${filePath}`);
  } catch (error) {
    console.error(`Error saving ${filePath}:`, error);
  }
}

// Main function to translate all files
function translateAllFiles(): void {
  const languages = Object.keys(translations);
  const i18nDir = join(__dirname, '..', 'docs', '_data', 'i18n');

  for (const lang of languages) {
    const filePath = join(i18nDir, `${lang}.yml`);
    console.log(`\n📝 Processing ${lang}.yml...`);

    const data = loadYamlFile(filePath);
    if (!data || !data.home) {
      console.log(`❌ Could not load data for ${lang}.yml`);
      continue;
    }

    const langTranslations = translations[lang as keyof typeof translations];

    // Update provider descriptions
    for (const [key, value] of Object.entries(langTranslations)) {
      if (key.startsWith('deepseek_') || key.startsWith('alibaba_') ||
          key.startsWith('moonshot_') || key.startsWith('grok_') ||
          key === 'model_config_main' || key === 'model_config_fast' ||
          key === 'references_title' || key === 'references_text') {
        data.home[key] = value;
      }
    }

    // Remove [NEEDS TRANSLATION] markers from the content
    const stringified = JSON.stringify(data);
    const cleaned = stringified.replace(/\[NEEDS TRANSLATION\]/g, '');
    const cleanedData = JSON.parse(cleaned);

    saveYamlFile(filePath, cleanedData);
  }

  console.log('\n🎉 Translation completed for all languages!');
}

if (require.main === module) {
  translateAllFiles();
}