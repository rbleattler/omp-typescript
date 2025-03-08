/**
 * Note: This is a simplified validator that checks if the JSON is
 * compatible with the TypeScript interfaces. For a full check,
 * we would need to compile the TypeScript and use the runtime types.
 */

import fs from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const TEMP_DIR = path.join(process.cwd(), 'temp');

/**
 * Validates a JSON config against the TypeScript interface
 * @param config The configuration object to validate
 * @param themeName Optional theme name to use as part of the test file name
 * @returns Validation result with valid status and any errors
 */
export async function validate(config: any, themeName?: string): Promise<{ valid: boolean; errors?: string[] }> {
  const { default: chalk } = await import('chalk');

  // Create a unique filename based on the theme name or a timestamp
  const safeThemeName = themeName ?
    themeName.replace(/[^\w.-]/g, '_') :
    `config_${Date.now()}`;

  const testFilePath = path.join(TEMP_DIR, `${safeThemeName}.test.ts`);

  try {
    // Create temp directory if it doesn't exist
    await fs.mkdir(TEMP_DIR, { recursive: true });

    // Create a temporary TypeScript file that imports the types and validates the config
    const testContent = `
// This is a generated test file for ${themeName || 'unknown theme'}
import { OhMyPosh } from '../src/types/omp';

// The config to validate
const config: OhMyPosh = ${JSON.stringify(config, null, 2)};

// If TypeScript compiles this, it means the config is valid
console.log('Config is valid!');
    `;

    // Save the test file
    await fs.writeFile(testFilePath, testContent);

    try {
      // Run tsc with verbose error output and report all errors
      const { stdout, stderr } = await execAsync(`npx tsc --noEmit --pretty ${testFilePath}`);

      // If we get here and stderr is empty, compilation succeeded
      if (!stderr.trim()) {
        return { valid: true };
      } else {
        return {
          valid: false,
          errors: [
            `TypeScript validation failed for ${themeName || 'config'}:`,
            stderr
          ]
        };
      }
    } catch (execError: any) {
      // TypeScript compilation failed - get the full error details
      return {
        valid: false,
        errors: [
          `TypeScript validation failed for ${themeName || 'config'}:`,
          execError.stderr || execError.message || 'Unknown error'
        ]
      };
    } finally {
      // Clean up the test file
      try {
        await fs.unlink(testFilePath).catch(() => {});
      } catch (error) {
        // Ignore errors during cleanup
      }
    }
  } catch (error: any) {
    // Other errors (file system, etc.)
    return { valid: false, errors: [`Error during validation: ${error.message}`] };
  }
}
