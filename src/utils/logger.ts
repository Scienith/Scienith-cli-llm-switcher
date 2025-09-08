/**
 * Logging utilities
 */

import chalk from 'chalk';

export class Logger {
  static error(message: string): void {
    console.error(chalk.red(`Error: ${message}`));
  }

  static warn(message: string): void {
    console.error(chalk.yellow(`Warning: ${message}`));
  }

  static info(message: string): void {
    console.error(chalk.blue(`# ${message}`));
  }

  static success(message: string): void {
    console.error(chalk.green(`✓ ${message}`));
  }

  static debug(message: string): void {
    if (process.env.DEBUG) {
      console.error(chalk.gray(`[DEBUG] ${message}`));
    }
  }

  // For shell output that needs to be evaluated
  static shellOutput(message: string): void {
    console.log(message);
  }

  // For comments in shell output
  static shellComment(message: string): void {
    console.log(`# ${message}`);
  }
}