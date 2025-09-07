#!/bin/bash

set -e

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OS_TYPE=""
BIN_DIR=""
CONFIG_DIR=""
DATA_DIR=""
SHELL_TYPE=""
RC_FILE=""

COLOR_GREEN='\033[0;32m'
COLOR_BLUE='\033[0;34m'
COLOR_YELLOW='\033[1;33m'
COLOR_RED='\033[0;31m'
COLOR_RESET='\033[0m'

function print_banner() {
    echo -e "${COLOR_BLUE}"
    cat << 'EOF'
╔══════════════════════════════════════╗
║   LLM Switch Installer v0.1.0a1      ║
║   Multi-Provider LLM CLI Switcher    ║
╚══════════════════════════════════════╝
EOF
    echo -e "${COLOR_RESET}"
}

function detect_os() {
    case "$OSTYPE" in
        darwin*)  
            OS_TYPE="macos"
            echo -e "${COLOR_GREEN}Detected OS: macOS${COLOR_RESET}"
            ;;
        linux*)   
            OS_TYPE="linux"
            echo -e "${COLOR_GREEN}Detected OS: Linux${COLOR_RESET}"
            ;;
        msys*|cygwin*|mingw*|win32*)
            OS_TYPE="windows"
            echo -e "${COLOR_GREEN}Detected OS: Windows (Git Bash/Cygwin)${COLOR_RESET}"
            ;;
        *)        
            OS_TYPE="unknown"
            echo -e "${COLOR_YELLOW}Warning: Unknown OS type: $OSTYPE. Defaulting to Unix-like behavior.${COLOR_RESET}"
            OS_TYPE="linux"  # Default to Linux behavior
            ;;
    esac
}

function set_install_paths() {
    if [[ "$OS_TYPE" == "windows" ]]; then
        # Windows paths
        BIN_DIR="$USERPROFILE/.local/bin"
        CONFIG_DIR="$APPDATA/llm-switch"
        DATA_DIR="$LOCALAPPDATA/llm-switch"
        
        # Convert Windows paths to Unix-style for Git Bash
        if [[ "$OSTYPE" == "msys"* ]]; then
            BIN_DIR=$(cygpath -u "$BIN_DIR" 2>/dev/null || echo "$USERPROFILE/.local/bin")
            CONFIG_DIR=$(cygpath -u "$CONFIG_DIR" 2>/dev/null || echo "$APPDATA/llm-switch")
            DATA_DIR=$(cygpath -u "$DATA_DIR" 2>/dev/null || echo "$LOCALAPPDATA/llm-switch")
        fi
    else
        # macOS/Linux paths (XDG Standard)
        BIN_DIR="$HOME/.local/bin"
        CONFIG_DIR="${XDG_CONFIG_HOME:-$HOME/.config}/llm-switch"
        DATA_DIR="${XDG_DATA_HOME:-$HOME/.local/share}/llm-switch"
    fi
    
    echo -e "${COLOR_GREEN}Installation paths:${COLOR_RESET}"
    echo -e "  Executable: ${COLOR_BLUE}$BIN_DIR${COLOR_RESET}"
    echo -e "  Configuration: ${COLOR_BLUE}$CONFIG_DIR${COLOR_RESET}"
    echo -e "  Data: ${COLOR_BLUE}$DATA_DIR${COLOR_RESET}"
}

function detect_shell() {
    # Detect shell based on $SHELL environment variable first (user's default shell)
    if [[ "$SHELL" == *"zsh"* ]]; then
        SHELL_TYPE="zsh"
        # Support for Oh My Zsh and standard zsh
        if [[ -f "${HOME}/.zshrc" ]]; then
            RC_FILE="${HOME}/.zshrc"
        elif [[ -f "${HOME}/.zsh_profile" ]]; then
            RC_FILE="${HOME}/.zsh_profile"
        else
            RC_FILE="${HOME}/.zshrc"
        fi
    elif [[ "$SHELL" == *"bash"* ]]; then
        SHELL_TYPE="bash"
        if [[ -f "${HOME}/.bashrc" ]]; then
            RC_FILE="${HOME}/.bashrc"
        elif [[ -f "${HOME}/.bash_profile" ]]; then
            RC_FILE="${HOME}/.bash_profile"
        else
            RC_FILE="${HOME}/.bashrc"
        fi
    elif [[ "$SHELL" == *"fish"* ]]; then
        SHELL_TYPE="fish"
        RC_FILE="${HOME}/.config/fish/config.fish"
    else
        # Fallback to detecting current shell environment
        if [[ -n "$ZSH_VERSION" ]]; then
            SHELL_TYPE="zsh"
            RC_FILE="${HOME}/.zshrc"
        elif [[ -n "$BASH_VERSION" ]]; then
            SHELL_TYPE="bash"
            RC_FILE="${HOME}/.bashrc"
        else
            echo -e "${COLOR_YELLOW}Warning: Unknown shell ($SHELL). Defaulting to bash configuration.${COLOR_RESET}"
            SHELL_TYPE="bash"
            RC_FILE="${HOME}/.bashrc"
        fi
    fi
    
    echo -e "${COLOR_GREEN}Detected shell: ${SHELL_TYPE}${COLOR_RESET}"
    echo -e "${COLOR_GREEN}Configuration file: ${RC_FILE}${COLOR_RESET}"
}

