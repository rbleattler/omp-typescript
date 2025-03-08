import fs from 'fs/promises';
import path from 'path';
import { validate } from './validator';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const TYPES_DIR = path.join(process.cwd(), 'src', 'types');
const REPO_CACHE_DIR = path.join(process.cwd(), 'cache', 'oh-my-posh');
const THEMES_DIR = path.join(REPO_CACHE_DIR, 'themes');
const REPO_URL = 'https://github.com/JanDeDobbeleer/oh-my-posh.git';
const VALIDATION_REPORT = path.join(process.cwd(), 'theme-validation.md');
const DETAILED_REPORT = path.join(process.cwd(), 'theme-validation-details.md');
const BADGE_PATH = path.join(process.cwd(), 'theme-validation-badge.svg');
const TEMP_DIR = path.join(process.cwd(), 'temp');

async function ensureRepoCloned(): Promise<void> {
  try {
    // Check if the repo directory exists
    await fs.access(REPO_CACHE_DIR);

    // If it exists, pull the latest changes
    console.log('Oh My Posh repo exists, pulling latest changes...');
    await execAsync('git pull', { cwd: REPO_CACHE_DIR });
  } catch (error) {
    // If the directory doesn't exist, clone the repo
    console.log('Cloning Oh My Posh repository...');
    await fs.mkdir(path.dirname(REPO_CACHE_DIR), { recursive: true });
    await execAsync(`git clone ${REPO_URL} ${REPO_CACHE_DIR} --depth 1`);
  }
}

async function getThemeFiles(): Promise<string[]> {
  try {
    // Get all files in the themes directory
    const files = await fs.readdir(THEMES_DIR);

    // Filter for JSON files only, excluding schema.json
    const themeFiles = files
      .filter(file => file.endsWith('.json') && file !== 'schema.json')
      .map(file => path.join(THEMES_DIR, file));

    return themeFiles;
  } catch (error) {
    throw new Error(`Failed to get theme files: ${error}`);
  }
}

async function validateTheme(themePath: string): Promise<{
  path: string,
  name: string,
  valid: boolean,
  errors?: string[]
}> {
  try {
    const themeName = path.basename(themePath);
    const content = await fs.readFile(themePath, 'utf8');
    const config = JSON.parse(content);
    const result = await validate(config);

    return {
      path: themePath,
      name: themeName,
      valid: result.valid,
      errors: result.errors
    };
  } catch (error: any) {
    return {
      path: themePath,
      name: path.basename(themePath),
      valid: false,
      errors: [`Error processing theme: ${error.message}`]
    };
  }
}

async function generateMarkdownReport(results: {
  total: number,
  valid: number,
  invalid: number,
  validThemes: Array<{ name: string, path: string }>,
  invalidThemes: Array<{ name: string, path: string, errors: string[] }>
}): Promise<void> {
  const { default: chalk } = await import('chalk');
  console.log(chalk.blue('Generating validation report...'));

  const repoOwner = 'JanDeDobbeleer';
  const repoName = 'oh-my-posh';
  const branch = 'main'; // Assuming 'main' is the default branch

  const reportHeader = `# Oh My Posh Theme Validation Report

This report shows the validation status of all themes in the [Oh My Posh](https://github.com/${repoOwner}/${repoName}) repository against the TypeScript types generated from the schema.

- **Total themes tested:** ${results.total}
- **Valid themes:** ${results.valid} (${Math.round((results.valid / results.total) * 100)}%)
- **Invalid themes:** ${results.invalid} (${Math.round((results.invalid / results.total) * 100)}%)

Last updated: ${new Date().toISOString().split('T')[0]}

`;

  const tableHeader = `| Theme | Status |
|-------|--------|
`;

  let tableRows = '';

  // Add valid themes first
  for (const theme of results.validThemes) {
    const themeName = path.basename(theme.name, '.json');
    const themeUrl = `https://github.com/${repoOwner}/${repoName}/blob/${branch}/themes/${theme.name}`;
    tableRows += `| [${themeName}](${themeUrl}) | ✅ Valid |\n`;
  }

  // Then add invalid themes
  for (const theme of results.invalidThemes) {
    const themeName = path.basename(theme.name, '.json');
    const themeUrl = `https://github.com/${repoOwner}/${repoName}/blob/${branch}/themes/${theme.name}`;
    tableRows += `| [${themeName}](${themeUrl}) | ❌ Invalid |\n`;
  }

  const reportContent = reportHeader + tableHeader + tableRows;
  await fs.writeFile(VALIDATION_REPORT, reportContent);
  console.log(chalk.green(`Validation report generated at ${VALIDATION_REPORT}`));
}

/**
 * Generates a detailed markdown report with all validation errors
 */
