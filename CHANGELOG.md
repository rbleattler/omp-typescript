# Changelog

All notable changes to the Oh My Posh TypeScript types will be documented in this file.

## [Initial Release]

- Created initial TypeScript types from Oh My Posh schema
- Set up automated type generation workflow
- Added testing against sample configuration

## Summary of Code Changes

The PR changes the main type name from `OhMyPosh` to `Config` across several files:

1. In `generate-types.ts`:
   - Changed `quicktypeJSONSchema("typescript", "OhMyPosh", ...)` to `quicktypeJSONSchema("typescript", "Config", ...)`
   - Added commented imports for potential TOML/YAML support:

     ```ts
     // import { parse as parseTOML, stringify as stringifyTOML } from 'smol-toml';
     // import { parse as parseYAML, stringify as stringifyYAML } from "yaml";
     ```

2. In `validator.ts`:
   - Changed imports from `import { OhMyPosh }` to `import { Config }`
   - Updated type usage from `const config: OhMyPosh` to `const config: Config`

3. In `test-types.ts`:
   - Updated all code checking for type exports to look for `Config` instead of `OhMyPosh`

4. In the generated `omp.ts`:
   - The main interface is now `Config` instead of `OhMyPosh`
   - The `Convert` class methods are now `toConfig`/`configToJson` instead of `toOhMyPosh`/`ohMyPoshToJson`

This change makes the type name more intuitive since it directly represents an Oh My Posh configuration object.