function create_install_dirs() {
    echo -e "${COLOR_BLUE}Creating installation directories...${COLOR_RESET}"
    
    # Create all necessary directories
    mkdir -p "$BIN_DIR"
    mkdir -p "$DATA_DIR/src"
    mkdir -p "$DATA_DIR/templates"
    mkdir -p "$CONFIG_DIR"
    
    echo -e "${COLOR_GREEN}✓ Directories created${COLOR_RESET}"
}

function install_script() {
    echo -e "${COLOR_BLUE}Installing llm-switch...${COLOR_RESET}"
    
    # Copy source files to data directory
    cp -r "$PROJECT_ROOT/src/"* "$DATA_DIR/src/"
    echo -e "${COLOR_GREEN}✓ Source files copied${COLOR_RESET}"
    
    # Copy template files only
    cp "$PROJECT_ROOT/config/providers.ini.template" "$DATA_DIR/templates/"
    echo -e "${COLOR_GREEN}✓ Template files copied${COLOR_RESET}"
    
    cat > "$BIN_DIR/llm-switch" << 'EOF'
#!/bin/bash

# Set locale to handle UTF-8 characters properly
export LC_ALL=en_US.UTF-8 2>/dev/null || export LC_ALL=C.UTF-8 2>/dev/null || export LC_ALL=C

# Detect OS and set paths dynamically
case "$OSTYPE" in
    msys*|cygwin*|mingw*|win32*)
        # Windows (Git Bash/Cygwin)
        CONFIG_DIR="$APPDATA/llm-switch"
        DATA_DIR="$LOCALAPPDATA/llm-switch"
        # Convert to Unix-style paths if needed
        if command -v cygpath >/dev/null 2>&1; then
            CONFIG_DIR=$(cygpath -u "$CONFIG_DIR" 2>/dev/null || echo "$APPDATA/llm-switch")
            DATA_DIR=$(cygpath -u "$DATA_DIR" 2>/dev/null || echo "$LOCALAPPDATA/llm-switch")
        fi
        ;;
    *)
        # macOS/Linux (XDG Standard)
        CONFIG_DIR="${XDG_CONFIG_HOME:-$HOME/.config}/llm-switch"
        DATA_DIR="${XDG_DATA_HOME:-$HOME/.local/share}/llm-switch"
        ;;
esac

# Set up environment variables for global installation
export CONFIG_DIR="$CONFIG_DIR"
export CONFIG_FILE="$CONFIG_DIR/providers.ini"
export CONFIG_TEMPLATE="$DATA_DIR/templates/providers.ini.template"
export CURRENT_PROVIDER_FILE="$CONFIG_DIR/current_provider"

# Source the main functionality
source "$DATA_DIR/src/providers.sh"
source "$DATA_DIR/src/config.sh"

VERSION="0.1.0a1"

function show_usage() {
    cat << USAGE
LLM Switch v${VERSION} - CLI Tool for Switching Between LLM Providers

Usage: llm-switch [COMMAND] [OPTIONS]

Commands:
  <provider>     Switch to specified provider (qwen, zhipu, kimi, deepseek, claude, openai, groq)
  status         Show current active provider
  list           List all available providers
  models         Show all available models
  models <name>  Show models for specific provider
  config         Configure API keys for providers
  config <name>  Configure specific provider
  help           Show this help message
  version        Show version information

Shortcuts:
  q, Q     Switch to Qwen
  z, Z     Switch to Zhipu
  k, K     Switch to Kimi K2
  d, D     Switch to DeepSeek
  c, C     Switch to Claude
  o, O     Switch to OpenAI
  g, G     Switch to Groq

Examples:
  llm-switch deepseek        # Switch to DeepSeek
  llm-switch d               # Switch to DeepSeek (shortcut)
  llm-switch status          # Show current provider
  llm-switch models          # Show all available models
  llm-switch models deepseek # Show DeepSeek models
  llm-switch config deepseek # Configure DeepSeek API key
  
After switching, use 'claude' or 'qwen' command to interact with the selected LLM.

Configuration stored in: $CONFIG_DIR/providers.ini
USAGE
}

function show_version() {
    echo "LLM Switch v${VERSION}"
    echo "GitHub: https://github.com/Scienith/Scienith-cli-llm-switcher"
}

function show_status() {
    show_current_status
}

function switch_provider_command() {
    local provider="$1"
    
    # Use the new switch_provider function from providers.sh
    switch_provider "$provider"
}

if [[ $# -eq 0 ]]; then
    show_usage
    exit 0
fi

case "$1" in
    help|--help|-h)
        show_usage
        ;;
    version|--version|-v)
        show_version
        ;;
    status)
        show_status
        ;;
    list)
        list_providers
        ;;
    models)
        if [[ -n "$2" ]]; then
            show_provider_models "$2"
        else
            show_all_models
        fi
        ;;
    config)
        if [[ -n "$2" ]]; then
            configure_provider "$2"
        else
            configure_all
        fi
        ;;
    *)
        switch_provider_command "$1"
        ;;