async function generateDetailedReport(results: {
  total: number,
  valid: number,
  invalid: number,
  validThemes: Array<{ name: string, path: string }>,
  invalidThemes: Array<{ name: string, path: string, errors: string[] }>
}): Promise<void> {
  const { default: chalk } = await import('chalk');
  console.log(chalk.blue('Generating detailed validation report...'));

  const repoOwner = 'JanDeDobbeleer';
  const repoName = 'oh-my-posh';
  const branch = 'main';

  const reportHeader = `# Oh My Posh Theme Validation - Detailed Error Report

This report contains detailed validation errors for each theme that failed validation.
These errors can help identify issues in either the theme files or in the TypeScript type definitions.

- **Total themes tested:** ${results.total}
- **Valid themes:** ${results.valid} (${Math.round((results.valid / results.total) * 100)}%)
- **Invalid themes:** ${results.invalid} (${Math.round((results.invalid / results.total) * 100)}%)

Last updated: ${new Date().toISOString().split('T')[0]}

## Summary

${results.invalid === 0 ?
      '✅ All themes passed validation!' :
      `⚠️ ${results.invalid} themes failed validation with type errors.`}

${results.invalid > 0 ? '## Error Details\n\nThe following sections contain detailed error information for each invalid theme.\n' : ''}
`;

  let detailContent = '';

  // Add details for invalid themes
  for (const theme of results.invalidThemes) {
    const themeName = path.basename(theme.name, '.json');
    const themeUrl = `https://github.com/${repoOwner}/${repoName}/blob/${branch}/themes/${theme.name}`;

    detailContent += `### [${themeName}](${themeUrl})\n\n`;
    detailContent += `**Validation Errors:**\n\n`;
    detailContent += theme.errors?.map(error => `- ${error}`).join('\n') + '\n\n';
  }

  const reportContent = reportHeader + detailContent;
  await fs.writeFile(DETAILED_REPORT, reportContent);
  console.log(chalk.green(`Detailed validation report generated at ${DETAILED_REPORT}`));
}

/**
 * Generates a custom SVG badge showing theme validation status
 */
