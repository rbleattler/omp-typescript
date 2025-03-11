import fs from 'fs/promises';
import path from 'path';
import axios from 'axios';
import {
  quicktype,
  InputData,
  jsonInputForTargetLanguage,
  JSONSchemaInput,
  FetchingJSONSchemaStore
} from "quicktype-core";

const SCHEMA_URL = 'https://raw.githubusercontent.com/JanDeDobbeleer/oh-my-posh/refs/heads/main/themes/schema.json';
const OUTPUT_DIR = path.join(process.cwd(), 'src', 'types');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'omp.ts');
const SCHEMA_CACHE_FILE = path.join(process.cwd(), 'cache', 'schema.json');

async function main() {
  // Dynamically import chalk (ESM module)
  const { default: chalk } = await import('chalk');

  console.log(chalk.blue('Starting TypeScript type generation...'));

  try {
    // Ensure output directories exist
    await fs.mkdir(path.join(process.cwd(), 'cache'), { recursive: true });
    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    // Fetch the latest schema from the Oh My Posh repository
    console.log(chalk.yellow('Fetching schema from Oh My Posh repository...'));
    const response = await axios.get(SCHEMA_URL);
    const schema = response.data;

    // This is a dumb workaround but maybe someday I can get the schema file to not have this title...
    // Remove the title property from definitions.segment to avoid dumb naming
    //TODO: Create an issue on the Oh My Posh repository to remove the title property from the segment definition in the schema file... or fix it myself with a PR
    // PR pending: [fix: update segment title in schema.json #6244](https://github.com/JanDeDobbeleer/oh-my-posh/pull/6244)
    if (schema.definitions && schema.definitions.segment) {
      delete schema.definitions.segment.title;
    }

    // Cache the schema for future comparisons
    await fs.writeFile(SCHEMA_CACHE_FILE, JSON.stringify(schema, null, 2), { flag: 'w' });


    console.log(chalk.green('Schema fetched and cached successfully.'));

    // Generate TypeScript types using quicktype with the provided options
    console.log(chalk.yellow('Generating TypeScript types...'));



    // Set up quicktype options based on the available options in quicktype-core
    const quicktypeOptions = {
      // if debug add debugPrintGraph: true
      // This will print the type graph to the console at every processing step
      debugPrintGraph: process.features.debug ? true : false,

      // Check Provenance:
      // Check that we're propagating all type attributes (unless we actually can't)
      //! Experimenting with this
      checkProvenance: true,

      inferMaps: true,
      inferEnums: true,
      inferDateTimes: true,
      inferIntegerStrings: true,
      inferBooleanStrings: true,
      inferUUIDStrings: true, // Renamed from inferUuids to match quicktype's API
      combineClasses: true,
      allPropertiesOptional: false,
      alphabetizeProperties: true, // Sort properties for better readability
      rendererOptions: {
        "explicit-unions": true,
        "runtime-typecheck": true,
        "acronym-style": "original",
        "converters": "top-level",
        "raw-type": "json",
        "prefer-unions": true,
        "prefer-types": true
      },
      // Additional options from Options interface
      fixedTopLevels: true,
      leadingComments: undefined,
      density: "normal" as const, // Available options: 'normal', 'dense'
      useStructuralFeatures: true
    };

    // Generate the types using quicktype API
    const { lines } = await quicktypeJSONSchema("typescript", "Config", JSON.stringify(schema), quicktypeOptions);

    // Add a header to the generated file
    const header = `/**
 * Oh My Posh TypeScript definitions
 *
 * Generated from schema: ${SCHEMA_URL}
 * Generated on: ${new Date().toISOString()}
 *
 * @see https://ohmyposh.dev/docs/
 */


/* eslint-disable */
/* tslint:disable */

// import { parse as parseTOML, stringify as stringifyTOML } from 'smol-toml';
// import { parse as parseYAML, stringify as stringifyYAML } from "yaml";
`;

    let typesContent = header + lines.join('\n');

    // Ensure the OhMyPosh type is properly exported
    // This adds an export statement if one isn't already present
    if (!typesContent.includes('export interface Config')) {
      typesContent = typesContent.replace(
        'interface Config',
        'export interface Config'
      );
    }

    // Write the generated TypeScript types to the output file
    await fs.writeFile(OUTPUT_FILE, typesContent, { flag: 'w' });
    console.log(chalk.green(`TypeScript types generated successfully at ${OUTPUT_FILE}`));

  } catch (error) {
    // Dynamically import chalk again to ensure it's available in the catch block
    const { default: chalk } = await import('chalk');
    console.error(chalk.red('Error generating TypeScript types:'), error);
    process.exit(1);
  }
}


// This function is not currently used. But it can be used to generate types from JSON input.
// We'll keep it here for reference / future use.
async function quicktypeJSON(
  targetLanguage: string,
  typeName: string,
  jsonString: string
) {
  const jsonInput = jsonInputForTargetLanguage(targetLanguage);

  // We could add multiple samples for the same desired
  // type, or many sources for other types. Here we're
  // just making one type from one piece of sample JSON.
  await jsonInput.addSource({
    name: typeName,
    samples: [jsonString]
  });

  const inputData = new InputData();
  inputData.addInput(jsonInput);

  return await quicktype({
    inputData,
    lang: targetLanguage
  });
}

async function quicktypeJSONSchema(
  targetLanguage: string,
  typeName: string,
  jsonSchemaString: string,
  options: any = {}
) {
  const schemaInput = new JSONSchemaInput(new FetchingJSONSchemaStore());

  // We could add multiple schemas for multiple types,
  // but here we're just making one type from JSON schema.
  await schemaInput.addSource({ name: typeName, schema: jsonSchemaString });

  const inputData = new InputData();
  inputData.addInput(schemaInput);

  // Pass all options to quicktype along with the required inputData and lang
  return await quicktype({
    ...options,
    inputData,
    lang: targetLanguage
  });
}

main().catch(async error => {
  // Dynamically import chalk in catch block
  const { default: chalk } = await import('chalk');
  console.error(chalk.red('Unhandled error:'), error);
  process.exit(1);
});
