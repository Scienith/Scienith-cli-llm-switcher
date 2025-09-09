#!/usr/bin/env bash

# Uninstallation script for CLI LLM Switcher

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Uninstalling CLI LLM Switcher...${NC}"

# Function to remove shell integration
remove_shell_integration() {
    local shell_rc="$1"
    local shell_name="$2"
    
    if [ -f "$shell_rc" ]; then
        # Remove CLI LLM Switcher sections
        sed -i.bak '/# CLI LLM Switcher/,/# End CLI LLM Switcher/d' "$shell_rc"
        echo -e "${GREEN}✓ Removed from $shell_name ($shell_rc)${NC}"
    fi
}

# Remove from Bash
remove_shell_integration "$HOME/.bashrc" "Bash"

# Remove from Zsh
remove_shell_integration "$HOME/.zshrc" "Zsh"

# Clean up build artifacts
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
echo -e "${YELLOW}Cleaning up build artifacts...${NC}"
if [ -d "$SCRIPT_DIR/dist" ]; then
    rm -rf "$SCRIPT_DIR/dist"
    echo -e "${GREEN}✓ Removed dist directory${NC}"
fi

if [ -d "$SCRIPT_DIR/node_modules" ]; then
    read -p "Remove node_modules directory? (y/N) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        rm -rf "$SCRIPT_DIR/node_modules"
        echo -e "${GREEN}✓ Removed node_modules directory${NC}"
    fi
fi

# Clean up configuration files from user directory
USER_CONFIG_DIR="$HOME/.llm-switch"
if [ -d "$USER_CONFIG_DIR" ]; then
    echo -e "${YELLOW}Removing user configuration directory...${NC}"
    rm -rf "$USER_CONFIG_DIR"
    echo -e "${GREEN}✓ Removed $USER_CONFIG_DIR${NC}"
fi

# Also clean up old project config files if they exist
if [ -f "$SCRIPT_DIR/config/providers.json" ]; then
    rm -f "$SCRIPT_DIR/config/providers.json"
    echo -e "${GREEN}✓ Removed old project providers.json${NC}"
fi

if [ -f "$SCRIPT_DIR/config/providers.ini" ]; then
    rm -f "$SCRIPT_DIR/config/providers.ini"
    echo -e "${GREEN}✓ Removed old project providers.ini${NC}"
fi

if [ -f "$SCRIPT_DIR/config/providers.ini.backup" ]; then
    rm -f "$SCRIPT_DIR/config/providers.ini.backup"
    echo -e "${GREEN}✓ Removed old project providers.ini.backup${NC}"
fi

echo ""
echo -e "${GREEN}✓ Uninstallation complete!${NC}"
echo ""
echo "To completely remove the effects, restart your terminal or run:"
echo "  source ~/.bashrc (or ~/.zshrc for Zsh)"
echo ""
echo -e "${YELLOW}Note: All configuration including API keys has been removed.${NC}"