async function generateValidationBadge(results: {
  total: number,
  valid: number,
  invalid: number
}): Promise<void> {
  const { default: chalk } = await import('chalk');
  console.log(chalk.blue('Generating validation badge SVG...'));

  const percentage = Math.round((results.valid / results.total) * 100);
  const width = 240;
  const height = 20;
  const labelWidth = 70;
  const valueWidth = width - labelWidth;

  // Determine color based on percentage
  let color = '#e05d44'; // red
  if (percentage > 80) color = '#4c1'; // bright green
  else if (percentage > 60) color = '#97CA00'; // green
  else if (percentage > 40) color = '#dfb317'; // yellow

  const text = `${results.valid}/${results.total} themes valid (${percentage}%)`;

  // Create SVG badge
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <linearGradient id="b" x2="0" y2="100%">
    <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
    <stop offset="1" stop-opacity=".1"/>
  </linearGradient>
  <mask id="a">
    <rect width="${width}" height="${height}" rx="3" fill="#fff"/>
  </mask>
  <g mask="url(#a)">
    <path fill="#555" d="M0 0h${labelWidth}v${height}H0z"/>
    <path fill="${color}" d="M${labelWidth} 0h${valueWidth}v${height}H${labelWidth}z"/>
    <path fill="url(#b)" d="M0 0h${width}v${height}H0z"/>
  </g>
  <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">
    <text x="${labelWidth / 2}" y="15" fill="#010101" fill-opacity=".3">Themes</text>
    <text x="${labelWidth / 2}" y="14">Themes</text>
    <text x="${labelWidth + valueWidth / 2}" y="15" fill="#010101" fill-opacity=".3">${text}</text>
    <text x="${labelWidth + valueWidth / 2}" y="14">${text}</text>
  </g>
</svg>`;

  await fs.writeFile(BADGE_PATH, svg);
  console.log(chalk.green(`Validation badge generated at ${BADGE_PATH}`));
}

/**
 * Updates the README to include the custom validation badge
 */
async function updateReadmeBadge(): Promise<void> {
  const { default: chalk } = await import('chalk');
  const readmePath = path.join(process.cwd(), 'readme.md');

  try {
    // Read the README content
    let readmeContent = await fs.readFile(readmePath, 'utf-8');

    // Create badge markdown
    const badgeMarkdown = `![Theme Validation](./theme-validation-badge.svg)`;

    // Replace existing badge or add new one after the title
    if (readmeContent.includes('![Theme Validation]')) {
      readmeContent = readmeContent.replace(
        /!\[Theme Validation\]\(.+?\)/,
        badgeMarkdown
      );
    } else {
      // Add after the first heading
      readmeContent = readmeContent.replace(
        /(# .+?\n)/,
        `$1\n${badgeMarkdown}\n`
      );
    }

    // Write updated README
    await fs.writeFile(readmePath, readmeContent);
    console.log(chalk.green('Updated README with custom validation badge'));
  } catch (error) {
    console.error(chalk.red('Failed to update README badge:'), error);
  }
}

async function main() {
  // Dynamically import chalk
  const { default: chalk } = await import('chalk');

  console.log(chalk.blue('Testing generated types against all Oh My Posh themes...'));

  try {
    // Check if the types file exists
    const typesFile = path.join(TYPES_DIR, 'omp.ts');
    await fs.access(typesFile);
    console.log(chalk.green('Types file exists at:'), typesFile);

    // Check if the OhMyPosh type is exported
    const typesContent = await fs.readFile(typesFile, 'utf-8');
    if (typesContent.includes('export interface OhMyPosh') ||
      typesContent.includes('export type OhMyPosh')) {
      console.log(chalk.green('OhMyPosh type is properly exported!'));
    } else {
      console.log(chalk.red('Warning: OhMyPosh type may not be properly exported!'));
      console.log('Searching for OhMyPosh definition...');

      // Find the OhMyPosh definition
      const match = typesContent.match(/(?:interface|type)\s+OhMyPosh/);
      if (match) {
        console.log(chalk.yellow(`Found "${match[0]}" but it might not be exported properly`));
      } else {
        console.log(chalk.red('Could not find OhMyPosh type definition!'));
      }
    }

    // First test with our bundled default config
    // console.log(chalk.green('Testing with local default.omp.json...'));
    // const defaultResult = await validate(defaultConfig);
    // if (defaultResult.valid) {
    //   console.log(chalk.green('✅ Local default config is valid!'));
    // } else {
    //   console.error(chalk.red('❌ Local default config validation failed:'));
    //   defaultResult.errors?.forEach(err => console.error(chalk.red(err)));
    //   // Don't exit early, continue with other themes
    // }

    // Clone or update the Oh My Posh repository
    console.log(chalk.yellow('Ensuring Oh My Posh repository is up to date...'));
    await ensureRepoCloned();

    // Get all theme files
    console.log(chalk.yellow('Finding themes in Oh My Posh repository...'));
    const themeFiles = await getThemeFiles();
    console.log(chalk.green(`Found ${themeFiles.length} themes to validate`));

    // Track validation results
    const results = {
      total: themeFiles.length,
      valid: 0,
      invalid: 0,
      validThemes: [] as Array<{ name: string, path: string }>,
      invalidThemes: [] as Array<{ name: string, path: string, errors: string[] }>
    };

    // Process each theme
    console.log(chalk.yellow('Validating Oh My Posh themes against generated types...'));

    // Create a progress indicator
    let completed = 0;

    // Validate themes in batches to avoid overwhelming the system
    const BATCH_SIZE = 5;
    for (let i = 0; i < themeFiles.length; i += BATCH_SIZE) {
      const batch = themeFiles.slice(i, i + BATCH_SIZE);
      const batchResults = await Promise.all(batch.map(themePath => validateTheme(themePath)));

      for (const result of batchResults) {
        completed++;

        if (result.valid) {
          results.valid++;
          results.validThemes.push({
            name: path.basename(result.path),
            path: result.path
          });
          process.stdout.write(chalk.green('.'));
        } else {
          results.invalid++;
          results.invalidThemes.push({
            name: path.basename(result.path),
            path: result.path,
            errors: result.errors || []
          });
          process.stdout.write(chalk.red('✗'));
        }

        // Print progress every 10 themes
        if (completed % 10 === 0) {
          process.stdout.write(` ${completed}/${themeFiles.length}\n`);
        }
      }
    }

    // Print final newline
    process.stdout.write('\n');

    // Generate the markdown report
    await generateMarkdownReport(results);

    // Generate detailed markdown report
    await generateDetailedReport(results);

    // Generate custom SVG badge and update README
    await generateValidationBadge(results);
    await updateReadmeBadge();

    // Report results to console
    console.log(chalk.blue('Theme validation complete:'));
    console.log(chalk.green(`✅ Valid themes: ${results.valid}/${results.total}`));

    if (results.invalid > 0) {
      console.log(chalk.red(`❌ Invalid themes: ${results.invalid}/${results.total}`));
      console.log(chalk.yellow('See theme-validation.md for detailed report'));
      process.exit(1);
    } else {
      console.log(chalk.green('✅ All themes passed validation!'));
    }

  } catch (error) {
    // Get chalk again in case error happens before first import
    const { default: chalk } = await import('chalk');
    console.error(chalk.red('Error testing types:'), error);
    process.exit(1);
  }
  await fs.rmdir(TEMP_DIR, { recursive: true }).catch(() => { });
}

main().catch(async (error) => {
  const { default: chalk } = await import('chalk');
  console.error(chalk.red('Unhandled error:'), error);
  process.exit(1);
});
