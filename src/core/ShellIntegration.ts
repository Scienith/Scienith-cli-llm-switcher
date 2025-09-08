/**
 * Shell integration for LLM Switcher
 */

import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';
import { ShellType } from './types';

export class ShellIntegration {
  /**
   * Detect the current shell type
   */
  static detectShell(): ShellType {
    const shell = process.env.SHELL || '';
    
    if (shell.includes('bash')) {
      return 'bash';
    } else if (shell.includes('zsh')) {
      return 'zsh';
    } else if (shell.includes('fish')) {
      return 'fish';
    }
    
    return 'unknown';
  }

  /**
   * Get shell configuration file path
   */
  static getShellConfigFile(shellType?: ShellType): string {
    const shell = shellType || this.detectShell();
    const homeDir = os.homedir();

    switch (shell) {
      case 'bash':
        return path.join(homeDir, '.bashrc');
      case 'zsh':
        return path.join(homeDir, '.zshrc');
      case 'fish':
        return path.join(homeDir, '.config', 'fish', 'config.fish');
      default:
        return path.join(homeDir, '.bashrc');
    }
  }

  /**
   * Generate bash/zsh function
   */
  static generateBashFunction(binPath: string): string {
    return `
# LLM Switch Configuration
export PATH="${binPath}:\$PATH"

llm-switch() {
    if [[ \$# -eq 0 ]]; then
        command llm-switch
        return
    fi
    
    case "\$1" in
        status|list|models|config|help|version|--help|-h|--version|-v)
            command llm-switch "\$@"
            ;;
        claude|qwen)
            # Special case: these commands launch CLI tools directly
            command llm-switch "\$@"
            ;;
        *)
            eval "\$(command llm-switch "\$@" 2>/dev/null)"
            local exit_code=\$?
            if [[ \$exit_code -eq 0 ]]; then
                echo "Successfully switched LLM provider"
            else
                command llm-switch "\$@"
            fi
            ;;
    esac
}

# Optional: Add completion
if [[ -n "\$BASH_VERSION" ]]; then
    complete -W "qwen zhipu kimi deepseek claude openai groq status list models config help version" llm-switch
elif [[ -n "\$ZSH_VERSION" ]]; then
    compdef "_arguments \\"1:provider:(qwen zhipu kimi deepseek claude openai groq status list models config help version)\\"" llm-switch
fi
`;
  }

  /**
   * Generate fish function
   */
  static generateFishFunction(binPath: string): string {
    return `
# LLM Switch Configuration
set -gx PATH "${binPath}" \$PATH

function llm-switch
    if test (count \$argv) -eq 0
        command llm-switch
        return
    end
    
    switch \$argv[1]
        case status list models config help version --help -h --version -v
            command llm-switch \$argv
        case claude qwen
            # Special case: these commands launch CLI tools directly
            command llm-switch \$argv
        case "*"
            eval (command llm-switch \$argv 2>/dev/null)
            if test \$status -eq 0
                echo "Successfully switched LLM provider"
            else
                command llm-switch \$argv
            end
    end
end

# Add completion
complete -c llm-switch -a "qwen zhipu kimi deepseek claude openai groq status list models config help version"
`;
  }

  /**
   * Install shell function to configuration file
   */
  static async installShellFunction(binPath: string, shellType?: ShellType): Promise<void> {
    const shell = shellType || this.detectShell();
    const configFile = this.getShellConfigFile(shell);
    
    // Generate appropriate function
    let shellFunction: string;
    if (shell === 'fish') {
      shellFunction = this.generateFishFunction(binPath);
    } else {
      shellFunction = this.generateBashFunction(binPath);
    }

    // Check if already installed
    try {
      const content = await fs.promises.readFile(configFile, 'utf-8');
      if (content.includes('# LLM Switch Configuration')) {
        console.warn('Shell function already installed. Updating...');
        // Remove old configuration
        const lines = content.split('\n');
        const startIdx = lines.findIndex(line => line.includes('# LLM Switch Configuration'));
        if (startIdx !== -1) {
          // Find end of our configuration
          let endIdx = lines.length;
          for (let i = startIdx + 1; i < lines.length; i++) {
            if (lines[i].startsWith('#') && !lines[i].includes('LLM Switch')) {
              endIdx = i;
              break;
            }
          }
          
          // Remove old configuration
          lines.splice(startIdx, endIdx - startIdx);
          const newContent = lines.join('\n');
          await fs.promises.writeFile(configFile, newContent + '\n' + shellFunction, 'utf-8');
        }
      } else {
        // Append to file
        await fs.promises.appendFile(configFile, '\n' + shellFunction, 'utf-8');
      }
    } catch (error) {
      // File doesn't exist, create it
      await fs.promises.writeFile(configFile, shellFunction, 'utf-8');
    }
  }

  /**
   * Remove shell function from configuration file
   */
  static async uninstallShellFunction(shellType?: ShellType): Promise<void> {
    const shell = shellType || this.detectShell();
    const configFile = this.getShellConfigFile(shell);

    try {
      const content = await fs.promises.readFile(configFile, 'utf-8');
      
      if (!content.includes('# LLM Switch Configuration')) {
        console.warn('Shell function not found in configuration file');
        return;
      }

      const lines = content.split('\n');
      const startIdx = lines.findIndex(line => line.includes('# LLM Switch Configuration'));
      
      if (startIdx !== -1) {
        // Find end of our configuration
        let endIdx = lines.length;
        for (let i = startIdx + 1; i < lines.length; i++) {
          if (lines[i].startsWith('#') && !lines[i].includes('LLM Switch')) {
            endIdx = i;
            break;
          }
        }
        
        // Remove configuration
        lines.splice(startIdx, endIdx - startIdx);
        const newContent = lines.join('\n');
        await fs.promises.writeFile(configFile, newContent, 'utf-8');
      }
    } catch (error) {
      console.error('Failed to uninstall shell function:', error);
    }
  }
}