<div align="center">

<img src="assets/images/logo/logo.jpeg" alt="Conmutador CLI LLM" width="50%">

# Conmutador CLI LLM

*Una herramienta de línea de comandos para cambiar sin problemas entre múltiples proveedores LLM*

[![Version](https://img.shields.io/badge/version-v0.1.0a2-blue.svg)](https://github.com/Scienith/Scienith-cli-llm-switcher/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

**🌍 Languages**: [English](README.md) | [中文](README_zh.md) | [日本語](README_ja.md) | [한국어](README_ko.md) | [Français](README_fr.md) | [Deutsch](README_de.md) | Español | [Русский](README_ru.md) | [العربية](README_ar.md)

</div>

**Cambia entre DeepSeek, Qwen, Zhipu GLM, Kimi** con un solo comando al usar Claude Code o herramientas CLI compatibles.

## 🚀 Inicio rápido

```bash
# Clonar y configurar
git clone https://github.com/Scienith/Scienith-cli-llm-switcher
cd cli-llm-switcher
./install.sh
source ~/.bashrc  # o source ~/.zshrc (para Zsh)

# Configurar claves API de proveedores
lms config
# Sigue las indicaciones para ingresar la clave API y seleccionar el modelo predeterminado

# Cambiar a Zhipu GLM
lms switch zhipu

# Ejecutar Claude con el proveedor actual
lms run claude
```

## Características principales

- **🔄 Soporte multi-proveedor**: DeepSeek, Qwen, Zhipu GLM-4.5, Kimi
- **🌍 Compatible multiplataforma**: macOS, Linux, Windows (Git Bash/Cygwin)
- **🔧 Integración inteligente de shell**: Detección e integración automática de bash, zsh, fish
- **⚙️ Asistente de configuración interactivo**: Entrada segura de claves API, selección de modelos
- **📦 Instalación/desinstalación completa**: Instalación con un clic, eliminación limpia
- **🌐 Documentación multiidioma**: Soporte de documentación en inglés y chino

## Supported Providers

| Provider | Models | API Registration |
|----------|--------|------------------|
| **Zhipu GLM** | glm-4.5, glm-4.5-air | [China](https://bigmodel.cn/) \| [International](https://z.ai/model-api) |
| **DeepSeek** | deepseek-chat | [Apply](https://platform.deepseek.com/) |
| **Alibaba-Int** | qwen3-coder-plus, qwen3-coder-flash | [Apply](https://modelstudio.console.alibabacloud.com/) |
| **Alibaba** | qwen3-coder-plus, qwen3-coder-flash | [Apply](https://bailian.console.aliyun.com/) |
| **Kimi (Moonshot AI)** | K2-Instruct-0905 | [Apply](https://platform.moonshot.ai/) |


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

## Contribución

¡Las contribuciones son bienvenidas! No dudes en enviar un Pull Request.

## Agradecimientos

Agradecimientos especiales a **Haidong Ji** por la inspiración original y los scripts iniciales que llevaron a este proyecto. Haidong es coautor de tres libros de texto clásicos de SQL Server y sus ideas fueron invaluables para dar forma a esta herramienta.

🔗 **Conoce más sobre Haidong Ji**: https://www.haidongji.com/about-me/

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - consulta el archivo [LICENSE](LICENSE) para más detalles.

---

**¿Necesitas ayuda?** Consulta la documentación completa para guías detalladas y solución de problemas.