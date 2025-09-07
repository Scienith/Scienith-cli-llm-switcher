#!/bin/bash

set -e

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
    echo -e "${COLOR_RED}"
    cat << 'EOF'
╔══════════════════════════════════════╗
║   LLM Switch Uninstaller v0.1.0a1    ║
║   Complete Removal Tool              ║
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
            OS_TYPE="linux"
            ;;
    esac
}

function set_paths() {
    if [[ "$OS_TYPE" == "windows" ]]; then
        BIN_DIR="$USERPROFILE/.local/bin"
        CONFIG_DIR="$APPDATA/llm-switch"
        DATA_DIR="$LOCALAPPDATA/llm-switch"
        
        if [[ "$OSTYPE" == "msys"* ]]; then
            BIN_DIR=$(cygpath -u "$BIN_DIR" 2>/dev/null || echo "$USERPROFILE/.local/bin")
            CONFIG_DIR=$(cygpath -u "$CONFIG_DIR" 2>/dev/null || echo "$APPDATA/llm-switch")
            DATA_DIR=$(cygpath -u "$DATA_DIR" 2>/dev/null || echo "$LOCALAPPDATA/llm-switch")
        fi
    else
        BIN_DIR="$HOME/.local/bin"
        CONFIG_DIR="${XDG_CONFIG_HOME:-$HOME/.config}/llm-switch"
        DATA_DIR="${XDG_DATA_HOME:-$HOME/.local/share}/llm-switch"
    fi
    
    echo -e "${COLOR_BLUE}Paths to be cleaned:${COLOR_RESET}"
    echo -e "  Executable: ${COLOR_RED}$BIN_DIR/llm-switch${COLOR_RESET}"
    echo -e "  Configuration: ${COLOR_RED}$CONFIG_DIR${COLOR_RESET}"
    echo -e "  Data: ${COLOR_RED}$DATA_DIR${COLOR_RESET}"
}

function detect_shell() {
    # Detect shell based on $SHELL environment variable first
    if [[ "$SHELL" == *"zsh"* ]]; then
        SHELL_TYPE="zsh"
        if [[ -f "${HOME}/.zshrc" ]]; then
            RC_FILE="${HOME}/.zshrc"
        else
            RC_FILE="${HOME}/.zsh_profile"
        fi
    elif [[ "$SHELL" == *"bash"* ]]; then
        SHELL_TYPE="bash"
        if [[ -f "${HOME}/.bashrc" ]]; then
            RC_FILE="${HOME}/.bashrc"
        else
            RC_FILE="${HOME}/.bash_profile"
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
            echo -e "${COLOR_YELLOW}Warning: Unknown shell ($SHELL). Will check common shell config files.${COLOR_RESET}"
            SHELL_TYPE="unknown"
        fi
    fi
    
    echo -e "${COLOR_GREEN}Detected shell: ${SHELL_TYPE}${COLOR_RESET}"
    if [[ -n "$RC_FILE" ]]; then
        echo -e "${COLOR_GREEN}Configuration file: ${RC_FILE}${COLOR_RESET}"
    fi
}

function check_installation() {
    echo -e "${COLOR_BLUE}Checking current installation...${COLOR_RESET}"
    
    local found_files=0
    
    # Check executable
    if [[ -f "$BIN_DIR/llm-switch" ]]; then
        echo -e "  ${COLOR_YELLOW}✓${COLOR_RESET} Executable found: $BIN_DIR/llm-switch"
        found_files=$((found_files + 1))
    else
        echo -e "  ✗ Executable not found"
    fi
    
    # Check data directory
    if [[ -d "$DATA_DIR" ]]; then
        echo -e "  ${COLOR_YELLOW}✓${COLOR_RESET} Data directory found: $DATA_DIR"
        found_files=$((found_files + 1))
    else
        echo -e "  ✗ Data directory not found"
    fi
    
    # Check config directory
    if [[ -d "$CONFIG_DIR" ]]; then
        echo -e "  ${COLOR_YELLOW}✓${COLOR_RESET} Config directory found: $CONFIG_DIR"
        if [[ -f "$CONFIG_DIR/providers.ini" ]]; then
            echo -e "    ${COLOR_YELLOW}⚠${COLOR_RESET} Contains your API keys and configuration"
        fi
        found_files=$((found_files + 1))
    else
        echo -e "  ✗ Config directory not found"
    fi
    
    # Check shell integration
    local shell_configs=("$HOME/.bashrc" "$HOME/.bash_profile" "$HOME/.zshrc" "$HOME/.zsh_profile" "$HOME/.config/fish/config.fish")
    for config_file in "${shell_configs[@]}"; do
        if [[ -f "$config_file" ]] && grep -q "LLM Switch Configuration" "$config_file" 2>/dev/null; then
            echo -e "  ${COLOR_YELLOW}✓${COLOR_RESET} Shell integration found in: $config_file"
            found_files=$((found_files + 1))
        fi
    done
    
    if [[ $found_files -eq 0 ]]; then
        echo -e "${COLOR_GREEN}No LLM Switch installation found.${COLOR_RESET}"
        exit 0
    fi
    
    echo -e "\n${COLOR_YELLOW}Found $found_files components to remove.${COLOR_RESET}"
}

