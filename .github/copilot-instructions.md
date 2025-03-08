# GitHub Copilot Instructions for omp-ts-typegen

This file provides guidance to GitHub Copilot for working with the omp-ts-typegen repository.

## Project Overview

omp-ts-typegen is a TypeScript type definition generator for [Oh My Posh](https://ohmyposh.dev/) theme configurations. It fetches the latest schema from the Oh My Posh repository and generates TypeScript interfaces that can be used to validate and work with Oh My Posh configuration files.

## Key Concepts

- **Schema**: The JSON schema from Oh My Posh that defines the structure of theme configuration files
- **Type Generation**: Converting the JSON schema to TypeScript interfaces using quicktype
- **Theme Validation**: Testing the generated types against real Oh My Posh themes

## File Structure

- `/scripts/`: Contains the TypeScript scripts for generating and testing types
  - `generate-types.ts`: Fetches the schema and generates types
  - `test-types.ts`: Tests the generated types against Oh My Posh themes
  - `validator.ts`: Provides validation functionality
- `/src/`: Contains the generated TypeScript types
  - `types/omp.ts`: The generated TypeScript types (only present after running `generate-types`)
  - `index.ts`: Exports the types for use in other projects
- `/cache/`: Stores the cached schema and Oh My Posh repository

## Code Conventions

1. Use ESM imports for all modules
2. Use dynamic imports for ESM-only modules like chalk
3. Use consistent error handling with chalk for colorized output
4. Prefer async/await over promises
5. Use TypeScript types for all function parameters and return values

## Document Everything

Whenever changes are made to the codebase, ensure that the README, copilot-instructions.md, and any other relevant documentation are updated to reflect the changes.

## Common Development Tasks

### Adding Support for New Schema Features

1. Update the `quicktypeOptions` in `generate-types.ts` to handle the new schema features
2. Test the generated types against the Oh My Posh themes
3. Update documentation if needed

### Improving Type Generation

- Focus on making the types more accurate and user-friendly
- Consider adding JSDoc comments to the generated types for better documentation
- Ensure the types are properly exported from the main index.ts file

### Testing Against Themes

- The test-types.ts script clones the Oh My Posh repo and tests all themes
- It generates a validation report and badge showing how many themes pass validation
- When fixing type issues, focus on improving the percentage of valid themes

## Validation Badge

The repo includes a custom SVG badge showing the theme validation status. When making changes that might affect validation results:

1. Run the test-types script to update the validation report and badge
2. Ensure the badge is properly displayed in the README

## GitHub Workflow

The nightly-types.yml workflow:

1. Runs daily to check for schema updates
2. Generates new types from the latest schema
3. Updates the validation report and badge
4. Commits and pushes any changes

When modifying the workflow, ensure it continues to update all relevant files.
