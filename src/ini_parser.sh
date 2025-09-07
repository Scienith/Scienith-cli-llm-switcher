#!/bin/bash

# Set locale to handle UTF-8 characters properly
export LC_ALL=en_US.UTF-8 2>/dev/null || export LC_ALL=C.UTF-8 2>/dev/null || export LC_ALL=C

# Simple INI Parser compatible with Bash 3.2+
# Uses simple variables instead of associative arrays for compatibility

# Initialize variables
INI_SECTIONS=""

# Parse INI file into environment variables
parse_ini() {
    local file="$1"
    local section=""
    local line_num=0
    
    if [[ ! -f "$file" ]]; then
        echo "Error: INI file not found: $file" >&2
        return 1
    fi
    
    # Clear previous data
    unset_ini_vars
    
    while IFS= read -r line || [[ -n "$line" ]]; do
        ((line_num++))
        
        # Remove leading/trailing whitespace
        line=$(echo "$line" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')
        
        # Skip empty lines and comments
        if [[ -z "$line" ]] || [[ "$line" == \#* ]] || [[ "$line" == \;* ]]; then
            continue
        fi
        
        # Check for section header [section]
        if [[ "$line" =~ ^\[(.+)\]$ ]]; then
            section="${BASH_REMATCH[1]}"
            INI_SECTIONS="$INI_SECTIONS $section"
            continue
        fi
        
        # Check for key=value pairs
        if [[ "$line" =~ ^([^=]+)=(.*)$ ]]; then
            local key="${BASH_REMATCH[1]}"
            local value="${BASH_REMATCH[2]}"
            
            # Remove leading/trailing whitespace from key and value
            key=$(echo "$key" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')
            value=$(echo "$value" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')
            
            # Create variable name
            local var_name
            if [[ -n "$section" ]]; then
                var_name="INI_${section}_${key}"
            else
                var_name="INI_${key}"
            fi
            
            # Replace dots and dashes with underscores in variable names
            var_name=$(echo "$var_name" | sed 's/[.-]/_/g')
            
            # Set the variable
            eval "$var_name=\"$value\""
        else
            echo "Warning: Invalid line $line_num in $file: $line" >&2
        fi
    done < "$file"
}

# Unset all INI variables
unset_ini_vars() {
    local var
    for var in $(set | grep '^INI_' | LC_ALL=C cut -d= -f1); do
        unset "$var"
    done
    INI_SECTIONS=""
}

# Get value by key
ini_get() {
    local key="$1"
    local default_value="${2:-}"
    
    # Replace dots with underscores
    local var_name="INI_$(echo "$key" | sed 's/[.-]/_/g')"
    
    local value
    eval "value=\${$var_name:-}"
    
    if [[ -n "$value" ]]; then
        echo "$value"
    else
        echo "$default_value"
    fi
}

# Check if key exists
ini_has_key() {
    local key="$1"
    local var_name="INI_$(echo "$key" | sed 's/[.-]/_/g')"
    
    local value
    eval "value=\${$var_name:-}"
    [[ -n "$value" ]]
}

# Get provider list
ini_get_providers() {
    # Use LC_ALL=C to avoid encoding issues with sort
    local provider
    for section in $INI_SECTIONS; do
        if ini_has_key "${section}.name"; then
            echo "$section"
        fi
    done | LC_ALL=C sort -u
}

# Get models for a provider
ini_get_provider_models() {
    local provider="$1"
    local models_key="${provider}.models"
    local models_string
    
    models_string=$(ini_get "$models_key")
    
    if [[ -n "$models_string" ]]; then
        # Split comma-separated models and trim whitespace
        echo "$models_string" | tr ',' '\n' | sed 's/^[[:space:]]*//;s/[[:space:]]*$//' | grep -v '^$'
    fi
}

# Get model description
ini_get_model_description() {
    local provider="$1"
    local model="$2"
    local desc_key="${provider}.models.${model}"
    
    ini_get "$desc_key" "No description available"
}

# Display models for a specific provider
ini_display_provider_models() {
    local provider="$1"
    
    if ! ini_has_key "${provider}.name"; then
        echo "Error: Provider '$provider' not found" >&2
        return 1
    fi
    
    echo "Available models for $(ini_get "${provider}.name"):"
    echo "----------------------------------------"
    
    local model num=1
    while IFS= read -r model; do
        if [[ -n "$model" ]]; then
            local desc
            desc=$(ini_get_model_description "$provider" "$model")
            local is_default=""
            
            if [[ "$model" == "$(ini_get "${provider}.default_model")" ]]; then
                is_default=" (default)"
            fi
            
            printf "%2d) %-25s - %s%s\n" "$num" "$model" "$desc" "$is_default"
            ((num++))
        fi
    done < <(ini_get_provider_models "$provider")
}

# Display all providers and their models
ini_display_all_providers() {
    local provider
    
    for provider in $(ini_get_providers); do
        echo "============================================"
        echo "Provider: $(ini_get "${provider}.name") ($provider)"
        echo "============================================"
        
        echo "Configuration:"
        echo "  Name: $(ini_get "${provider}.name")"
        local api_key
        api_key=$(ini_get "${provider}.api_key")
        if [[ -n "$api_key" ]]; then
            echo "  API Key: ${api_key:0:8}..."
        else
            echo "  API Key: Not configured"
        fi
        echo "  Base URL: $(ini_get "${provider}.base_url")"
        echo "  Default Model: $(ini_get "${provider}.default_model")"
        
        local anthropic_url
        anthropic_url=$(ini_get "${provider}.anthropic_url")
        if [[ -n "$anthropic_url" ]]; then
            echo "  Anthropic URL: $anthropic_url"
        fi
        
        echo ""
        echo "Available Models:"
        
        local model
        while IFS= read -r model; do
            if [[ -n "$model" ]]; then
                local desc
                desc=$(ini_get_model_description "$provider" "$model")
                printf "  %-25s - %s\n" "$model" "$desc"
            fi
        done < <(ini_get_provider_models "$provider")
        
        echo ""
    done
}

# Interactive model selection
ini_select_model() {
    local provider="$1"
    local current_default="$2"
    
    local models_array=()
    while IFS= read -r model; do
        if [[ -n "$model" ]]; then
            models_array+=("$model")
        fi
    done < <(ini_get_provider_models "$provider")
    
    # Display to stderr so it doesn't get captured by command substitution
    echo "Available models:" >&2
    for i in "${!models_array[@]}"; do
        local model="${models_array[$i]}"
        local is_current=""
        if [[ "$model" == "$current_default" ]]; then
            is_current=" (current)"
        fi
        printf "  %d. %s%s\n" "$((i + 1))" "$model" "$is_current" >&2
    done
    echo "" >&2
    
    local selection
    while true; do
        read -p "Select model (1-${#models_array[@]}): " selection >&2
        
        # Only accept numeric input, no empty selection
        if [[ "$selection" =~ ^[0-9]+$ ]]; then
            if ((selection >= 1 && selection <= ${#models_array[@]})); then
                echo "${models_array[$((selection-1))]}"
                return 0
            else
                echo "Invalid selection. Please choose 1-${#models_array[@]}." >&2
            fi
        else
            echo "Invalid input. Please enter a number 1-${#models_array[@]}." >&2
        fi
    done
}

# Update INI value (simple implementation)
ini_set() {
    local key="$1"
    local value="$2"
    local file="${3:-}"
    
    # Set in memory
    local var_name="INI_$(echo "$key" | sed 's/[.-]/_/g')"
    eval "$var_name=\"$value\""
    
    # If file is provided, update the file
    if [[ -n "$file" && -f "$file" ]]; then
        local temp_file
        temp_file=$(mktemp)
        
        local section=""
        local found=false
        
        while IFS= read -r line || [[ -n "$line" ]]; do
            # Check for section header
            if [[ "$line" =~ ^\[(.+)\]$ ]]; then
                section="${BASH_REMATCH[1]}"
                echo "$line" >> "$temp_file"
                continue
            fi
            
            # Check for key=value pairs
            if [[ "$line" =~ ^([^=]+)=(.*)$ ]]; then
                local file_key="${BASH_REMATCH[1]}"
                file_key=$(echo "$file_key" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')
                
                local full_key
                if [[ -n "$section" ]]; then
                    full_key="${section}.${file_key}"
                else
                    full_key="$file_key"
                fi
                
                if [[ "$full_key" == "$key" ]]; then
                    echo "${file_key}=${value}" >> "$temp_file"
                    found=true
                else
                    echo "$line" >> "$temp_file"
                fi
            else
                echo "$line" >> "$temp_file"
            fi
        done < "$file"
        
        mv "$temp_file" "$file"
    fi
}