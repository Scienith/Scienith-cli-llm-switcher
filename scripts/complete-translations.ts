#!/usr/bin/env node

/**
 * Complete missing translations in i18n files
 */

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

const I18N_DIR = path.join(__dirname, '../docs/_data/i18n');

interface UsageTranslations {
  [lang: string]: string[];
}

// Complete usage examples translations
const usageExamples: UsageTranslations = {
  ja: [
    "プロバイダーに切り替え",
    "ショートカットを使用",
    "現在のプロバイダーを表示",
    "すべてのプロバイダーをリスト",
    "利用可能なモデルを表示",
    "すべてのモデルを表示",
    "特定のプロバイダーのモデルを表示",
    "APIキーを設定",
    "すべて設定",
    "特定のプロバイダーを設定"
  ],
  ko: [
    "공급자로 전환",
    "바로가기 사용",
    "현재 공급자 표시",
    "모든 공급자 나열",
    "사용 가능한 모델 표시",
    "모든 모델 표시",
    "특정 공급자의 모델 표시",
    "API 키 구성",
    "모두 구성",
    "특정 공급자 구성"
  ],
  fr: [
    "Basculer vers un fournisseur",
    "Utiliser les raccourcis",
    "Afficher le fournisseur actuel",
    "Lister tous les fournisseurs",
    "Afficher les modèles disponibles",
    "Afficher tous les modèles",
    "Afficher les modèles d'un fournisseur spécifique",
    "Configurer les clés API",
    "Tout configurer",
    "Configurer un fournisseur spécifique"
  ],
  de: [
    "Zu einem Anbieter wechseln",
    "Verknüpfungen verwenden",
    "Aktuellen Anbieter anzeigen",
    "Alle Anbieter auflisten",
    "Verfügbare Modelle anzeigen",
    "Alle Modelle anzeigen",
    "Modelle eines bestimmten Anbieters anzeigen",
    "API-Schlüssel konfigurieren",
    "Alles konfigurieren",
    "Bestimmten Anbieter konfigurieren"
  ],
  es: [
    "Cambiar a un proveedor",
    "Usar atajos",
    "Mostrar proveedor actual",
    "Listar todos los proveedores",
    "Mostrar modelos disponibles",
    "Mostrar todos los modelos",
    "Mostrar modelos de un proveedor específico",
    "Configurar claves API",
    "Configurar todo",
    "Configurar proveedor específico"
  ],
  ru: [
    "Переключиться на провайдера",
    "Использовать ярлыки",
    "Показать текущего провайдера",
    "Список всех провайдеров",
    "Показать доступные модели",
    "Показать все модели",
    "Показать модели конкретного провайдера",
    "Настроить API ключи",
    "Настроить всё",
    "Настроить конкретного провайдера"
  ],
  ar: [
    "التبديل إلى مزود",
    "استخدام الاختصارات",
    "عرض المزود الحالي",
    "سرد جميع المزودين",
    "عرض النماذج المتاحة",
    "عرض جميع النماذج",
    "عرض نماذج مزود محدد",
    "تكوين مفاتيح API",
    "تكوين الكل",
    "تكوين مزود محدد"
  ]
};

