# Schema Type Generator

[Oh-my-posh](https://ohmyposh.dev) ([JanDeDobbeleer
oh-my-posh | github](https://github.com/jandedobbeleer/oh-my-posh)) is "A prompt theme engine for any shell."

The typescript/javascript in this directory is used to generate typescript types from the `oh-my-posh` [oh-my-posh](https://ohmyposh.dev/) schema. These types can then be used in other typescript projects to validate and work with `oh-my-posh` configuration files.

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

