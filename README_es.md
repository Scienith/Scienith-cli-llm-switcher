<div align="center">

<img src="assets/images/logo/logo.jpeg" alt="cli-llm-switcher" width="50%">

# cli-llm-switcher

*Una herramienta de línea de comandos para cambiar sin problemas entre múltiples proveedores LLM*

[![Version](https://img.shields.io/badge/version-v0.5.1-blue.svg)](https://github.com/Scienith/cli-llm-switcher/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

**🌍 Languages**: [English](README.md) | [中文](README_zh.md) | [日本語](README_ja.md) | [한국어](README_ko.md) | [Français](README_fr.md) | [Deutsch](README_de.md) | Español | [Русский](README_ru.md) | [العربية](README_ar.md)

</div>

**Cambia entre DeepSeek, Qwen, Zhipu GLM, Kimi** con un solo comando al usar Claude Code o herramientas CLI compatibles.

## 💡 💡 ¿Por qué elegir LLM Switcher?

### 🔒 Entorno de configuración aislado
- **Sin impacto en Claude Code nativo**: Tu configuración original de Claude permanece intacta
- **Cambio de proveedor por sesión**: Cada sesión de terminal puede usar diferentes proveedores

### 🎯 Mejores prácticas oficiales
- **Configuraciones recomendadas por proveedores**: Sigue las pautas de integración oficiales de cada proveedor
- **Configuración de doble modelo Claude Code**: Modelo principal para conversación/planificación/generación de código/razonamiento complejo, modelo rápido (Claude usa Haiku ej. 3.5 Haiku) para búsqueda de archivos/verificación de sintaxis y tareas auxiliares - optimiza inteligentemente rendimiento y costo


## 📋 Requisitos previos

Antes de instalar, asegúrese de tener Node.js (v16 o posterior) instalado:

### Instalar Node.js

**Opción 1 (Recomendada)**: Use nvm para gestionar Node.js fácilmente
  ```bash
  # Instalar nvm: https://github.com/nvm-sh/nvm#install--update-script
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
  # Reiniciar terminal, luego instalar la última versión de Node.js
  nvm install node
  nvm use node
  ```
**Opción 2**: Descargar desde [nodejs.org](https://nodejs.org/) (elegir versión LTS)

Verificar instalación:
```bash
node --version  # Debería mostrar v16.0.0 o superior
npm --version   # Debería mostrar la versión de npm
```

## Inicio rápido

```bash
# Instalar globalmente vía npm
npm install -g cli-llm-switcher

# Verificar instalación
lms --version

# Configurar claves API
lms config
# Siga las indicaciones para ingresar su clave API

# Comenzar a usar con Claude Code u otras herramientas
lms run claude
```

## 🤖 Integración de proveedores

### DeepSeek

<div align="center">
<img src="https://raw.githubusercontent.com/Scienith/cli-llm-switcher/main/assets/images/logo/deepseek_logo.png" alt="DeepSeek" width="200">
</div>

### Configuración de modelos
- **Modelo principal**: `deepseek-chat`
- **Modelo rápido**: `deepseek-chat`

### Obtener tu clave API
- **Plataforma**: [https://platform.deepseek.com/](https://platform.deepseek.com/)

---

### AlibabaCloud (International)

<div align="center">
<img src="https://raw.githubusercontent.com/Scienith/cli-llm-switcher/main/assets/images/logo/alibaba_cloud.png" alt="AlibabaCloud (International)" width="200">
</div>

### Configuración de modelos
- **Modelo principal**: `qwen3-coder-plus`
- **Modelo rápido**: `qwen3-coder-flash`

### Obtener tu clave API
- **🌍 Internacional**: [https://modelstudio.console.alibabacloud.com/](https://modelstudio.console.alibabacloud.com/)

---

### AlibabaCloud (China)

<div align="center">
<img src="https://raw.githubusercontent.com/Scienith/cli-llm-switcher/main/assets/images/logo/alibaba_cloud.png" alt="AlibabaCloud (China)" width="200">
</div>

### Configuración de modelos
- **Modelo principal**: `qwen3-coder-plus`
- **Modelo rápido**: `qwen3-coder-flash`

### Obtener tu clave API
- **🇨🇳 China**: [https://bailian.console.aliyun.com/](https://bailian.console.aliyun.com/)

---

### Moonshot AI

<div align="center">
<img src="https://raw.githubusercontent.com/Scienith/cli-llm-switcher/main/assets/images/logo/moonshot_logo.png" alt="Moonshot AI" width="200">
</div>

### Configuración de modelos
- **Modelo principal**: `kimi-k2-0905-preview`
- **Modelo rápido**: `kimi-k2-0905-preview`

### Obtener tu clave API
- **Plataforma**: [https://platform.moonshot.ai/](https://platform.moonshot.ai/)

---

### Zhipu GLM

<div align="center">
<img src="https://raw.githubusercontent.com/Scienith/cli-llm-switcher/main/assets/images/logo/zhipu.jpg" alt="Zhipu GLM" width="200">
</div>

### Configuración de modelos
- **Modelo principal**: `glm-4.5`
- **Modelo rápido**: `glm-4.5-air`

### Obtener tu clave API
- **🇨🇳 China**: [https://bigmodel.cn/](https://bigmodel.cn/)
- **🌍 Internacional**: [https://z.ai/model-api](https://z.ai/model-api)

---

### Grok Code Fast 1

<div align="center">
<img src="https://raw.githubusercontent.com/Scienith/cli-llm-switcher/main/assets/images/logo/xAI.png" alt="Grok Code Fast 1" width="200">
</div>

### Configuración de modelos
- **Modelo principal**: `grok-code-fast-1`
- **Modelo rápido**: `grok-code-fast-1`

###  Get Your API Key
-  **Platform**: [https://console.x.ai](https://console.x.ai)

---



## Desinstalación

### Desinstalación básica (mantiene configuración)

```bash
npm uninstall -g cli-llm-switcher
```

### Desinstalación completa (elimina todo)

Nota: Ejecuta `lms status` para ver la ruta del directorio de configuración antes de desinstalar.

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

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - consulta el archivo [LICENSE](LICENSE) para más detalles.

## Referencias

Guías oficiales de configuración de proveedores para integración de Claude Code:

- [DeepSeek Anthropic API Guide](https://api-docs.deepseek.com/guides/anthropic_api)
- [Alibaba Cloud Model Studio - Claude Code Integration](https://help.aliyun.com/zh/model-studio/claude-code)
- [Zhipu GLM - Claude Development Guide](https://docs.bigmodel.cn/cn/guide/develop/claude)

---

**¿Necesitas ayuda?** Consulta la documentación completa para guías detalladas y solución de problemas.