// Additional missing translations
const additionalTranslations: {[lang: string]: any} = {
  ja: {
    uninstallation_commands: {
      basic: "npm uninstall -g cli-llm-switcher",
      macos_linux: [
        "npm uninstall -g cli-llm-switcher",
        "rm -rf ~/.llm-switch"
      ],
      windows_ps: [
        "npm uninstall -g cli-llm-switcher",
        "Remove-Item -Recurse -Force \"$env:USERPROFILE\\.llm-switch\""
      ],
      windows_cmd: [
        "npm uninstall -g cli-llm-switcher",
        "rmdir /s /q \"%USERPROFILE%\\.llm-switch\""
      ]
    }
  },
  ko: {
    uninstallation_commands: {
      basic: "npm uninstall -g cli-llm-switcher",
      macos_linux: [
        "npm uninstall -g cli-llm-switcher",
        "rm -rf ~/.llm-switch"
      ],
      windows_ps: [
        "npm uninstall -g cli-llm-switcher",
        "Remove-Item -Recurse -Force \"$env:USERPROFILE\\.llm-switch\""
      ],
      windows_cmd: [
        "npm uninstall -g cli-llm-switcher",
        "rmdir /s /q \"%USERPROFILE%\\.llm-switch\""
      ]
    }
  },
  fr: {
    uninstallation_commands: {
      basic: "npm uninstall -g cli-llm-switcher",
      macos_linux: [
        "npm uninstall -g cli-llm-switcher",
        "rm -rf ~/.llm-switch"
      ],
      windows_ps: [
        "npm uninstall -g cli-llm-switcher",
        "Remove-Item -Recurse -Force \"$env:USERPROFILE\\.llm-switch\""
      ],
      windows_cmd: [
        "npm uninstall -g cli-llm-switcher",
        "rmdir /s /q \"%USERPROFILE%\\.llm-switch\""
      ]
    }
  },
  de: {
    uninstallation_commands: {
      basic: "npm uninstall -g cli-llm-switcher",
      macos_linux: [
        "npm uninstall -g cli-llm-switcher",
        "rm -rf ~/.llm-switch"
      ],
      windows_ps: [
        "npm uninstall -g cli-llm-switcher",
        "Remove-Item -Recurse -Force \"$env:USERPROFILE\\.llm-switch\""
      ],
      windows_cmd: [
        "npm uninstall -g cli-llm-switcher",
        "rmdir /s /q \"%USERPROFILE%\\.llm-switch\""
      ]
    }
  },
  es: {
    uninstallation_commands: {
      basic: "npm uninstall -g cli-llm-switcher",
      macos_linux: [
        "npm uninstall -g cli-llm-switcher",
        "rm -rf ~/.llm-switch"
      ],
      windows_ps: [
        "npm uninstall -g cli-llm-switcher",
        "Remove-Item -Recurse -Force \"$env:USERPROFILE\\.llm-switch\""
      ],
      windows_cmd: [
        "npm uninstall -g cli-llm-switcher",
        "rmdir /s /q \"%USERPROFILE%\\.llm-switch\""
      ]
    }
  },
  ru: {
    uninstallation_commands: {
      basic: "npm uninstall -g cli-llm-switcher",
      macos_linux: [
        "npm uninstall -g cli-llm-switcher",
        "rm -rf ~/.llm-switch"
      ],
      windows_ps: [
        "npm uninstall -g cli-llm-switcher",
        "Remove-Item -Recurse -Force \"$env:USERPROFILE\\.llm-switch\""
      ],
      windows_cmd: [
        "npm uninstall -g cli-llm-switcher",
        "rmdir /s /q \"%USERPROFILE%\\.llm-switch\""
      ]
    }
  },
  ar: {
    uninstallation_commands: {
      basic: "npm uninstall -g cli-llm-switcher",
      macos_linux: [
        "npm uninstall -g cli-llm-switcher",
        "rm -rf ~/.llm-switch"
      ],
      windows_ps: [
        "npm uninstall -g cli-llm-switcher",
        "Remove-Item -Recurse -Force \"$env:USERPROFILE\\.llm-switch\""
      ],
      windows_cmd: [
        "npm uninstall -g cli-llm-switcher",
        "rmdir /s /q \"%USERPROFILE%\\.llm-switch\""
      ]
    }
  }
};

function loadYamlFile(filePath: string): any {
  const content = fs.readFileSync(filePath, 'utf8');
  return yaml.load(content);
}

function saveYamlFile(filePath: string, data: any): void {
  const yamlStr = yaml.dump(data, {
    lineWidth: -1,
    noRefs: true,
    sortKeys: false
  });
  fs.writeFileSync(filePath, yamlStr, 'utf8');
}

async function main() {
  console.log('🌍 Completing translations in i18n files...\n');
  
  for (const [lang, examples] of Object.entries(usageExamples)) {
    const filePath = path.join(I18N_DIR, `${lang}.yml`);
    
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️ ${lang}.yml not found, skipping...`);
      continue;
    }
    
    console.log(`📝 Updating ${lang}.yml...`);
    
    // Load current data
    const currentData = loadYamlFile(filePath);
    
    // Update usage examples
    if (currentData.home) {
      currentData.home.usage_examples = examples;
      
      // Add any additional translations
      if (additionalTranslations[lang]) {
        for (const [key, value] of Object.entries(additionalTranslations[lang])) {
          currentData.home[key] = value;
        }
      }
    }
    
    // Save updated file
    saveYamlFile(filePath, currentData);
    console.log(`   ✅ Updated usage examples and other translations`);
  }
  
  console.log('\n✨ All translations have been completed!');
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});