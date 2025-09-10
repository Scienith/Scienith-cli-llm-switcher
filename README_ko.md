<div align="center">

<img src="assets/images/logo/logo.jpeg" alt="cli-llm-switcher" width="50%">

# cli-llm-switcher

*여러 LLM 제공업체 간의 원활한 전환을 위한 명령줄 도구*

[![Version](https://img.shields.io/badge/version-v0.3.4-blue.svg)](https://github.com/Scienith/cli-llm-switcher/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

**🌍 Languages**: [English](README.md) | [中文](README_zh.md) | [日本語](README_ja.md) | 한국어 | [Français](README_fr.md) | [Deutsch](README_de.md) | [Español](README_es.md) | [Русский](README_ru.md) | [العربية](README_ar.md)

</div>

**DeepSeek, Qwen, Zhipu GLM, Kimi을 한 번의 명령으로 전환**, Claude Code 및 호환 CLI 도구에 완벽 대응.

## 💡 💡 왜 LLM 스위처를 선택해야 하나요?

### 🔒 격리된 구성 환경
- **네이티브 Claude Code에 영향 없음**: 원래 Claude 설정이 그대로 유지됨
- **세션별 공급자 전환**: 각 터미널 세션에서 다른 공급자 사용 가능

### 🎯 공식 모범 사례
- **공급자 권장 구성**: 각 공급자의 공식 통합 지침 준수
- **Claude Code 듀얼 모델 구성**: 메인 모델은 대화/계획/코드 생성/복잡한 추론에 사용, 빠른 모델(Claude는 3.5 Haiku 등 사용)은 파일 검색/구문 검사 등 보조 작업에 사용 - 성능과 비용을 지능적으로 최적화


## 📋 사전 요구 사항

설치하기 전에 Node.js(v16 이상)가 설치되어 있는지 확인하세요:

### Node.js 설치

**옵션 1(권장)**: nvm을 사용하여 Node.js를 쉽게 관리
  ```bash
  # nvm 설치: https://github.com/nvm-sh/nvm#install--update-script
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
  # 터미널을 재시작한 다음 최신 Node.js 설치
  nvm install node
  nvm use node
  ```
**옵션 2**: [nodejs.org](https://nodejs.org/)에서 다운로드(LTS 버전 선택)

설치 확인:
```bash
node --version  # v16.0.0 이상이 표시되어야 함
npm --version   # npm 버전이 표시되어야 함
```

## 빠른 시작

```bash
# npm으로 전역 설치
npm install -g cli-llm-switcher

# 설치 확인
lms --version

# API 키 구성
lms config
# 프롬프트에 따라 API 키 입력

# Claude Code 또는 다른 도구로 시작
lms run claude
```

## 🤖 공급자 통합

### DeepSeek

<div align="center">
<img src="https://raw.githubusercontent.com/Scienith/cli-llm-switcher/main/assets/images/logo/deepseek_logo.png" alt="DeepSeek" width="200">
</div>

### 모델 구성
- **[NEEDS TRANSLATION] Main Model**: `deepseek-chat`
- **[NEEDS TRANSLATION] Fast Model**: `deepseek-chat`

### [NEEDS TRANSLATION] Get Your API Key
- [NEEDS TRANSLATION] **Platform**: [https://platform.deepseek.com/](https://platform.deepseek.com/)

---

### AlibabaCloud (International)

<div align="center">
<img src="https://raw.githubusercontent.com/Scienith/cli-llm-switcher/main/assets/images/logo/alibaba_cloud.png" alt="AlibabaCloud (International)" width="200">
</div>

### 모델 구성
- **[NEEDS TRANSLATION] Main Model**: `qwen3-coder-plus`
- **[NEEDS TRANSLATION] Fast Model**: `qwen3-coder-flash`

### [NEEDS TRANSLATION] Get Your API Key
- [NEEDS TRANSLATION] **🌍 International**: [https://modelstudio.console.alibabacloud.com/](https://modelstudio.console.alibabacloud.com/)

---

### AlibabaCloud (China)

<div align="center">
<img src="https://raw.githubusercontent.com/Scienith/cli-llm-switcher/main/assets/images/logo/alibaba_cloud.png" alt="AlibabaCloud (China)" width="200">
</div>

### 모델 구성
- **[NEEDS TRANSLATION] Main Model**: `qwen3-coder-plus`
- **[NEEDS TRANSLATION] Fast Model**: `qwen3-coder-flash`

### [NEEDS TRANSLATION] Get Your API Key
- [NEEDS TRANSLATION] **🇨🇳 China**: [https://bailian.console.aliyun.com/](https://bailian.console.aliyun.com/)

---

### Moonshot AI

<div align="center">
<img src="https://raw.githubusercontent.com/Scienith/cli-llm-switcher/main/assets/images/logo/moonshot_logo.png" alt="Moonshot AI" width="200">
</div>

### 모델 구성
- **[NEEDS TRANSLATION] Main Model**: `kimi-k2-0905-preview`
- **[NEEDS TRANSLATION] Fast Model**: `kimi-k2-0905-preview`

### [NEEDS TRANSLATION] Get Your API Key
- [NEEDS TRANSLATION] **Platform**: [https://platform.moonshot.ai/](https://platform.moonshot.ai/)

---

### Zhipu GLM

<div align="center">
<img src="https://raw.githubusercontent.com/Scienith/cli-llm-switcher/main/assets/images/logo/zhipu.jpg" alt="Zhipu GLM" width="200">
</div>

### 모델 구성
- **[NEEDS TRANSLATION] Main Model**: `glm-4.5`
- **[NEEDS TRANSLATION] Fast Model**: `glm-4.5-air`

### API 키 받기
- **🇨🇳 중국**: [https://bigmodel.cn/](https://bigmodel.cn/)
- **🌍 국제**: [https://z.ai/model-api](https://z.ai/model-api)

---



## 제거

### 기본 제거(구성 유지)

```bash
npm uninstall -g cli-llm-switcher
```

### 완전 제거(모두 삭제)

참고: 제거하기 전에 `lms status`를 실행하여 구성 디렉토리 경로를 확인하세요.

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

## 기여

기여를 환영합니다! 언제든지 Pull Request를 제출해 주세요.

## 라이선스

이 프로젝트는 MIT 라이선스 하에 라이선스가 부여됩니다 - 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## [NEEDS TRANSLATION] References

[NEEDS TRANSLATION] Official provider configuration guides for Claude Code integration:

- [DeepSeek Anthropic API Guide](https://api-docs.deepseek.com/guides/anthropic_api)
- [Alibaba Cloud Model Studio - Claude Code Integration](https://help.aliyun.com/zh/model-studio/claude-code)
- [Zhipu GLM - Claude Development Guide](https://docs.bigmodel.cn/cn/guide/develop/claude)

---

**도움이 필요하신가요?** 자세한 가이드와 문제 해결을 위해 전체 문서를 확인하세요.