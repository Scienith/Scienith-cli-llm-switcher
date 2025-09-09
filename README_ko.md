<div align="center">

<img src="assets/images/logo/logo.jpeg" alt="CLI LLM 스위처" width="50%">

# CLI LLM 스위처

*여러 LLM 제공업체 간의 원활한 전환을 위한 명령줄 도구*

[![Version](https://img.shields.io/badge/version-v0.2.0-alpha.14-blue.svg)](https://github.com/Scienith/Scienith-cli-llm-switcher/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

**🌍 Languages**: [English](README.md) | [中文](README_zh.md) | [日本語](README_ja.md) | 한국어 | [Français](README_fr.md) | [Deutsch](README_de.md) | [Español](README_es.md) | [Русский](README_ru.md) | [العربية](README_ar.md)

</div>

**DeepSeek, Qwen, Zhipu GLM, Kimi을 한 번의 명령으로 전환**, Claude Code 및 호환 CLI 도구에 완벽 대응.

## 🚀 빠른 시작

```bash
# 클론 및 설정
git clone https://github.com/Scienith/Scienith-cli-llm-switcher
cd cli-llm-switcher
./install.sh
source ~/.bashrc  # 또는 source ~/.zshrc (Zsh 사용자)

# 제공업체의 API 키 구성
lms config
# 프롬프트에 따라 API 키 입력 및 기본 모델 선택

# Zhipu GLM으로 전환
lms switch zhipu

# 현재 제공업체로 Claude 실행
lms run claude
```

## 핵심 기능

- **🔄 멀티 제공업체 지원**: DeepSeek, Qwen, Zhipu GLM-4.5, Kimi
- **🌍 크로스 플랫폼 호환**: macOS, Linux, Windows (Git Bash/Cygwin)
- **🔧 스마트 셸 통합**: bash, zsh, fish 자동 감지 및 통합
- **⚙️ 대화형 구성 마법사**: 안전한 API 키 입력, 모델 선택
- **📦 완전한 설치/제거**: 원클릭 설치, 깔끔한 제거
- **🌐 다국어 문서**: 영어 및 중국어 문서 지원

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

## 기여

기여를 환영합니다! 언제든지 Pull Request를 제출해 주세요.

## 라이선스

이 프로젝트는 MIT 라이선스 하에 라이선스가 부여됩니다 - 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

---

**도움이 필요하신가요?** 자세한 가이드와 문제 해결을 위해 전체 문서를 확인하세요.