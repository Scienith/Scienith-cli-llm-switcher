#!/usr/bin/env ruby
# Generate README files from Jekyll i18n data

require 'yaml'
require 'erb'

# Configuration
PROJECT_ROOT = File.expand_path('..', __dir__)
I18N_DIR = File.join(PROJECT_ROOT, 'docs', '_data', 'i18n')
OUTPUT_DIR = PROJECT_ROOT

# Load i18n data
def load_i18n_data
  locales_file = File.join(I18N_DIR, 'locales.yml')
  locales = YAML.load_file(locales_file)
  
  i18n_data = {}
  locales.each do |locale_code, locale_name|
    locale_file = File.join(I18N_DIR, "#{locale_code}.yml")
    if File.exist?(locale_file)
      i18n_data[locale_code] = YAML.load_file(locale_file)
      i18n_data[locale_code]['_locale_name'] = locale_name
    end
  end
  
  i18n_data
end

# Generate language switcher links
def generate_lang_links(current_locale, locales)
  links = []
  locales.each do |code, data|
    if code == current_locale
      links << data['_locale_name']
    else
      filename = code == 'en' ? 'README.md' : "README_#{code.gsub('-', '_')}.md"
      links << "[#{data['_locale_name']}](#{filename})"
    end
  end
  "**🌍 Languages**: #{links.join(' | ')}"
end

# README template
README_TEMPLATE = <<~ERB
<div align="center">

<img src="assets/images/logo/logo.jpeg" alt="<%= L['home']['title'] %>" width="50%">

# <%= L['home']['title'] %>

*<%= L['home']['description'] %>*

[![Version](https://img.shields.io/badge/version-0.1.0a1-blue.svg)](https://github.com/Scienith/Scienith-cli-llm-switcher/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

<%= lang_links %>

</div>

<%= L['home']['subtitle'] %>

## <%= L['home']['quick_start'] %>

```bash
<% L['home']['installation_commands'].each do |cmd| %>
<%= cmd %>
<% end %>
```

## 🚀 <%= L['home']['features'] %>

<% L['home']['features_list'].each do |feature| %>
- <%= feature %>
<% end %>

## 📋 <%= L['home']['providers'] %>

| <%= L['home']['provider_table_headers'].join(' | ') %> |
|<%= L['home']['provider_table_headers'].map { '--------' }.join('|') %>|
<% L['home']['provider_table_rows'].each do |row| %>
| <%= row.join(' | ') %> |
<% end %>

## ⚡ <%= L['home']['installation'] %>

### <%= L['home']['installation_auto'] %>
```bash
<%= L['home']['installation_auto_command'] %>
```

### <%= L['home']['installation_manual'] %>
```bash
<%= L['home']['installation_manual_commands'].join("\n") %>
```

### <%= L['home']['uninstall'] %>
```bash
<%= L['home']['uninstall_command'] %>
```

## 🔧 <%= L['home']['usage'] %>

### <%= L['home']['basic_commands'] %>

```bash
<% L['home']['basic_commands_list'].each do |cmd| %>
<%= cmd %>
<% end %>
```

### <%= L['home']['configure_providers'] %>

```bash
<% L['home']['configure_commands'].each do |cmd| %>
<%= cmd %>
<% end %>
```

### <%= L['home']['quick_switching'] %>

```bash
<% L['home']['switching_commands'].each do |cmd| %>
<%= cmd %>
<% end %>
```

## 🎯 <%= L['home']['claude_integration'] %>

<%= L['home']['claude_integration_description'] %>

```bash
<% L['home']['claude_integration_commands'].each do |cmd| %>
<%= cmd %>
<% end %>
```

## 📚 <%= L['home']['config_files'] %>

<%= L['home']['config_files_description'] %>

<% L['home']['config_files_list'].each do |item| %>
- <%= item %>
<% end %>

## 🛠️ <%= L['home']['technical_features'] %>

<% L['home']['technical_features_list'].each do |feature| %>
- <%= feature %>
<% end %>

## 💡 <%= L['home']['use_cases'] %>

<% L['home']['use_cases_list'].each do |case_item| %>
- <%= case_item %>
<% end %>

## 🤝 <%= L['home']['contributing'] %>

<%= L['home']['contributing_text'] %>

## 🙏 <%= L['home']['acknowledgments'] %>

<%= L['home']['acknowledgments_text'] %>

🔗 **<%= L['home']['acknowledgments_link_text'] %>**: https://www.haidongji.com/about-me/

## 📄 <%= L['home']['license'] %>

<%= L['home']['license_text'] %>

---

**<%= L['home']['help_text'] %>**
ERB

def main
  puts "🌍 Generating README files from Jekyll i18n data..."
  
  # Load i18n data
  i18n_data = load_i18n_data
  
  if i18n_data.empty?
    puts "❌ No i18n data found!"
    exit 1
  end
  
  # Generate README for each language
  i18n_data.each do |locale, data|
    puts "📝 Generating README for #{locale} (#{data['_locale_name']})..."
    
    # Prepare template variables
    L = data
    lang_links = generate_lang_links(locale, i18n_data)
    
    # Render template
    template = ERB.new(README_TEMPLATE, trim_mode: '-')
    content = template.result(binding)
    
    # Determine output filename
    filename = if locale == 'en'
      'README.md'
    else
      "README_#{locale.gsub('-', '_')}.md"
    end
    
    # Write file
    output_path = File.join(OUTPUT_DIR, filename)
    File.write(output_path, content)
    
    puts "✅ Generated #{filename}"
  end
  
  puts "🎉 All README files generated successfully!"
end

if __FILE__ == $0
  main
end
ERB