function confirm_removal() {
    echo -e "\n${COLOR_RED}⚠  WARNING: This will completely remove LLM Switch and ALL your configuration!${COLOR_RESET}"
    echo -e "${COLOR_YELLOW}This includes:${COLOR_RESET}"
    echo "  • All API keys and provider configurations"
    echo "  • Shell integration functions"
    echo "  • All application data"
    echo ""
    echo -e "${COLOR_BLUE}Backup copies of shell config files will be created automatically.${COLOR_RESET}"
    echo ""
    
    local response
    while true; do
        echo -n "Are you sure you want to proceed? [y/N]: "
        read -r response
        case "$response" in
            [Yy]|[Yy][Ee][Ss])
                return 0
                ;;
            [Nn]|[Nn][Oo]|"")
                echo "Uninstallation cancelled."
                exit 0
                ;;
            *)
                echo "Please answer yes or no."
                ;;
        esac
    done
}

function backup_shell_configs() {
    echo -e "${COLOR_BLUE}Creating backup copies of shell configuration files...${COLOR_RESET}"
    
    local timestamp=$(date +%Y%m%d_%H%M%S)
    local shell_configs=("$HOME/.bashrc" "$HOME/.bash_profile" "$HOME/.zshrc" "$HOME/.zsh_profile" "$HOME/.config/fish/config.fish")
    
    for config_file in "${shell_configs[@]}"; do
        if [[ -f "$config_file" ]] && grep -q "LLM Switch Configuration" "$config_file" 2>/dev/null; then
            local backup_file="${config_file}.backup_${timestamp}"
            cp "$config_file" "$backup_file"
            echo -e "  ${COLOR_GREEN}✓${COLOR_RESET} Backed up: $config_file → $backup_file"
        fi
    done
}

function remove_files() {
    echo -e "${COLOR_BLUE}Removing LLM Switch files...${COLOR_RESET}"
    
    # Remove executable
    if [[ -f "$BIN_DIR/llm-switch" ]]; then
        rm -f "$BIN_DIR/llm-switch"
        echo -e "  ${COLOR_GREEN}✓${COLOR_RESET} Removed executable"
    fi
    
    # Remove data directory
    if [[ -d "$DATA_DIR" ]]; then
        rm -rf "$DATA_DIR"
        echo -e "  ${COLOR_GREEN}✓${COLOR_RESET} Removed data directory"
    fi
    
    # Remove config directory
    if [[ -d "$CONFIG_DIR" ]]; then
        rm -rf "$CONFIG_DIR"
        echo -e "  ${COLOR_GREEN}✓${COLOR_RESET} Removed configuration directory"
    fi
}

function clean_shell_integration() {
    echo -e "${COLOR_BLUE}Cleaning shell integration...${COLOR_RESET}"
    
    local shell_configs=("$HOME/.bashrc" "$HOME/.bash_profile" "$HOME/.zshrc" "$HOME/.zsh_profile" "$HOME/.config/fish/config.fish")
    
    for config_file in "${shell_configs[@]}"; do
        if [[ -f "$config_file" ]] && grep -q "LLM Switch Configuration" "$config_file" 2>/dev/null; then
            # Remove LLM Switch configuration block
            if [[ "$OSTYPE" == "darwin"* ]]; then
                # macOS sed
                sed -i '' '/^# LLM Switch Configuration$/,/^$/d' "$config_file"
            else
                # GNU sed
                sed -i '/^# LLM Switch Configuration$/,/^$/d' "$config_file"
            fi
            
            # Also remove any duplicate llm-switch functions that might exist
            if [[ "$OSTYPE" == "darwin"* ]]; then
                sed -i '' '/^llm-switch()/,/^}$/d' "$config_file"
            else
                sed -i '/^llm-switch()/,/^}$/d' "$config_file"
            fi
            
            echo -e "  ${COLOR_GREEN}✓${COLOR_RESET} Cleaned: $config_file"
        fi
    done
}

function remove_environment_variables() {
    echo -e "${COLOR_BLUE}Note: Current session environment variables will persist until you restart your shell.${COLOR_RESET}"
    echo -e "Variables that may still be set:"
    echo "  • OPENAI_API_KEY, OPENAI_BASE_URL, OPENAI_MODEL"
    echo "  • ANTHROPIC_BASE_URL, ANTHROPIC_AUTH_TOKEN, ANTHROPIC_MODEL"
    echo ""
    echo -e "${COLOR_YELLOW}To clear them immediately, run: source ~/.zshrc (or your shell config file)${COLOR_RESET}"
}

function print_success() {
    echo -e "${COLOR_GREEN}"
    cat << 'EOF'

╔══════════════════════════════════════╗
║    Uninstallation Complete! ✓       ║
╚══════════════════════════════════════╝
EOF
    echo -e "${COLOR_RESET}"
    
    echo -e "${COLOR_GREEN}LLM Switch has been completely removed from your system.${COLOR_RESET}"
    echo ""
    echo "What was removed:"
    echo "  • Executable file and all source code"
    echo "  • All configuration files and API keys"
    echo "  • Shell integration functions"
    echo ""
    echo -e "${COLOR_BLUE}To complete the cleanup:${COLOR_RESET}"
    echo "  1. Restart your terminal or run: source ~/.zshrc"
    echo "  2. Remove any remaining environment variables if needed"
    echo ""
    echo -e "${COLOR_YELLOW}Backup files are kept in case you need to recover any configurations.${COLOR_RESET}"
}

function main() {
    print_banner
    detect_os
    set_paths
    detect_shell
    check_installation
    confirm_removal
    backup_shell_configs
    remove_files
    clean_shell_integration
    remove_environment_variables
    print_success
}

main "$@"