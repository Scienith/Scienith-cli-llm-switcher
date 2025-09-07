#!/bin/bash

# Load INI parser
SOURCE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SOURCE_DIR")"
source "$SOURCE_DIR/ini_parser.sh"

# Configuration paths - use environment variables if set (global install), otherwise use project-local paths
if [[ -z "$CONFIG_DIR" ]]; then
    # Project-local paths (when running from source)
    CONFIG_DIR="${PROJECT_ROOT}/config"
    CONFIG_FILE="${CONFIG_DIR}/providers.ini"
    CONFIG_TEMPLATE="${CONFIG_DIR}/providers.ini.template"
    CURRENT_PROVIDER_FILE="${CONFIG_DIR}/current_provider"
fi
# If CONFIG_DIR is set, CONFIG_FILE, CONFIG_TEMPLATE, and CURRENT_PROVIDER_FILE should already be set by the caller

function ensure_config() {
    if [[ ! -d "$CONFIG_DIR" ]]; then
        mkdir -p "$CONFIG_DIR"
    fi
    
    if [[ ! -f "$CONFIG_FILE" ]]; then
        if [[ -f "$CONFIG_TEMPLATE" ]]; then
            cp "$CONFIG_TEMPLATE" "$CONFIG_FILE"
            echo "Configuration file created from template: $CONFIG_FILE"
            echo "Please edit the file and add your API keys."
        else
            echo "Error: Template file not found: $CONFIG_TEMPLATE" >&2
            return 1
        fi
    fi
}

function load_config() {
    ensure_config
    if [[ -f "$CONFIG_FILE" ]]; then
        parse_ini "$CONFIG_FILE"
    else
        echo "Error: Configuration file not found: $CONFIG_FILE" >&2
        return 1
    fi
}

function save_api_key() {
    local provider="$1"
    local api_key="$2"
    
    if [[ -f "$CONFIG_FILE" ]]; then
        ini_set "${provider}.api_key" "$api_key" "$CONFIG_FILE"
        echo "API key saved for $provider"
    else
        echo "Error: Configuration file not found: $CONFIG_FILE" >&2
        return 1
    fi
}

function get_current_provider() {
    if [[ -f "$CURRENT_PROVIDER_FILE" ]]; then
        cat "$CURRENT_PROVIDER_FILE"
    else
        echo "none"
    fi
}

function set_current_provider() {
    ensure_config
    echo "$1" > "$CURRENT_PROVIDER_FILE"
}

function select_model_interactive() {
    local provider="$1"
    local current_default="$2"
    
    ini_select_model "$provider" "$current_default"
}

function configure_provider() {
    local provider="$1"
    
    # Load current configuration
    load_config
    
    # Check if provider exists
    if ! ini_has_key "${provider}.name"; then
        echo "Error: Unknown provider '$provider'"
        echo "Available providers:"
        ini_get_providers
        return 1
    fi
    
    echo "Configuring $(ini_get "${provider}.name")..."
    echo ""
    
    # Get current API key
    local current_key
    current_key=$(ini_get "${provider}.api_key")
    if [[ -n "$current_key" ]]; then
        echo "Current API key: ${current_key:0:8}..."
    else
        echo "No API key configured."
    fi
    
    # Get new API key
    local new_key
    echo -n "Enter API Key (or press Enter to keep current): "
    read -s new_key
    echo  # New line after hidden input
    
    if [[ -n "$new_key" ]]; then
        save_api_key "$provider" "$new_key"
    elif [[ -z "$current_key" ]]; then
        echo "Warning: No API key configured for $provider"
    fi
    
    # Model selection
    echo ""
    local current_default
    current_default=$(ini_get "${provider}.default_model")
    echo "Select default model for $provider:"
    local selected_model
    selected_model=$(select_model_interactive "$provider" "$current_default")
    
    if [[ "$selected_model" != "$current_default" ]]; then
        ini_set "${provider}.default_model" "$selected_model" "$CONFIG_FILE"
        echo "Default model updated to: $selected_model"
    fi
    
    echo "Configuration complete for $provider"
}

# Function to show models for a provider
function show_provider_models() {
    local provider="$1"
    
    load_config
    ini_display_provider_models "$provider"
}

# Function to show all models
function show_all_models() {
    load_config
    ini_display_all_providers
}

# Function to list all providers
function list_providers() {
    load_config
    
    echo "Available LLM Providers:"
    echo "------------------------"
    
    local provider
    for provider in $(ini_get_providers); do
        local name
        name=$(ini_get "${provider}.name")
        local api_key
        api_key=$(ini_get "${provider}.api_key")
        local status="Not configured"
        
        if [[ -n "$api_key" ]]; then
            status="Configured"
        fi
        
        printf "  %-12s : %-25s [%s]\n" "$provider" "$name" "$status"
    done
}

# Function to validate provider exists
function validate_provider() {
    local provider="$1"
    load_config
    ini_has_key "${provider}.name"
}

function configure_all() {
    load_config
    
    while true; do
        echo ""
        echo "LLM Switch Configuration Wizard"
        echo "==============================="
        echo ""
        echo "Available LLM Providers:"
        echo "------------------------"
        
        # List all providers with numbers
        local providers=()
        local counter=1
        local provider
        for provider in $(ini_get_providers); do
            local name
            name=$(ini_get "${provider}.name")
            local api_key
            api_key=$(ini_get "${provider}.api_key")
            local status="Not configured"
            
            if [[ -n "$api_key" ]]; then
                status="✓ Configured"
            else
                status="✗ Not configured"
            fi
            
            printf "  %2d. %-25s [%s]\n" "$counter" "$name" "$status"
            providers+=("$provider")
            ((counter++))
        done
        
        printf "  %2d. Exit configuration\n" "$counter"
        echo ""
        
        read -p "Select provider to configure (1-$counter): " selection
        
        # Check for exit
        if [[ "$selection" == "$counter" ]]; then
            echo "Configuration complete!"
            return 0
        fi
        
        # Validate and configure selected provider
        if [[ "$selection" =~ ^[0-9]+$ ]] && [[ "$selection" -ge 1 ]] && [[ "$selection" -le ${#providers[@]} ]]; then
            local index=$((selection - 1))
            echo ""
            configure_provider "${providers[$index]}"
            echo ""
            read -p "Press Enter to continue..." dummy
        elif [[ -z "$selection" ]]; then
            echo "Configuration complete!"
            return 0
        else
            echo "Invalid selection. Please choose 1-$counter."
        fi
    done
}