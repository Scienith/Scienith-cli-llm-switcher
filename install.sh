#!/usr/bin/env bash

# Installation script for CLI LLM Switcher

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
LLM_SWITCH_DIR="$SCRIPT_DIR"
LLM_SWITCH_BIN="$LLM_SWITCH_DIR/bin/llm-switch"

echo -e "${GREEN}Installing CLI LLM Switcher...${NC}"

# Build the TypeScript project
echo -e "${YELLOW}Building TypeScript project...${NC}"
cd "$LLM_SWITCH_DIR"
if command -v npm >/dev/null 2>&1; then
    # Install dependencies if needed
    if [ ! -d "node_modules" ]; then
        echo "Installing dependencies..."
        npm install commander chalk --no-save
    fi
    
    # Build the project
    node build-simple.js
else
    echo -e "${RED}Error: npm is not installed. Please install Node.js and npm first.${NC}"
    exit 1
fi

# Make the main script executable
chmod +x "$LLM_SWITCH_BIN"

# Function to add shell integration
add_shell_integration() {
    local shell_rc="$1"
    local shell_name="$2"
    
    if [ -f "$shell_rc" ]; then
        # Remove old installations
        sed -i.bak '/# CLI LLM Switcher/,/# End CLI LLM Switcher/d' "$shell_rc"
        
        # Add new installation
        echo "" >> "$shell_rc"
        echo "# CLI LLM Switcher" >> "$shell_rc"
        echo "export PATH=\"$LLM_SWITCH_DIR/bin:\$PATH\"" >> "$shell_rc"
        echo "" >> "$shell_rc"
        echo "# Shell function for environment variable switching" >> "$shell_rc"
        echo 'llm-switch() {' >> "$shell_rc"
        echo '    case "$1" in' >> "$shell_rc"
        echo '        claude|qwen|run)' >> "$shell_rc"
        echo '            # These commands launch CLI tools directly' >> "$shell_rc"
        echo '            command llm-switch "$@"' >> "$shell_rc"
        echo '            ;;' >> "$shell_rc"
        echo '        switch|s|q|Q|z|Z|k|K|d|D|c|C|o|O|g|G)' >> "$shell_rc"
        echo '            # Switch provider and evaluate environment variables' >> "$shell_rc"
        echo '            local output' >> "$shell_rc"
        echo '            output=$(command llm-switch "$@" 2>&1)' >> "$shell_rc"
        echo '            local exit_code=$?' >> "$shell_rc"
        echo '            ' >> "$shell_rc"
        echo '            if [ $exit_code -eq 0 ]; then' >> "$shell_rc"
        echo '                # Execute export commands' >> "$shell_rc"
        echo '                eval "$output"' >> "$shell_rc"
        echo '            else' >> "$shell_rc"
        echo '                # Show error message' >> "$shell_rc"
        echo '                echo "$output" >&2' >> "$shell_rc"
        echo '                return $exit_code' >> "$shell_rc"
        echo '            fi' >> "$shell_rc"
        echo '            ;;' >> "$shell_rc"
        echo '        *)' >> "$shell_rc"
        echo '            # All other commands run normally' >> "$shell_rc"
        echo '            command llm-switch "$@"' >> "$shell_rc"
        echo '            ;;' >> "$shell_rc"
        echo '    esac' >> "$shell_rc"
        echo '}' >> "$shell_rc"
        echo "" >> "$shell_rc"
        echo "# Shorter alias" >> "$shell_rc"
        echo 'lms() {' >> "$shell_rc"
        echo '    llm-switch "$@"' >> "$shell_rc"
        echo '}' >> "$shell_rc"
        echo "# End CLI LLM Switcher" >> "$shell_rc"
        
        echo -e "${GREEN}✓ Added to $shell_name ($shell_rc)${NC}"
    fi
}

# Detect and update shell configurations
echo -e "${YELLOW}Setting up shell integration...${NC}"

# Bash
add_shell_integration "$HOME/.bashrc" "Bash"

# Zsh
add_shell_integration "$HOME/.zshrc" "Zsh"

echo ""
echo -e "${GREEN}✓ Installation complete!${NC}"
echo ""

# Detect current shell and provide exact command to run
if [ -n "$BASH_VERSION" ]; then
    SHELL_RC="$HOME/.bashrc"
    SHELL_NAME="bash"
elif [ -n "$ZSH_VERSION" ]; then
    SHELL_RC="$HOME/.zshrc"
    SHELL_NAME="zsh"
else
    SHELL_RC="your shell config file"
    SHELL_NAME="your shell"
fi

echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}To complete installation, run this command:${NC}"
echo ""
echo -e "  ${GREEN}source $SHELL_RC${NC}"
echo ""
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "After that, you can use:"
echo "  lms list                 # List all providers"
echo "  lms switch <provider>    # Switch to a provider"
echo "  lms run claude           # Run claude with current provider"
echo "  lms run qwen             # Run qwen with current provider"
echo "  lms status               # Show current status"
echo ""
echo "Or use shorter commands:"
echo "  lms z                    # Switch to zhipu"
echo "  lms claude               # Run claude (backward compatible)"
echo ""
echo "Shortcuts: q→qwen, z→zhipu, k→kimi, d→deepseek, c→claude, o→openai, g→groq"

# Try to exec a new shell (optional, commented out by default)
# echo ""
# read -p "Start a new shell with llm-switch ready? (y/N) " -n 1 -r
# echo
# if [[ $REPLY =~ ^[Yy]$ ]]; then
#     exec $SHELL
# fi