esac
EOF
    
    # Set executable permissions (Unix systems only)
    if [[ "$OS_TYPE" != "windows" ]]; then
        chmod +x "$BIN_DIR/llm-switch"
    fi
    
    echo -e "${COLOR_GREEN}✓ llm-switch executable created${COLOR_RESET}"
}

function setup_shell_integration() {
    echo -e "${COLOR_BLUE}Setting up shell integration...${COLOR_RESET}"
    
    local shell_config=""
    
    if [[ "$SHELL_TYPE" == "bash" ]] || [[ "$SHELL_TYPE" == "zsh" ]]; then
        shell_config='
# LLM Switch Configuration
export PATH="'"$BIN_DIR"':$PATH"

llm-switch() {
    if [[ $# -eq 0 ]]; then
        command llm-switch
        return
    fi
    
    case "$1" in
        status|list|models|config|help|version|--help|-h|--version|-v)
            command llm-switch "$@"
            ;;
        *)
            eval "$(command llm-switch "$@" 2>/dev/null)"
            local exit_code=$?
            if [[ $exit_code -eq 0 ]]; then
                echo "Successfully switched LLM provider"
            else
                command llm-switch "$@"
            fi
            ;;
    esac
}

# Optional: Add completion
if [[ -n "$BASH_VERSION" ]]; then
    complete -W "qwen zhipu kimi deepseek claude openai groq status list models config help version" llm-switch
elif [[ -n "$ZSH_VERSION" ]]; then
    compdef "_arguments \"1:provider:(qwen zhipu kimi deepseek claude openai groq status list models config help version)\"" llm-switch
fi
'
    elif [[ "$SHELL_TYPE" == "fish" ]]; then
        shell_config='
# LLM Switch Configuration
set -gx PATH "'"$BIN_DIR"'" $PATH

function llm-switch
    if test (count $argv) -eq 0
        command llm-switch
        return
    end
    
    switch $argv[1]
        case status list models config help version --help -h --version -v
            command llm-switch $argv
        case "*"
            eval (command llm-switch $argv 2>/dev/null)
            if test $status -eq 0
                echo "Successfully switched LLM provider"
            else
                command llm-switch $argv
            end
    end
end

# Add completion
complete -c llm-switch -a "qwen zhipu kimi deepseek claude openai groq status list models config help version"
'
    fi
    
    if ! grep -q "LLM Switch Configuration" "$RC_FILE" 2>/dev/null; then
        echo -e "${COLOR_BLUE}Adding shell integration to ${RC_FILE}${COLOR_RESET}"
        echo "$shell_config" >> "$RC_FILE"
    else
        echo -e "${COLOR_YELLOW}Shell integration already exists in ${RC_FILE}${COLOR_RESET}"
    fi
}

function initial_setup() {
    echo -e "${COLOR_BLUE}Would you like to configure LLM providers now? (y/N): ${COLOR_RESET}"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        "$BIN_DIR/llm-switch" config
    else
        echo -e "${COLOR_YELLOW}You can configure providers later with: llm-switch config${COLOR_RESET}"
    fi
}

function print_success() {
    echo -e "${COLOR_GREEN}"
    cat << 'EOF'

╔══════════════════════════════════════╗
║    Installation Complete! 🎉         ║
╚══════════════════════════════════════╝
EOF
    echo -e "${COLOR_RESET}"
    
    echo -e "${COLOR_GREEN}LLM Switch has been successfully installed!${COLOR_RESET}"
    echo ""
    echo -e "${COLOR_BLUE}Automatically reloading shell configuration...${COLOR_RESET}"
    
    # Auto-reload shell configuration
    if [[ -f "$RC_FILE" ]]; then
        if source "$RC_FILE" 2>/dev/null; then
            echo -e "${COLOR_GREEN}✓ Shell configuration reloaded successfully${COLOR_RESET}"
        else
            echo -e "${COLOR_YELLOW}Warning: Could not auto-reload shell config. Please run manually:${COLOR_RESET}"
            echo -e "   ${COLOR_BLUE}source ${RC_FILE}${COLOR_RESET}"
        fi
    fi
    
    echo ""
    echo "Next steps:"
    echo "1. Configure your LLM providers:"
    echo -e "   ${COLOR_BLUE}llm-switch config${COLOR_RESET}"
    echo ""
    echo "2. Switch to a provider:"
    echo -e "   ${COLOR_BLUE}llm-switch deepseek${COLOR_RESET}"
    echo ""
    echo "3. Use with Claude Code or Qwen CLI:"
    echo -e "   ${COLOR_BLUE}claude${COLOR_RESET} or ${COLOR_BLUE}qwen${COLOR_RESET}"
    echo ""
    echo "For help, run: llm-switch help"
}

function main() {
    print_banner
    detect_os
    set_install_paths
    detect_shell
    create_install_dirs
    install_script
    setup_shell_integration
    initial_setup
    print_success
}

main "$@"