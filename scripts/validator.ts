/**
 * Note: This is a simplified validator that checks if the JSON is
 * compatible with the TypeScript interfaces. For a full check,
 * we would need to compile the TypeScript and use the runtime types.
 */

import fs from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import { Chalk } from 'chalk';

const execAsync = promisify(exec);

const TEMP_DIR = path.join(process.cwd(), 'temp');
const TEMP_FILE = path.join(TEMP_DIR, 'test-config.ts');

export async function validate(config: any): Promise<{ valid: boolean; errors?: string[] }> {
  const { default: chalk } = await import('chalk');
  try {
    // Create temp directory if it doesn't exist
    await fs.mkdir(TEMP_DIR, { recursive: true });

    // Create a temporary TypeScript file that imports the types and validates the config
    const testContent = `
// This is a generated test file
import { OhMyPosh } from '../src/types/omp';

// The config to validate
const config: OhMyPosh = ${JSON.stringify(config, null, 2)};

// If TypeScript compiles this, it means the config is valid
console.log('Config is valid!');
    `;

    // Save the test file for inspection
    await fs.writeFile(TEMP_FILE, testContent);

    try {
      // Run tsc with verbose error output and report all errors
      const { stdout, stderr } = await execAsync(`npx tsc --noEmit --pretty ${TEMP_FILE}`);

      // If we get here and stderr is empty, compilation succeeded
      if (!stderr.trim()) {
        return { valid: true };
      } else {
        return {
          valid: false,
          errors: [
            `TypeScript validation failed with errors:`,
            stderr
          ]
        };
      }
    } catch (execError: any) {
      // TypeScript compilation failed - get the full error details
      return {
        valid: false,
        errors: [
          `TypeScript validation failed:`,
          execError.stderr || execError.message || 'Unknown error'
        ]
      };
    } finally {
      // Clean up the temporary file
      try {
        chalk.yellow('Cleaning up temporary files...');
        // await fs.rm(TEMP_FILE).catch(() => {});
        // await fs.rmdir(TEMP_DIR).catch(() => {});
        chalk.green('✅ Temporary files cleaned up!');
      } catch (error) {
        // Ignore errors during cleanup
      }
    }
  } catch (error: any) {
    // Other errors (file system, etc.)
    return { valid: false, errors: [`Error during validation: ${error.message}`] };
  }
}
