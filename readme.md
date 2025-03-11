# Oh-My-Posh TypeScript Type Generator

![Theme Validation](./theme-validation-badge.svg)

[Oh-my-posh](https://ohmyposh.dev) ([JanDeDobbeleer
oh-my-posh | github](https://github.com/jandedobbeleer/oh-my-posh)) is "A prompt theme engine for any shell." This project generates typescript types from the `oh-my-posh` schema. These types can then be used in other typescript projects to validate and work with `oh-my-posh` configuration files.

The typescript/javascript in this directory is used to generate typescript types from the `oh-my-posh` [(oh-my-posh.dev)](https://ohmyposh.dev/) schema. These types can then be used in other typescript projects to validate and work with `oh-my-posh` configuration files.

For a detailed explanation of the schema, see [schema-explained.md](schema-explained.md).

## Goals

- Generate typescript types from the `oh-my-posh` schema
  - Which can be used to:
    - Validate `oh-my-posh` configuration files
    - Work with `oh-my-posh` configuration files in typescript projects
    - Generate documentation for `oh-my-posh` configuration files
    - Build `oh-my-posh` configuration files programmatically
  - Which are easy to:
    - Understand
    - Use
    - Maintain
    - Extend
- Generate documentation for `oh-my-posh` configuration files
  - Which is easy to:
    - Understand
    - Use
    - Maintain
    - Extend

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/omp-ts-typegen.git
cd omp-ts-typegen

# Install dependencies
npm install
```

## How It Works

This project automatically generates TypeScript type definitions from the Oh My Posh JSON schema:

1. The script fetches the latest schema from the [Oh My Posh repository](https://github.com/JanDeDobbeleer/oh-my-posh)
2. The schema is cached locally for future reference
3. [quicktype](https://github.com/quicktype/quicktype) is used to convert the JSON schema into TypeScript types
4. The generated types are saved to the `src/types/omp.ts` file
5. These types are then exported via the main entry point (`src/index.ts`)

A GitHub workflow runs nightly to check for schema updates and regenerate types if needed.

## Usage

### Generating Types

```bash
# Generate types from the Oh My Posh schema
npm run generate-types

# Test the generated types against all Oh My Posh themes
# This will also generate a theme-validation.md report
npm run test-types

# Build the package
npm run build
```

### Validation Report

When running `npm run test-types`, the script will:

1. Clone the Oh My Posh repository and test all themes against the generated types
2. Generate a markdown report (`theme-validation.md`) showing which themes are valid or invalid
3. Create a custom SVG badge showing validation status
4. Exit with a non-zero code if any themes are invalid

The validation report includes:

- A summary of validation results (total themes, valid count, invalid count)
- A table listing all themes with links to their source files
- Status indicators showing which themes pass validation
- A custom SVG badge that is displayed in the README

### Using the Generated Types

Once you've installed this package in your project, you can use the generated types:

```typescript
import { Config } from '@rbleattler/omp-ts-typegen';

// Use the types to validate or work with Oh My Posh config files
const myConfig: Config = {
  // Your config here
};
```

## Project Structure

- `/scripts` - Contains the TypeScript scripts for generating and testing types
  - `generate-types.ts` - Fetches the schema and generates types
  - `test-types.ts` - Tests the generated types against sample configs
  - `validator.ts` - Provides validation functionality
  - `update-changelog.ts` - Updates the changelog when the types change
- `/src` - Contains the generated TypeScript types
  - `types/omp.ts` - The generated TypeScript types
  - `index.ts` - Exports the types for use in other projects
- `/cache` - Stores the cached schema for comparison
  - `/cache/oh-my-posh` - Cached clone of the Oh My Posh repository for validation
- `/temp` - Temporary directory used during testing
- `theme-validation.md` - Report of theme validation results
- `theme-validation-badge.svg` - Visual badge showing theme validation status
- `/.github/workflows` - CI/CD workflows, including the nightly type generation

## Requirements

- Node.js 18+
- ESM-compatible environment (for chalk v5+ and other ESM dependencies)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
