#!/usr/bin/env node

/**
 * Update translations in all i18n files
 */

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

const I18N_DIR = path.join(__dirname, '../docs/_data/i18n');

interface TranslationUpdates {
  [lang: string]: {
    [key: string]: string | string[] | any;
  };
}

// Define translations for each language
const translations: TranslationUpdates = {
  en: {
    installation_commands: [
      "# Install globally via npm",
      "npm install -g cli-llm-switcher",
      "",
      "# Verify installation",
      "lms --version",
      "",
      "# Configure API keys",
      "lms config",
      "# Follow prompts to enter your API key",
      "",
      "# Start using with Claude Code or other tools",
      "lms run claude"
    ]
  },
  zh: {
    installation_commands: [
      "# 通过 npm 全局安装",
      "npm install -g cli-llm-switcher",
      "",
      "# 验证安装",
      "lms --version",
      "",
      "# 配置 API 密钥",
      "lms config",
      "# 按提示输入您的 API 密钥",
      "",
      "# 开始使用 Claude Code 或其他工具",
      "lms run claude"
    ],
    prerequisites_title: "📋 前置要求",
    prerequisites_desc: "在安装之前，请确保已安装 Node.js（v16 或更高版本）：",
    prerequisites_node_title: "安装 Node.js",
    why_title: "💡 为什么选择 LLM 切换器？",
    why_isolated_title: "🔒 隔离的配置环境",
    why_isolated_items: [
      "**对原生 Claude Code 零影响**: 您的原始 Claude 设置保持不变",
      "**按会话切换提供商**: 每个终端会话可以使用不同的提供商"
    ],
    why_practices_title: "🎯 官方最佳实践",
    why_practices_items: [
      "**提供商推荐配置**: 遵循各供应商的官方集成指南",
      "**Claude Code 双模型配置**: 主模型处理复杂任务，快速模型处理简单任务，智能优化性能与成本"
    ]
  },
  ja: {
    installation_commands: [
      "# npm でグローバルインストール",
      "npm install -g cli-llm-switcher",
      "",
      "# インストールの確認",
      "lms --version",
      "",
      "# API キーの設定",
      "lms config",
      "# プロンプトに従って API キーを入力",
      "",
      "# Claude Code または他のツールで使用開始",
      "lms run claude"
    ],
    prerequisites_title: "📋 前提条件",
    prerequisites_desc: "インストールする前に、Node.js（v16以降）がインストールされていることを確認してください：",
    prerequisites_node_title: "Node.js のインストール",
    prerequisites_node_options: [
      "**オプション1（推奨）**：nvmを使用してNode.jsを簡単に管理",
      "  ```bash",
      "  # nvmをインストール: https://github.com/nvm-sh/nvm#install--update-script",
      "  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash",
      "  # ターミナルを再起動し、最新のNode.jsをインストール",
      "  nvm install node",
      "  nvm use node",
      "  ```",
      "**オプション2**：[nodejs.org](https://nodejs.org/)からダウンロード（LTSバージョンを選択）",
      "",
      "インストールの確認：",
      "```bash",
      "node --version  # v16.0.0以降が表示されるはずです",
      "npm --version   # npmのバージョンが表示されるはずです",
      "```"
    ],
    why_title: "💡 なぜLLMスイッチャーを選ぶのか？",
    why_isolated_title: "🔒 分離された設定環境",
    why_isolated_items: [
      "**ネイティブClaude Codeへの影響ゼロ**: 元のClaude設定は変更されません",
      "**セッションごとのプロバイダー切り替え**: 各ターミナルセッションで異なるプロバイダーを使用可能"
    ],
    why_practices_title: "🎯 公式ベストプラクティス",
    why_practices_items: [
      "**プロバイダー推奨設定**: 各プロバイダーの公式統合ガイドラインに従う",
      "**Claude Code デュアルモデル設定**: 複雑なタスク用のメインモデル、簡単なタスク用の高速モデル - パフォーマンスとコストを賢く最適化"
    ],
    provider_integration_title: "🤖 プロバイダー統合",
    zhipu_description: "**Zhipu GLM** は、Zhipu AIが開発した強力な中国語大規模言語モデルシリーズで、様々なタスクに最先端のパフォーマンスを提供します。",
    zhipu_models_title: "利用可能なモデル",
    zhipu_models: [
      "**glm-4.5**: 複雑な推論と生成タスク用のメインモデル",
      "**glm-4.5-air**: 高速応答に最適化された軽量モデル"
    ],
    zhipu_api_title: "APIキーを取得",
    zhipu_api_links: [
      "**🇨🇳 中国**: [https://bigmodel.cn/](https://bigmodel.cn/)",
      "**🌍 国際版**: [https://z.ai/model-api](https://z.ai/model-api)"
    ],
    model_config_title: "モデル設定",
    model_config_desc: "ツールは異なる用途に最適なモデルを自動的に設定します：",
    model_config_main: "**メインモデル**: 複雑なタスク、コード生成、推論に使用",
    model_config_fast: "**高速モデル**: ファイル検索や構文チェックなどの簡単な操作に使用",
    model_config_example: "例えば、Zhipu GLMの場合：",
    model_config_example_main: "- メインモデル：`glm-4.5` - より強力で、複雑なタスクに適している",
    model_config_example_fast: "- 高速モデル：`glm-4.5-air` - より軽量で、速度を優先",
    configuration_title: "設定",
    configuration_desc: "インストール後、使用するプロバイダーのAPIキーを設定する必要があります。",
    configuration_steps: [
      "設定テンプレートをコピー",
      "設定ファイルを編集",
      "各プロバイダーのAPIキーを追加",
      "設定をテスト"
    ],
    usage_title: "使用方法",
    usage_desc: "設定が完了したら、プロバイダー間を簡単に切り替えることができます：",
    usage_examples: [
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
    troubleshooting_title: "トラブルシューティング",
    troubleshooting_common: "よくある問題",
    troubleshooting_tips: [
      "**権限拒否**: スクリプトが実行可能であることを確認 `chmod +x bin/llm-switch`",
      "**設定が見つからない**: `config/providers.ini`をコピーして編集したことを確認",
      "**APIキーエラー**: APIキーが正しく、適切な権限を持っていることを確認",
      "**シェル統合**: 出力を実行するか、シェルプロファイルに追加したことを確認"
    ],
    uninstallation_title: "アンインストール",
    uninstallation_basic_title: "基本的なアンインストール（設定を保持）",
    uninstallation_complete_title: "完全なアンインストール（すべて削除）",
    uninstallation_note: "注意：アンインストール前に `lms status` を実行して設定ディレクトリのパスを確認してください。"
  },
  ko: {
    installation_commands: [
      "# npm으로 전역 설치",
      "npm install -g cli-llm-switcher",
      "",
      "# 설치 확인",
      "lms --version",
      "",
      "# API 키 구성",
      "lms config",
      "# 프롬프트에 따라 API 키 입력",
      "",
      "# Claude Code 또는 다른 도구로 시작",
      "lms run claude"
    ],
    prerequisites_title: "📋 사전 요구 사항",
    prerequisites_desc: "설치하기 전에 Node.js(v16 이상)가 설치되어 있는지 확인하세요:",
    prerequisites_node_title: "Node.js 설치",
    prerequisites_node_options: [
      "**옵션 1(권장)**: nvm을 사용하여 Node.js를 쉽게 관리",
      "  ```bash",
      "  # nvm 설치: https://github.com/nvm-sh/nvm#install--update-script",
      "  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash",
      "  # 터미널을 재시작한 다음 최신 Node.js 설치",
      "  nvm install node",
      "  nvm use node",
      "  ```",
      "**옵션 2**: [nodejs.org](https://nodejs.org/)에서 다운로드(LTS 버전 선택)",
      "",
      "설치 확인:",
      "```bash",
      "node --version  # v16.0.0 이상이 표시되어야 함",
      "npm --version   # npm 버전이 표시되어야 함",
      "```"
    ],
    why_title: "💡 왜 LLM 스위처를 선택해야 하나요?",
    why_isolated_title: "🔒 격리된 구성 환경",
    why_isolated_items: [
      "**네이티브 Claude Code에 영향 없음**: 원래 Claude 설정이 그대로 유지됨",
      "**세션별 공급자 전환**: 각 터미널 세션에서 다른 공급자 사용 가능"
    ],
    why_practices_title: "🎯 공식 모범 사례",
    why_practices_items: [
      "**공급자 권장 구성**: 각 공급자의 공식 통합 지침 준수",
      "**Claude Code 듀얼 모델 구성**: 복잡한 작업용 메인 모델, 간단한 작업용 빠른 모델 - 성능과 비용을 지능적으로 최적화"
    ],
    provider_integration_title: "🤖 공급자 통합",
    zhipu_description: "**Zhipu GLM**은 Zhipu AI가 개발한 강력한 중국어 대규모 언어 모델 시리즈로, 다양한 작업에 최첨단 성능을 제공합니다.",
    zhipu_models_title: "사용 가능한 모델",
    zhipu_models: [
      "**glm-4.5**: 복잡한 추론 및 생성 작업용 메인 모델",
      "**glm-4.5-air**: 빠른 응답에 최적화된 경량 모델"
    ],
    zhipu_api_title: "API 키 받기",
    zhipu_api_links: [
      "**🇨🇳 중국**: [https://bigmodel.cn/](https://bigmodel.cn/)",
      "**🌍 국제**: [https://z.ai/model-api](https://z.ai/model-api)"
    ],
    model_config_title: "모델 구성",
    model_config_desc: "도구는 다양한 용도에 최적의 모델을 자동으로 구성합니다:",
    model_config_main: "**메인 모델**: 복잡한 작업, 코드 생성 및 추론에 사용",
    model_config_fast: "**빠른 모델**: 파일 검색 및 구문 확인과 같은 간단한 작업에 사용",
    model_config_example: "예를 들어 Zhipu GLM의 경우:",
    model_config_example_main: "- 메인 모델: `glm-4.5` - 더 강력하고 복잡한 작업에 적합",
    model_config_example_fast: "- 빠른 모델: `glm-4.5-air` - 더 가볍고 속도 우선",
    configuration_title: "구성",
    configuration_desc: "설치 후 사용하려는 공급자의 API 키를 구성해야 합니다.",
    configuration_steps: [
      "구성 템플릿 복사",
      "구성 파일 편집",
      "각 공급자의 API 키 추가",
      "구성 테스트"
    ],
    usage_title: "사용법",
    usage_desc: "구성이 완료되면 공급자 간에 쉽게 전환할 수 있습니다:",
    troubleshooting_title: "문제 해결",
    troubleshooting_common: "일반적인 문제",
    troubleshooting_tips: [
      "**권한 거부**: 스크립트가 실행 가능한지 확인 `chmod +x bin/llm-switch`",
      "**구성을 찾을 수 없음**: `config/providers.ini`를 복사하고 편집했는지 확인",
      "**API 키 오류**: API 키가 올바르고 적절한 권한이 있는지 확인",
      "**셸 통합**: 출력을 실행하거나 셸 프로필에 추가했는지 확인"
    ],
    uninstallation_title: "제거",
    uninstallation_basic_title: "기본 제거(구성 유지)",
    uninstallation_complete_title: "완전 제거(모두 삭제)",
    uninstallation_note: "참고: 제거하기 전에 `lms status`를 실행하여 구성 디렉토리 경로를 확인하세요."
  },
  fr: {
    installation_commands: [
      "# Installation globale via npm",
      "npm install -g cli-llm-switcher",
      "",
      "# Vérifier l'installation",
      "lms --version",
      "",
      "# Configurer les clés API",
      "lms config",
      "# Suivez les invites pour entrer votre clé API",
      "",
      "# Commencer à utiliser avec Claude Code ou d'autres outils",
      "lms run claude"
    ],
    prerequisites_title: "📋 Prérequis",
    prerequisites_desc: "Avant l'installation, assurez-vous que Node.js (v16 ou version ultérieure) est installé :",
    prerequisites_node_title: "Installer Node.js",
    prerequisites_node_options: [
      "**Option 1 (Recommandée)** : Utiliser nvm pour gérer facilement Node.js",
      "  ```bash",
      "  # Installer nvm : https://github.com/nvm-sh/nvm#install--update-script",
      "  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash",
      "  # Redémarrer le terminal, puis installer la dernière version de Node.js",
      "  nvm install node",
      "  nvm use node",
      "  ```",
      "**Option 2** : Télécharger depuis [nodejs.org](https://nodejs.org/) (choisir la version LTS)",
      "",
      "Vérifier l'installation :",
      "```bash",
      "node --version  # Devrait afficher v16.0.0 ou plus",
      "npm --version   # Devrait afficher la version npm",
      "```"
    ],
    why_title: "💡 Pourquoi choisir LLM Switcher ?",
    why_isolated_title: "🔒 Environnement de configuration isolé",
    why_isolated_items: [
      "**Aucun impact sur Claude Code natif** : Votre configuration Claude d'origine reste intacte",
      "**Changement de fournisseur par session** : Chaque session de terminal peut utiliser différents fournisseurs"
    ],
    why_practices_title: "🎯 Meilleures pratiques officielles",
    why_practices_items: [
      "**Configurations recommandées par les fournisseurs** : Suit les directives d'intégration officielles de chaque fournisseur",
      "**Configuration double modèle Claude Code** : Modèle principal pour les tâches complexes, modèle rapide pour les tâches simples - optimise intelligemment les performances et les coûts"
    ],
    provider_integration_title: "🤖 Intégration des fournisseurs",
    zhipu_description: "**Zhipu GLM** est une puissante série de modèles de langage chinois développée par Zhipu AI, offrant des performances de pointe pour diverses tâches.",
    zhipu_models_title: "Modèles disponibles",
    zhipu_models: [
      "**glm-4.5** : Modèle principal pour les tâches de raisonnement et de génération complexes",
      "**glm-4.5-air** : Modèle léger optimisé pour des réponses rapides"
    ],
    zhipu_api_title: "Obtenir votre clé API",
    zhipu_api_links: [
      "**🇨🇳 Chine** : [https://bigmodel.cn/](https://bigmodel.cn/)",
      "**🌍 International** : [https://z.ai/model-api](https://z.ai/model-api)"
    ],
    model_config_title: "Configuration des modèles",
    model_config_desc: "L'outil configure automatiquement les modèles optimaux pour différentes utilisations :",
    model_config_main: "**Modèle principal** : Utilisé pour les tâches complexes, la génération de code et le raisonnement",
    model_config_fast: "**Modèle rapide** : Utilisé pour les opérations simples comme la recherche de fichiers et la vérification de syntaxe",
    model_config_example: "Par exemple, Zhipu GLM utilise :",
    model_config_example_main: "- Modèle principal : `glm-4.5` - Plus puissant, adapté aux tâches complexes",
    model_config_example_fast: "- Modèle rapide : `glm-4.5-air` - Plus léger, optimisé pour la vitesse",
    configuration_title: "Configuration",
    configuration_desc: "Après l'installation, vous devez configurer les clés API pour les fournisseurs que vous souhaitez utiliser.",
    configuration_steps: [
      "Copier le modèle de configuration",
      "Modifier le fichier de configuration",
      "Ajouter les clés API pour chaque fournisseur",
      "Tester la configuration"
    ],
    usage_title: "Utilisation",
    usage_desc: "Une fois configuré, vous pouvez facilement basculer entre les fournisseurs :",
    troubleshooting_title: "Dépannage",
    troubleshooting_common: "Problèmes courants",
    troubleshooting_tips: [
      "**Permission refusée** : Assurez-vous que le script est exécutable avec `chmod +x bin/llm-switch`",
      "**Configuration non trouvée** : Assurez-vous d'avoir copié et édité `config/providers.ini`",
      "**Erreurs de clé API** : Vérifiez que vos clés API sont correctes et ont les permissions appropriées",
      "**Intégration shell** : Assurez-vous d'exécuter la sortie ou de l'ajouter à votre profil shell"
    ],
    uninstallation_title: "Désinstallation",
    uninstallation_basic_title: "Désinstallation de base (conserve la configuration)",
    uninstallation_complete_title: "Désinstallation complète (supprime tout)",
    uninstallation_note: "Note : Exécutez `lms status` pour voir le chemin du répertoire de configuration avant la désinstallation."
  },
  de: {
    installation_commands: [
      "# Global über npm installieren",
      "npm install -g cli-llm-switcher",
      "",
      "# Installation überprüfen",
      "lms --version",
      "",
      "# API-Schlüssel konfigurieren",
      "lms config",
      "# Folgen Sie den Anweisungen zur Eingabe Ihres API-Schlüssels",
      "",
      "# Mit Claude Code oder anderen Tools beginnen",
      "lms run claude"
    ],
    prerequisites_title: "📋 Voraussetzungen",
    prerequisites_desc: "Stellen Sie vor der Installation sicher, dass Node.js (v16 oder höher) installiert ist:",
    prerequisites_node_title: "Node.js installieren",
    prerequisites_node_options: [
      "**Option 1 (Empfohlen)**: Verwenden Sie nvm für einfaches Node.js-Management",
      "  ```bash",
      "  # nvm installieren: https://github.com/nvm-sh/nvm#install--update-script",
      "  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash",
      "  # Terminal neu starten, dann neueste Node.js installieren",
      "  nvm install node",
      "  nvm use node",
      "  ```",
      "**Option 2**: Von [nodejs.org](https://nodejs.org/) herunterladen (LTS-Version wählen)",
      "",
      "Installation überprüfen:",
      "```bash",
      "node --version  # Sollte v16.0.0 oder höher anzeigen",
      "npm --version   # Sollte npm-Version anzeigen",
      "```"
    ],
    why_title: "💡 Warum LLM Switcher wählen?",
    why_isolated_title: "🔒 Isolierte Konfigurationsumgebung",
    why_isolated_items: [
      "**Keine Auswirkung auf natives Claude Code**: Ihre ursprüngliche Claude-Einrichtung bleibt unverändert",
      "**Anbieterwechsel pro Sitzung**: Jede Terminal-Sitzung kann verschiedene Anbieter verwenden"
    ],
    why_practices_title: "🎯 Offizielle Best Practices",
    why_practices_items: [
      "**Anbieter-empfohlene Konfigurationen**: Folgt den offiziellen Integrationsrichtlinien jedes Anbieters",
      "**Claude Code Dual-Modell-Konfiguration**: Hauptmodell für komplexe Aufgaben, schnelles Modell für einfache Aufgaben - optimiert intelligent Leistung und Kosten"
    ],
    provider_integration_title: "🤖 Anbieter-Integration",
    zhipu_description: "**Zhipu GLM** ist eine leistungsstarke chinesische Sprachmodellreihe, entwickelt von Zhipu AI, die modernste Leistung für verschiedene Aufgaben bietet.",
    zhipu_models_title: "Verfügbare Modelle",
    zhipu_models: [
      "**glm-4.5**: Hauptmodell für komplexe Schlussfolgerungs- und Generierungsaufgaben",
      "**glm-4.5-air**: Leichtgewichtiges Modell optimiert für schnelle Antworten"
    ],
    zhipu_api_title: "API-Schlüssel erhalten",
    zhipu_api_links: [
      "**🇨🇳 China**: [https://bigmodel.cn/](https://bigmodel.cn/)",
      "**🌍 International**: [https://z.ai/model-api](https://z.ai/model-api)"
    ],
    model_config_title: "Modellkonfiguration",
    model_config_desc: "Das Tool konfiguriert automatisch optimale Modelle für verschiedene Zwecke:",
    model_config_main: "**Hauptmodell**: Verwendet für komplexe Aufgaben, Code-Generierung und Schlussfolgerung",
    model_config_fast: "**Schnelles Modell**: Verwendet für einfache Operationen wie Dateisuche und Syntaxprüfung",
    model_config_example: "Zum Beispiel verwendet Zhipu GLM:",
    model_config_example_main: "- Hauptmodell: `glm-4.5` - Leistungsstärker, geeignet für komplexe Aufgaben",
    model_config_example_fast: "- Schnelles Modell: `glm-4.5-air` - Leichter, für Geschwindigkeit optimiert",
    configuration_title: "Konfiguration",
    configuration_desc: "Nach der Installation müssen Sie API-Schlüssel für die Anbieter konfigurieren, die Sie verwenden möchten.",
    configuration_steps: [
      "Konfigurationsvorlage kopieren",
      "Konfigurationsdatei bearbeiten",
      "API-Schlüssel für jeden Anbieter hinzufügen",
      "Konfiguration testen"
    ],
    usage_title: "Verwendung",
    usage_desc: "Nach der Konfiguration können Sie einfach zwischen Anbietern wechseln:",
    troubleshooting_title: "Fehlerbehebung",
    troubleshooting_common: "Häufige Probleme",
    troubleshooting_tips: [
      "**Berechtigung verweigert**: Stellen Sie sicher, dass das Skript ausführbar ist mit `chmod +x bin/llm-switch`",
      "**Konfiguration nicht gefunden**: Stellen Sie sicher, dass Sie `config/providers.ini` kopiert und bearbeitet haben",
      "**API-Schlüsselfehler**: Überprüfen Sie, ob Ihre API-Schlüssel korrekt sind und die richtigen Berechtigungen haben",
      "**Shell-Integration**: Stellen Sie sicher, die Ausgabe auszuführen oder zu Ihrem Shell-Profil hinzuzufügen"
    ],
    uninstallation_title: "Deinstallation",
    uninstallation_basic_title: "Basis-Deinstallation (behält Konfiguration)",
    uninstallation_complete_title: "Vollständige Deinstallation (entfernt alles)",
    uninstallation_note: "Hinweis: Führen Sie `lms status` aus, um den Konfigurationsverzeichnispfad vor der Deinstallation zu sehen."
  },
  es: {
    installation_commands: [
      "# Instalar globalmente vía npm",
      "npm install -g cli-llm-switcher",
      "",
      "# Verificar instalación",
      "lms --version",
      "",
      "# Configurar claves API",
      "lms config",
      "# Siga las indicaciones para ingresar su clave API",
      "",
      "# Comenzar a usar con Claude Code u otras herramientas",
      "lms run claude"
    ],
    prerequisites_title: "📋 Requisitos previos",
    prerequisites_desc: "Antes de instalar, asegúrese de tener Node.js (v16 o posterior) instalado:",
    prerequisites_node_title: "Instalar Node.js",
    prerequisites_node_options: [
      "**Opción 1 (Recomendada)**: Use nvm para gestionar Node.js fácilmente",
      "  ```bash",
      "  # Instalar nvm: https://github.com/nvm-sh/nvm#install--update-script",
      "  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash",
      "  # Reiniciar terminal, luego instalar la última versión de Node.js",
      "  nvm install node",
      "  nvm use node",
      "  ```",
      "**Opción 2**: Descargar desde [nodejs.org](https://nodejs.org/) (elegir versión LTS)",
      "",
      "Verificar instalación:",
      "```bash",
      "node --version  # Debería mostrar v16.0.0 o superior",
      "npm --version   # Debería mostrar la versión de npm",
      "```"
    ],
    why_title: "💡 ¿Por qué elegir LLM Switcher?",
    why_isolated_title: "🔒 Entorno de configuración aislado",
    why_isolated_items: [
      "**Sin impacto en Claude Code nativo**: Tu configuración original de Claude permanece intacta",
      "**Cambio de proveedor por sesión**: Cada sesión de terminal puede usar diferentes proveedores"
    ],
    why_practices_title: "🎯 Mejores prácticas oficiales",
    why_practices_items: [
      "**Configuraciones recomendadas por proveedores**: Sigue las pautas de integración oficiales de cada proveedor",
      "**Configuración de doble modelo Claude Code**: Modelo principal para tareas complejas, modelo rápido para tareas simples - optimiza inteligentemente rendimiento y costo"
    ],
    provider_integration_title: "🤖 Integración de proveedores",
    zhipu_description: "**Zhipu GLM** es una poderosa serie de modelos de lenguaje chino desarrollada por Zhipu AI, que ofrece rendimiento de vanguardia para diversas tareas.",
    zhipu_models_title: "Modelos disponibles",
    zhipu_models: [
      "**glm-4.5**: Modelo principal para tareas complejas de razonamiento y generación",
      "**glm-4.5-air**: Modelo ligero optimizado para respuestas rápidas"
    ],
    zhipu_api_title: "Obtener tu clave API",
    zhipu_api_links: [
      "**🇨🇳 China**: [https://bigmodel.cn/](https://bigmodel.cn/)",
      "**🌍 Internacional**: [https://z.ai/model-api](https://z.ai/model-api)"
    ],
    model_config_title: "Configuración de modelos",
    model_config_desc: "La herramienta configura automáticamente modelos óptimos para diferentes usos:",
    model_config_main: "**Modelo principal**: Usado para tareas complejas, generación de código y razonamiento",
    model_config_fast: "**Modelo rápido**: Usado para operaciones simples como búsqueda de archivos y verificación de sintaxis",
    model_config_example: "Por ejemplo, Zhipu GLM usa:",
    model_config_example_main: "- Modelo principal: `glm-4.5` - Más potente, adecuado para tareas complejas",
    model_config_example_fast: "- Modelo rápido: `glm-4.5-air` - Más ligero, optimizado para velocidad",
    configuration_title: "Configuración",
    configuration_desc: "Después de la instalación, necesitas configurar las claves API para los proveedores que deseas usar.",
    configuration_steps: [
      "Copiar la plantilla de configuración",
      "Editar el archivo de configuración",
      "Agregar claves API para cada proveedor",
      "Probar la configuración"
    ],
    usage_title: "Uso",
    usage_desc: "Una vez configurado, puedes cambiar fácilmente entre proveedores:",
    troubleshooting_title: "Solución de problemas",
    troubleshooting_common: "Problemas comunes",
    troubleshooting_tips: [
      "**Permiso denegado**: Asegúrate de que el script sea ejecutable con `chmod +x bin/llm-switch`",
      "**Configuración no encontrada**: Asegúrate de haber copiado y editado `config/providers.ini`",
      "**Errores de clave API**: Verifica que tus claves API sean correctas y tengan los permisos adecuados",
      "**Integración de shell**: Asegúrate de ejecutar la salida o agregarla a tu perfil de shell"
    ],
    uninstallation_title: "Desinstalación",
    uninstallation_basic_title: "Desinstalación básica (mantiene configuración)",
    uninstallation_complete_title: "Desinstalación completa (elimina todo)",
    uninstallation_note: "Nota: Ejecuta `lms status` para ver la ruta del directorio de configuración antes de desinstalar."
  },
  ru: {
    installation_commands: [
      "# Глобальная установка через npm",
      "npm install -g cli-llm-switcher",
      "",
      "# Проверка установки",
      "lms --version",
      "",
      "# Настройка API ключей",
      "lms config",
      "# Следуйте инструкциям для ввода вашего API ключа",
      "",
      "# Начните использовать с Claude Code или другими инструментами",
      "lms run claude"
    ],
    prerequisites_title: "📋 Предварительные требования",
    prerequisites_desc: "Перед установкой убедитесь, что установлен Node.js (v16 или новее):",
    prerequisites_node_title: "Установка Node.js",
    prerequisites_node_options: [
      "**Вариант 1 (Рекомендуется)**: Используйте nvm для простого управления Node.js",
      "  ```bash",
      "  # Установить nvm: https://github.com/nvm-sh/nvm#install--update-script",
      "  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash",
      "  # Перезапустите терминал, затем установите последнюю версию Node.js",
      "  nvm install node",
      "  nvm use node",
      "  ```",
      "**Вариант 2**: Скачать с [nodejs.org](https://nodejs.org/) (выберите LTS версию)",
      "",
      "Проверка установки:",
      "```bash",
      "node --version  # Должно показать v16.0.0 или выше",
      "npm --version   # Должно показать версию npm",
      "```"
    ],
    why_title: "💡 Почему выбрать LLM Switcher?",
    why_isolated_title: "🔒 Изолированная среда конфигурации",
    why_isolated_items: [
      "**Нулевое влияние на нативный Claude Code**: Ваша исходная настройка Claude остается нетронутой",
      "**Переключение провайдера по сеансам**: Каждая сессия терминала может использовать разных провайдеров"
    ],
    why_practices_title: "🎯 Официальные лучшие практики",
    why_practices_items: [
      "**Рекомендованные провайдерами конфигурации**: Следует официальным руководствам интеграции каждого провайдера",
      "**Двойная модель конфигурации Claude Code**: Основная модель для сложных задач, быстрая модель для простых задач - интеллектуально оптимизирует производительность и затраты"
    ],
    provider_integration_title: "🤖 Интеграция провайдеров",
    zhipu_description: "**Zhipu GLM** - это мощная серия китайских языковых моделей, разработанная Zhipu AI, предлагающая передовую производительность для различных задач.",
    zhipu_models_title: "Доступные модели",
    zhipu_models: [
      "**glm-4.5**: Основная модель для сложных задач рассуждения и генерации",
      "**glm-4.5-air**: Легкая модель, оптимизированная для быстрых ответов"
    ],
    zhipu_api_title: "Получить API ключ",
    zhipu_api_links: [
      "**🇨🇳 Китай**: [https://bigmodel.cn/](https://bigmodel.cn/)",
      "**🌍 Международный**: [https://z.ai/model-api](https://z.ai/model-api)"
    ],
    model_config_title: "Конфигурация моделей",
    model_config_desc: "Инструмент автоматически настраивает оптимальные модели для разных целей:",
    model_config_main: "**Основная модель**: Используется для сложных задач, генерации кода и рассуждений",
    model_config_fast: "**Быстрая модель**: Используется для простых операций, таких как поиск файлов и проверка синтаксиса",
    model_config_example: "Например, Zhipu GLM использует:",
    model_config_example_main: "- Основная модель: `glm-4.5` - Более мощная, подходит для сложных задач",
    model_config_example_fast: "- Быстрая модель: `glm-4.5-air` - Более легкая, оптимизирована для скорости",
    configuration_title: "Конфигурация",
    configuration_desc: "После установки вам нужно настроить API ключи для провайдеров, которых вы хотите использовать.",
    configuration_steps: [
      "Скопировать шаблон конфигурации",
      "Редактировать файл конфигурации",
      "Добавить API ключи для каждого провайдера",
      "Протестировать конфигурацию"
    ],
    usage_title: "Использование",
    usage_desc: "После настройки вы можете легко переключаться между провайдерами:",
    troubleshooting_title: "Устранение неполадок",
    troubleshooting_common: "Распространенные проблемы",
    troubleshooting_tips: [
      "**Отказано в доступе**: Убедитесь, что скрипт исполняемый с `chmod +x bin/llm-switch`",
      "**Конфигурация не найдена**: Убедитесь, что вы скопировали и отредактировали `config/providers.ini`",
      "**Ошибки API ключа**: Проверьте, что ваши API ключи правильные и имеют соответствующие разрешения",
      "**Интеграция shell**: Убедитесь, что выполнили вывод или добавили в профиль shell"
    ],
    uninstallation_title: "Удаление",
    uninstallation_basic_title: "Базовое удаление (сохраняет конфигурацию)",
    uninstallation_complete_title: "Полное удаление (удаляет всё)",
    uninstallation_note: "Примечание: Запустите `lms status`, чтобы увидеть путь к каталогу конфигурации перед удалением."
  },
  ar: {
    installation_commands: [
      "# التثبيت عالمياً عبر npm",
      "npm install -g cli-llm-switcher",
      "",
      "# التحقق من التثبيت",
      "lms --version",
      "",
      "# تكوين مفاتيح API",
      "lms config",
      "# اتبع المطالبات لإدخال مفتاح API الخاص بك",
      "",
      "# ابدأ الاستخدام مع Claude Code أو أدوات أخرى",
      "lms run claude"
    ],
    prerequisites_title: "📋 المتطلبات الأساسية",
    prerequisites_desc: "قبل التثبيت، تأكد من تثبيت Node.js (الإصدار 16 أو أحدث):",
    prerequisites_node_title: "تثبيت Node.js",
    prerequisites_node_options: [
      "**الخيار 1 (موصى به)**: استخدم nvm لإدارة Node.js بسهولة",
      "  ```bash",
      "  # تثبيت nvm: https://github.com/nvm-sh/nvm#install--update-script",
      "  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash",
      "  # أعد تشغيل الطرفية، ثم قم بتثبيت أحدث إصدار من Node.js",
      "  nvm install node",
      "  nvm use node",
      "  ```",
      "**الخيار 2**: التنزيل من [nodejs.org](https://nodejs.org/) (اختر إصدار LTS)",
      "",
      "التحقق من التثبيت:",
      "```bash",
      "node --version  # يجب أن يعرض v16.0.0 أو أعلى",
      "npm --version   # يجب أن يعرض إصدار npm",
      "```"
    ],
    why_title: "💡 لماذا تختار LLM Switcher؟",
    why_isolated_title: "🔒 بيئة تكوين معزولة",
    why_isolated_items: [
      "**بدون تأثير على Claude Code الأصلي**: يبقى إعداد Claude الأصلي الخاص بك كما هو",
      "**تبديل المزود حسب الجلسة**: يمكن لكل جلسة طرفية استخدام مزودين مختلفين"
    ],
    why_practices_title: "🎯 أفضل الممارسات الرسمية",
    why_practices_items: [
      "**التكوينات الموصى بها من المزودين**: يتبع إرشادات التكامل الرسمية لكل مزود",
      "**تكوين النموذج المزدوج لـ Claude Code**: النموذج الرئيسي للمهام المعقدة، النموذج السريع للمهام البسيطة - يحسن الأداء والتكلفة بذكاء"
    ],
    provider_integration_title: "🤖 تكامل المزودين",
    zhipu_description: "**Zhipu GLM** هي سلسلة نماذج لغة صينية قوية طورتها Zhipu AI، تقدم أداءً متطورًا لمختلف المهام.",
    zhipu_models_title: "النماذج المتاحة",
    zhipu_models: [
      "**glm-4.5**: النموذج الرئيسي لمهام التفكير والتوليد المعقدة",
      "**glm-4.5-air**: نموذج خفيف محسّن للاستجابات السريعة"
    ],
    zhipu_api_title: "احصل على مفتاح API الخاص بك",
    zhipu_api_links: [
      "**🇨🇳 الصين**: [https://bigmodel.cn/](https://bigmodel.cn/)",
      "**🌍 دولي**: [https://z.ai/model-api](https://z.ai/model-api)"
    ],
    model_config_title: "تكوين النموذج",
    model_config_desc: "تقوم الأداة تلقائيًا بتكوين النماذج المثلى لأغراض مختلفة:",
    model_config_main: "**النموذج الرئيسي**: يُستخدم للمهام المعقدة وتوليد الكود والتفكير",
    model_config_fast: "**النموذج السريع**: يُستخدم للعمليات البسيطة مثل البحث في الملفات والتحقق من بناء الجملة",
    model_config_example: "على سبيل المثال، يستخدم Zhipu GLM:",
    model_config_example_main: "- النموذج الرئيسي: `glm-4.5` - أكثر قوة، مناسب للمهام المعقدة",
    model_config_example_fast: "- النموذج السريع: `glm-4.5-air` - أخف وزنًا، محسّن للسرعة",
    configuration_title: "التكوين",
    configuration_desc: "بعد التثبيت، تحتاج إلى تكوين مفاتيح API للمزودين الذين تريد استخدامهم.",
    configuration_steps: [
      "نسخ قالب التكوين",
      "تحرير ملف التكوين",
      "إضافة مفاتيح API لكل مزود",
      "اختبار التكوين"
    ],
    usage_title: "الاستخدام",
    usage_desc: "بمجرد التكوين، يمكنك التبديل بسهولة بين المزودين:",
    troubleshooting_title: "استكشاف الأخطاء وإصلاحها",
    troubleshooting_common: "المشاكل الشائعة",
    troubleshooting_tips: [
      "**تم رفض الإذن**: تأكد من أن البرنامج النصي قابل للتنفيذ باستخدام `chmod +x bin/llm-switch`",
      "**لم يتم العثور على التكوين**: تأكد من نسخ وتحرير `config/providers.ini`",
      "**أخطاء مفتاح API**: تحقق من أن مفاتيح API الخاصة بك صحيحة ولديها الأذونات المناسبة",
      "**تكامل Shell**: تأكد من تنفيذ المخرجات أو إضافتها إلى ملف تعريف shell الخاص بك"
    ],
    uninstallation_title: "إلغاء التثبيت",
    uninstallation_basic_title: "إلغاء التثبيت الأساسي (يحتفظ بالتكوين)",
    uninstallation_complete_title: "إلغاء التثبيت الكامل (يزيل كل شيء)",
    uninstallation_note: "ملاحظة: قم بتشغيل `lms status` لرؤية مسار دليل التكوين قبل إلغاء التثبيت."
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
    sortKeys: false,
    noCompatMode: true
  });
  fs.writeFileSync(filePath, yamlStr, 'utf8');
}

