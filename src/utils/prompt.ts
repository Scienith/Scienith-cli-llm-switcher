/**
 * Prompt utility for interactive CLI input
 */

import * as readlineSync from 'readline-sync';
import * as readline from 'readline';

export type MaskMode = 'none' | 'asterisk' | 'bullet' | 'hidden' | 'dots';

export function prompt(question: string, maskMode: MaskMode | boolean = 'none'): Promise<string> {
  // Convert boolean to MaskMode for backward compatibility
  const mode: MaskMode = typeof maskMode === 'boolean' 
    ? (maskMode ? 'asterisk' : 'none')
    : maskMode;

  return new Promise((resolve) => {
    if (mode !== 'none') {
      // Use readline-sync for masked input
      const maskChar = mode === 'hidden' ? '' : 
                       mode === 'bullet' ? '•' :
                       mode === 'dots' ? '●' : '*';
      
      const answer = readlineSync.question(question, {
        hideEchoBack: true,
        mask: maskChar
      });
      resolve(answer);
    } else {
      // Use regular readline for normal input
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      
      rl.question(question, (answer) => {
        rl.close();
        resolve(answer);
      });
    }
  });
}