# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CLI LLM Switcher is a shell-based tool that manages environment variables to switch between different LLM providers (DeepSeek, Qwen, Zhipu GLM, Kimi, Claude, OpenAI, Groq) for use with Claude Code and compatible CLI tools. Provider switching is temporary and only affects the current shell session.

## Key Commands

### Development & Testing
```bash
# Generate multi-language README files from i18n data
npm run generate-readme

# Install the tool (creates shell function wrapper)
./install.sh

# Uninstall completely
./uninstall.sh

# Test provider switching directly (bypasses shell function)
./bin/llm-switch deepseek

# Test with debug output
bash -x ./bin/llm-switch claude
```

### Usage Commands
```bash
# Configure a provider interactively
llm-switch config <provider>

# Switch provider (requires eval in shell)
llm-switch <provider>

# Launch CLI with remembered provider
llm-switch claude  # Switches to last used provider and launches claude
llm-switch qwen    # Switches to last used provider and launches qwen

# Show available models for a provider
llm-switch models <provider>
```

## Architecture Overview

### Two-Layer Execution Model

The tool operates in two layers:

1. **Shell Function Layer** (`~/.bashrc` or `~/.zshrc`)
   - Intercepts `llm-switch` commands
   - Uses `eval` to execute environment variable exports for provider switching
   - Special handling for `claude` and `qwen` commands (direct execution, no eval)

2. **Core Script Layer** (`bin/llm-switch`)
   - Outputs `export` and `unset` commands for shell evaluation
   - Manages provider configurations via INI files
   - Tracks last used provider for CLI tools

### Key Components

- **bin/llm-switch**: Main entry point script
- **src/providers.sh**: Provider switching logic, environment variable management
- **src/config.sh**: Configuration management, INI file operations
- **src/ini_parser.sh**: INI file parsing utilities
- **config/providers.ini**: User's API keys and provider settings
- **config/.last_*_provider**: Tracks last used provider for each CLI tool

### Environment Variable Strategy

For Claude Code compatibility, the tool sets different environment variables based on provider type:

- **Claude native**: Sets `ANTHROPIC_API_KEY`
- **OpenAI-compatible**: Sets `OPENAI_API_KEY`, `OPENAI_BASE_URL`, `OPENAI_MODEL`
- **Anthropic-compatible**: Additionally sets `ANTHROPIC_BASE_URL`, `ANTHROPIC_AUTH_TOKEN`, `ANTHROPIC_MODEL`, `ANTHROPIC_SMALL_FAST_MODEL`

Reference: https://docs.bigmodel.cn/cn/guide/develop/claude

## Critical Implementation Details

### Shell Function Wrapper Issue
The shell function in `~/.bashrc`/`~/.zshrc` must handle three cases differently:
1. **Info commands** (status, list, help): Direct execution
2. **CLI launch** (claude, qwen): Direct execution (no eval)
3. **Provider switch**: Eval the output to set environment variables

### INI Variable Format
INI parser converts keys to variables with format: `INI_${section}_${key}`
- Dots and dashes in names are replaced with underscores
- Example: `[zhipu]` section with `api_key` becomes `INI_zhipu_api_key`

### Error Output Handling
All error messages must redirect to stderr (`>&2`) to prevent eval from executing them as commands.

### Provider Last State
- Stored in `config/.last_claude_provider` and `config/.last_qwen_provider`
- Updated whenever a provider switch succeeds
- Read when launching CLI tools to restore last used provider

## Common Issues & Solutions

1. **"command not found: Error:"** - Error messages being eval'd as commands. Ensure all errors redirect to stderr.

2. **Provider name empty in error** - INI variables not loading correctly or `$resolved_provider` is empty.

3. **"Successfully switched" but no launch** - Shell function using old version. User needs to `source ~/.zshrc` or restart shell.

4. **API key not configured** - Provider exists but API key is empty in `providers.ini`.

## Testing Changes

When modifying provider switching logic:
1. Test direct script execution: `./bin/llm-switch <provider>`
2. Test through shell function: `llm-switch <provider>`
3. Test CLI launch: `llm-switch claude`
4. Verify environment variables: `llm-switch deepseek && env | grep OPENAI`

## i18n Documentation

Documentation is generated from YAML files in `docs/_data/i18n/`:
- Modify language files (en.yml, zh.yml, etc.) for content changes
- Run `npm run generate-readme` to regenerate all README files
- Template logic is in `scripts/generate-readme.js`