function updateTranslations(data: any, updates: any): any {
  const result = { ...data };
  
  for (const key in updates) {
    if (typeof updates[key] === 'object' && !Array.isArray(updates[key]) && updates[key] !== null) {
      result[key] = updateTranslations(result[key] || {}, updates[key]);
    } else {
      result[key] = updates[key];
    }
  }
  
  return result;
}

async function main() {
  console.log('🌍 Updating translations in i18n files...\n');
  
  for (const [lang, updates] of Object.entries(translations)) {
    const filePath = path.join(I18N_DIR, `${lang}.yml`);
    
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️ ${lang}.yml not found, skipping...`);
      continue;
    }
    
    console.log(`📝 Updating ${lang}.yml...`);
    
    // Load current data
    const currentData = loadYamlFile(filePath);
    
    // Update with translations
    const updatedData = {
      ...currentData,
      home: updateTranslations(currentData.home || {}, updates)
    };
    
    // Remove [NEEDS TRANSLATION] markers
    const cleanData = JSON.parse(
      JSON.stringify(updatedData)
        .replace(/\[NEEDS TRANSLATION\] /g, '')
    );
    
    // Save updated file
    saveYamlFile(filePath, cleanData);
    console.log(`   ✅ Updated and saved`);
  }
  
  console.log('\n✨ All translations have been updated!');
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});