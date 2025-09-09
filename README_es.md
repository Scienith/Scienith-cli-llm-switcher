<div align="center">

<img src="assets/images/logo/logo.jpeg" alt="cli-llm-switcher" width="50%">

# cli-llm-switcher

*Una herramienta de línea de comandos para cambiar sin problemas entre múltiples proveedores LLM*

[![Version](https://img.shields.io/badge/version-v0.3.1-blue.svg)](https://github.com/Scienith/Scienith-cli-llm-switcher/releases)
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
- **Configuración de doble modelo Claude Code**: Modelo principal para tareas complejas, modelo rápido para tareas simples - optimiza inteligentemente rendimiento y costo


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

---

**¿Necesitas ayuda?** Consulta la documentación completa para guías detalladas y solución de problemas.