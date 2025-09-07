#!/bin/bash

# Load configuration management
SOURCE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SOURCE_DIR/config.sh"

# Provider switching functions using INI configuration

function switch_to_provider() {
    local provider="$1"
    
    # Load configuration
    load_config
    
    # Validate provider exists
    if ! ini_has_key "${provider}.name"; then
        echo "Error: Unknown provider '$provider'"
        echo "Available providers: $(ini_get_providers | tr '\n' ' ')"
        return 1
    fi
    
    # Check if API key is configured
    local api_key
    api_key=$(ini_get "${provider}.api_key")
    if [[ -z "$api_key" ]]; then
        echo "Error: API key not configured for $provider"
        echo "Run 'llm-switch config $provider' to set it up"
        return 1
    fi
    
    # Get provider configuration
    local base_url default_model anthropic_url
    base_url=$(ini_get "${provider}.base_url")
    default_model=$(ini_get "${provider}.default_model")
    anthropic_url=$(ini_get "${provider}.anthropic_url")
    
    # Set environment variables based on provider type
    case "$provider" in
        claude)
            # Claude native API
            echo "export ANTHROPIC_API_KEY=\"$api_key\""
            echo "unset OPENAI_API_KEY OPENAI_BASE_URL OPENAI_MODEL"
            echo "unset ANTHROPIC_BASE_URL ANTHROPIC_AUTH_TOKEN ANTHROPIC_MODEL ANTHROPIC_SMALL_FAST_MODEL"
            ;;
        *)
            # OpenAI-compatible providers
            echo "export OPENAI_API_KEY=\"$api_key\""
            echo "export OPENAI_BASE_URL=\"$base_url\""
            echo "export OPENAI_MODEL=\"$default_model\""
            
            # Set Anthropic variables for Claude Code compatibility
            if [[ -n "$anthropic_url" ]]; then
                echo "export ANTHROPIC_BASE_URL=\"$anthropic_url\""
                echo "export ANTHROPIC_AUTH_TOKEN=\"$api_key\""
            fi
            
            # Special handling for DeepSeek
            if [[ "$provider" == "deepseek" ]]; then
                echo "export ANTHROPIC_MODEL=\"deepseek-chat\""
                echo "export ANTHROPIC_SMALL_FAST_MODEL=\"deepseek-chat\""
            else
                echo "unset ANTHROPIC_MODEL ANTHROPIC_SMALL_FAST_MODEL"
            fi
            ;;
    esac
    
    # Record current provider
    set_current_provider "$provider"
    
    # Success message
    local provider_name
    provider_name=$(ini_get "${provider}.name")
    echo "# LLM Switch: Activated $provider_name ($provider)"
    echo "# Model: $default_model"
}

function show_current_status() {
    local current
    current=$(get_current_provider)
    
    if [[ "$current" == "none" ]]; then
        echo "No LLM provider currently active"
        echo "Use 'llm-switch <provider>' to activate one"
        return
    fi
    
    # Load configuration to get details
    load_config
    
    if ! ini_has_key "${current}.name"; then
        echo "Warning: Current provider '$current' not found in configuration"
        return 1
    fi
    
    local provider_name default_model base_url api_key
    provider_name=$(ini_get "${current}.name")
    default_model=$(ini_get "${current}.default_model")
    base_url=$(ini_get "${current}.base_url")
    api_key=$(ini_get "${current}.api_key")
    
    echo "Current LLM Provider: $provider_name ($current)"
    echo "  Model: $default_model"
    echo "  Base URL: $base_url"
    
    if [[ -n "$api_key" ]]; then
        echo "  API Key: ${api_key:0:8}..."
    else
        echo "  API Key: Not configured"
    fi
    
    # Show environment variables that would be set
    echo ""
    echo "Environment variables:"
    case "$current" in
        claude)
            echo "  ANTHROPIC_API_KEY=..."
            ;;
        *)
            echo "  OPENAI_API_KEY=..."
            echo "  OPENAI_BASE_URL=$base_url"
            echo "  OPENAI_MODEL=$default_model"
            
            local anthropic_url
            anthropic_url=$(ini_get "${current}.anthropic_url")
            if [[ -n "$anthropic_url" ]]; then
                echo "  ANTHROPIC_BASE_URL=$anthropic_url"
                echo "  ANTHROPIC_AUTH_TOKEN=..."
            fi
            ;;
    esac
}

# Shortcut mapping
function resolve_provider_shortcut() {
    local input="$1"
    
    case "$input" in
        qi|QI) echo "qwen-intl" ;;
        qc|QC) echo "qwen-cn" ;;
        q|Q) echo "qwen-intl" ;;  # Default qwen to international
        z|Z) echo "zhipu" ;;
        k|K) echo "kimi" ;;
        d|D) echo "deepseek" ;;
        c|C) echo "claude" ;;
        o|O) echo "openai" ;;
        g|G) echo "groq" ;;
        *) echo "$input" ;;  # Return as-is if not a shortcut
    esac
}

# Function to validate if provider switching is possible
function validate_switch() {
    local provider="$1"
    
    # Resolve shortcut
    provider=$(resolve_provider_shortcut "$provider")
    
    # Load configuration
    load_config
    
    # Check if provider exists
    if ! ini_has_key "${provider}.name"; then
        return 1
    fi
    
    # Check if API key is configured
    local api_key
    api_key=$(ini_get "${provider}.api_key")
    if [[ -z "$api_key" ]]; then
        return 2
    fi
    
    echo "$provider"
    return 0
}

# Main switch function for use in shell function
function switch_provider() {
    local provider="$1"
    local resolved_provider
    local exit_code
    
    resolved_provider=$(validate_switch "$provider")
    exit_code=$?
    
    case $exit_code in
        0)
            switch_to_provider "$resolved_provider"
            ;;
        1)
            echo "Error: Unknown provider '$provider'"
            echo "Available providers:"
            list_providers
            return 1
            ;;
        2)
            echo "Error: API key not configured for $(ini_get "${resolved_provider}.name")"
            echo "Run 'llm-switch config $resolved_provider' to set it up"
            return 1
            ;;
    esac
}