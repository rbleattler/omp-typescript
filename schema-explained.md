# Understanding Oh My Posh Schema.json

This document explains the structure and purpose of the Oh My Posh `schema.json` file, which defines the configuration format for Oh My Posh themes.

## Overview

Oh My Posh uses a JSON schema (following the JSON Schema Draft-07 specification) to:

1. Validate theme configuration files
2. Provide auto-completion in editors with JSON schema support
3. Define the structure of themes in a standardized way
4. Document available options for theme creators

## Schema Structure

### Root Schema Properties

The schema's root properties define the high-level configuration options:

- **`final_space`**: Whether to add a space at the end of the prompt
- **`enable_cursor_positioning`**: Enables precise cursor positioning features
- **`shell_integration`**: Adds FTCS command marks for shell integration
- **`pwd`**: Controls OSC99/7/51 working directory communication
- **`upgrade`**: Configuration for upgrade notifications
- **`patch_pwsh_bleed`**: Fixes PowerShell color bleeding issues
- **`console_title_template`**: Template for the terminal window title
- **`terminal_background`**: Background color of the terminal
- **`blocks`**: The main array of prompt blocks (core structure of the prompt)
- **`tooltips`**: Custom tooltips for specific commands
- **`transient_prompt`**: Configuration for simplified repeated prompts
- **`valid_line`**, **`error_line`**: PowerShell-specific prompt variants
- **`secondary_prompt`**: Configuration for multi-line input continuation
- **`debug_prompt`**: PowerShell debugging prompt configuration
- **`palette`**, **`palettes`**: Color palette definitions
- **`cycle`**: Color cycling configuration
- **`accent_color`**: Theme accent color
- **`var`**: Custom variables for use in templates

### Definitions Section

The `definitions` section contains reusable schema components:

#### Color Definitions

```json
"color": {
  "anyOf": [
    {
      "$ref": "#/definitions/color_string"
    },
    {
      "$ref": "#/definitions/palette_reference"
    }
  ]
}
```

Colors can be specified as direct color strings or as palette references (e.g., `p:blue`).

#### Block Definition

Blocks are the main structural elements of the prompt:

```json
"block": {
  "type": "object",
  "description": "https://ohmyposh.dev/docs/configuration/block",
  "properties": {
    "type": {
      "type": "string",
      "enum": ["prompt", "rprompt"],
      "default": "prompt"
    },
    "alignment": {
      "type": "string",
      "enum": ["left", "right"],
      "default": "left"
    },
    "segments": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/segment"
      }
    },
    // ...other properties
  }
}
```

#### Segment Definition

Segments are the individual components within blocks that display information:

```json
"segment": {
  "type": "object",
  "required": ["type", "style"],
  "properties": {
    "type": {
      "type": "string",
      "enum": ["git", "node", "python", /* many other segment types */]
    },
    "style": {
      "anyOf": [
        {
          "enum": ["plain", "powerline", "diamond", "accordion"]
        },
        {
          "type": "string"
        }
      ]
    },
    // ...many other properties
  }
}
```

The schema then uses conditional validation (`if`/`then`) to define specific properties for each segment type.

## Segment Types

Oh My Posh includes a wide variety of segment types, each with specific functionality:

### SCM Segments

- **`git`**: Git repository information
- **`mercurial`**: Mercurial repository information
- **`fossil`**: Fossil repository information
- **`sapling`**: Sapling repository information
- **`plastic`**: Plastic SCM information
- **`svn`**: SVN repository information

### Language/Runtime Segments

- **`node`**: Node.js version and environment
- **`python`**: Python version and virtual environment
- **`ruby`**: Ruby version
- **`java`**: Java version
- **`go`**: Go version
- **`rust`**: Rust version
- **`dotnet`**: .NET version
- **`php`**: PHP version
- And many more language-specific segments

### Cloud/Service Segments

- **`aws`**: AWS profile and region
- **`az`**: Azure information
- **`gcp`**: Google Cloud Platform information
- **`kubernetes`**: Kubernetes context

### System Segments

- **`os`**: Operating system information
- **`path`**: Current directory path
- **`time`**: Current time
- **`session`**: SSH session indicator
- **`battery`**: Battery status

### CLI Tool Segments

- **`npm`**: NPM information
- **`yarn`**: Yarn information
- **`pnpm`**: PNPM information
- **`terraform`**: Terraform workspace

## How Validation Works

The schema uses several validation techniques:

1. **Required properties**: Ensures essential properties are present
2. **Enum validation**: Restricts values to specific options
3. **Pattern validation**: Validates string format (like colors)
4. **Conditional validation**: Different validation rules based on segment type
5. **Default values**: Provides sensible defaults where applicable

## Example Configuration Flow

When a user creates an Oh My Posh theme:

1. The theme defines one or more blocks
2. Each block contains one or more segments
3. Each segment has a type, style, and segment-specific properties
4. Colors can be defined directly or through palettes
5. Templates within segments define how information is displayed

## References

- [Oh My Posh Documentation](https://ohmyposh.dev/docs)
- [JSON Schema Specification](https://json-schema.org/specification.html)

This schema enables the rich, customizable prompts that Oh My Posh is known for, while providing clear validation and documentation for theme creators.
