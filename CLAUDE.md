# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CLI LLM Switcher is a TypeScript-based tool that manages environment variables to switch between different LLM providers for use with Claude Code. The tool provides isolated configuration that doesn't affect the native Claude Code setup and supports per-session provider switching.

## Key Commands

### Development & Build
```bash
# Build TypeScript to JavaScript
npm run build

# Build without bundling (used by install.sh)
node build-simple.js

# Generate multi-language README files from i18n data
npm run generate-readme

# Validate i18n translations
npm run validate-i18n
```

### Installation & Testing
```bash
# Install locally (creates shell function wrapper)
./install.sh

# Uninstall completely
./uninstall.sh

# Test commands directly (bypasses shell function)
./bin/llm-switch status
./bin/llm-switch list
./bin/llm-switch config deepseek

# Debug environment variable switching
bash -x ./bin/llm-switch switch deepseek
```

### Publishing
```bash
# Build and publish to npm
npm run build
npm publish

# Create GitHub release with tag
git tag v0.x.x
git push origin main --tags
```

## Architecture Overview

### TypeScript/Node.js Architecture

The project is built with TypeScript and compiled to CommonJS for Node.js compatibility:

1. **Entry Points**
   - `bin/llm-switch`: Node.js launcher that finds and loads the installed package
   - `dist/cli.js`: Main CLI entry compiled from `src/cli.ts`

2. **Core Modules**
   - `src/core/types.ts`: Single source of truth for provider configurations via `PROVIDER_CONFIGS`
   - `src/core/ConfigManager.ts`: Manages user configuration in `~/.llm-switch/providers.json`
   - `src/core/ProviderManager.ts`: Handles provider switching and environment variable generation
   - `src/commands/*.ts`: Command implementations (config, status, run)

3. **Configuration Storage**
   - User configs: `~/.llm-switch/providers.json`
   - Last provider state: `~/.llm-switch/.last_provider`

### Shell Integration Strategy

The tool uses a shell function wrapper installed in `~/.bashrc`/`~/.zshrc` that:
- Intercepts `llm-switch` and `lms` commands
- Evaluates environment export commands for provider switching
- Passes through info commands (status, list, help) directly
- Launches CLI tools (claude, qwen) with the configured provider

### Provider Configuration System

All providers are defined in `src/core/types.ts`:
```typescript
export const PROVIDER_CONFIGS: Record<string, ProviderConfig> = {
  [PROVIDER_KEYS.DEEPSEEK]: { ... },
  [PROVIDER_KEYS.ALIBABACLOUD_INT]: { ... },
  // etc.
}

export const CONFIGURABLE_PROVIDERS = [
  PROVIDER_KEYS.DEEPSEEK,
  PROVIDER_KEYS.ALIBABACLOUD_INT,
  PROVIDER_KEYS.ALIBABACLOUD,
  PROVIDER_KEYS.KIMI,
  PROVIDER_KEYS.ZHIPU
];
```

### Environment Variable Mapping

Provider types determine which environment variables are set:
- **Anthropic-compatible**: Sets `ANTHROPIC_BASE_URL`, `ANTHROPIC_AUTH_TOKEN`, `ANTHROPIC_MODEL`, `ANTHROPIC_SMALL_FAST_MODEL`
- **OpenAI-compatible**: Additionally sets `OPENAI_API_KEY`, `OPENAI_BASE_URL`, `OPENAI_MODEL`
- **Native Claude**: Only sets `ANTHROPIC_API_KEY`

## Critical Implementation Details

### Build Process
The build uses esbuild for fast TypeScript transpilation without bundling:
- Maintains original file structure in `dist/`
- Preserves CommonJS format for Node.js compatibility
- No bundling to keep debugging simple

### Version Detection
Version is read from `package.json` at runtime, not from git tags. The `src/utils/version.ts` module handles version display.

### Provider Switching Flow
1. User runs `lms switch deepseek`
2. Shell function captures the command
3. CLI outputs environment export commands to stdout
4. Shell function evaluates these commands via `eval`
5. Environment variables are set for the current session

### API Key Configuration
- Interactive prompt using `readline-sync` with password masking
- Stored in plaintext in `~/.llm-switch/providers.json` (user's home directory)
- Validated before switching providers

## Common Issues & Solutions

1. **Wrong version displayed**: Usually caused by npm link conflicts. Uninstall globally and reinstall.

2. **Only one provider shows in config**: Build issue where `CONFIGURABLE_PROVIDERS` wasn't updated. Rebuild and republish.

3. **"Command not found" after install**: Shell configuration not reloaded. Run `source ~/.bashrc` or `source ~/.zshrc`.

4. **Provider switch doesn't persist**: Environment variables are session-specific by design. Each new terminal needs to switch again.

## i18n System

Multi-language documentation is generated from YAML templates:
- Source files: `docs/_data/i18n/*.yml`
- Generator: `scripts/generate-readme.js`
- Output: `README_*.md` files in project root

Provider information is pulled from `PROVIDER_CONFIGS` to maintain single source of truth.