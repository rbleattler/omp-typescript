/**
 * Oh My Posh TypeScript definitions
 *
 * Generated from schema: https://raw.githubusercontent.com/JanDeDobbeleer/oh-my-posh/refs/heads/main/themes/schema.json
 * Generated on: 2025-11-17T00:04:08.728Z
 *
 * @see https://ohmyposh.dev/docs/
 */


/* eslint-disable */
/* tslint:disable */

// import { parse as parseTOML, stringify as stringifyTOML } from 'smol-toml';
// import { parse as parseYAML, stringify as stringifyYAML } from "yaml";
// To parse this data:
//
//   import { Convert, Config } from "./file";
//
//   const config = Convert.toConfig(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

/**
 * https://ohmyposh.dev/docs/configuration/general
 */
export type Config = {
    accent_color?: string;
    async?:        boolean;
    /**
     * https://ohmyposh.dev/docs/configuration/general#blocks
     */
    blocks: Block[];
    /**
     * https://ohmyposh.dev/docs/configuration/title#console-title-template
     */
    console_title_template?: string;
    /**
     * https://ohmyposh.dev/docs/configuration/colors#cycle
     */
    cycle?: CycleElement[];
    /**
     * https://ohmyposh.dev/docs/configuration/debug-prompt
     */
    debug_prompt?: ExtraPrompt;
    /**
     * https://ohmyposh.dev/docs/configuration/general#general-settings
     */
    enable_cursor_positioning?: boolean;
    /**
     * https://ohmyposh.dev/docs/configuration/line-error
     */
    error_line?: ExtraPrompt;
    /**
     * https://ohmyposh.dev/docs/configuration/general#extends
     */
    extends?: string;
    /**
     * https://ohmyposh.dev/docs/configuration/general#general-settings
     */
    final_space?:    boolean;
    iterm_features?: TheITerm2FeaturesToEnable[];
    /**
     * https://ohmyposh.dev/docs/configuration/general#maps
     */
    maps?: { [key: string]: any };
    /**
     * https://ohmyposh.dev/docs/configuration/colors#palette
     */
    palette?: { [key: string]: string };
    /**
     * https://ohmyposh.dev/docs/configuration/colors#palettes
     */
    palettes?: Palettes;
    /**
     * https://ohmyposh.dev/docs/configuration/general#general-settings
     */
    patch_pwsh_bleed?: boolean;
    /**
     * https://ohmyposh.dev/docs/configuration/general#general-settings
     */
    pwd?: string;
    /**
     * https://ohmyposh.dev/docs/configuration/secondary-prompt
     */
    secondary_prompt?:    ExtraPrompt;
    shell_integration?:   boolean;
    terminal_background?: string;
    /**
     * https://ohmyposh.dev/docs/configuration/tooltips
     */
    tooltips?: TooltipListPromptElementsToDisplayBasedOnContext[];
    /**
     * https://ohmyposh.dev/docs/configuration/tooltips#tooltips-action
     */
    tooltips_action?: TooltipsAction;
    /**
     * https://ohmyposh.dev/docs/configuration/transient
     */
    transient_prompt?: TransientPromptSetting;
    /**
     * https://ohmyposh.dev/docs/configuration/general#general-settings
     */
    upgrade?: EnableUpgradeNotice;
    /**
     * https://ohmyposh.dev/docs/configuration/line-error
     */
    valid_line?: ExtraPrompt;
    /**
     * https://ohmyposh.dev/docs/configuration/templates#config-variables
     */
    var?: { [key: string]: any };
    /**
     * https://ohmyposh.dev/docs/configuration/general
     */
    version?: number;
    [property: string]: any;
}

/**
 * https://ohmyposh.dev/docs/configuration/block
 */
export type Block = {
    /**
     * https://ohmyposh.dev/docs/configuration/block#alignment
     */
    alignment?: BlockAlignment;
    /**
     * https://ohmyposh.dev/docs/configuration/block#leading-diamond
     */
    leading_diamond?: string;
    /**
     * https://ohmyposh.dev/docs/configuration/block#newline
     */
    newline?: boolean;
    /**
     * https://ohmyposh.dev/docs/configuration/block#segments
     */
    segments?: Segment[];
    /**
     * https://ohmyposh.dev/docs/configuration/block#trailing-diamond
     */
    trailing_diamond?: string;
    /**
     * https://ohmyposh.dev/docs/configuration/block#type
     */
    type?: BlockType;
    [property: string]: any;
}

/**
 * https://ohmyposh.dev/docs/configuration/block#alignment
 */
export type BlockAlignment = "left" | "right";

/**
 * https://ohmyposh.dev/docs/configuration/segment
 */
export type Segment = {
    /**
     * https://ohmyposh.dev/docs/configuration/segment
     */
    alias?:      string;
    background?: string;
    /**
     * https://ohmyposh.dev/docs/configuration/colors#color-templates
     */
    background_templates?: string[];
    /**
     * https://ohmyposh.dev/docs/configuration/segment#cache
     */
    cache?: CacheSettings;
    /**
     * https://ohmyposh.dev/docs/configuration/segment#include--exclude-folders
     */
    exclude_folders?: string[];
    foreground?:      string;
    /**
     * https://ohmyposh.dev/docs/configuration/colors#color-templates
     */
    foreground_templates?: string[];
    /**
     * https://ohmyposh.dev/docs/configuration/segment#include--exclude-folders
     */
    include_folders?: string[];
    /**
     * https://ohmyposh.dev/docs/configuration/segment
     */
    interactive?: boolean;
    /**
     * https://ohmyposh.dev/docs/configuration/segment
     */
    max_width?: number;
    /**
     * https://ohmyposh.dev/docs/configuration/segment
     */
    min_width?: number;
    /**
     * https://ohmyposh.dev/docs/configuration/segment#properties
     */
    properties?: { [key: string]: any };
    /**
     * https://ohmyposh.dev/docs/configuration/segment#style
     */
    style: string;
    /**
     * https://ohmyposh.dev/docs/configuration/templates
     */
    template?: string;
    /**
     * https://ohmyposh.dev/docs/configuration/segment
     */
    templates_logic?: TemplatesLogic;
    /**
     * https://ohmyposh.dev/docs/configuration/segment
     */
    type: SegmentType;
    [property: string]: any;
}

/**
 * https://ohmyposh.dev/docs/configuration/segment#cache
 */
export type CacheSettings = {
    duration?: string;
    /**
     * https://ohmyposh.dev/docs/configuration/segment#strategy
     */
    strategy?: CacheStrategy;
    [property: string]: any;
}

/**
 * https://ohmyposh.dev/docs/configuration/segment#strategy
 */
export type CacheStrategy = "folder" | "session";

/**
 * https://ohmyposh.dev/docs/configuration/segment
 */
export type TemplatesLogic = "first_match" | "join";

/**
 * https://ohmyposh.dev/docs/configuration/segment
 */
export type SegmentType = "angular" | "argocd" | "aurelia" | "aws" | "az" | "azd" | "azfunc" | "battery" | "bazel" | "brewfather" | "buf" | "bun" | "carbonintensity" | "cds" | "cf" | "cftarget" | "cmake" | "command" | "connection" | "crystal" | "dart" | "deno" | "docker" | "dotnet" | "elixir" | "executiontime" | "firebase" | "flutter" | "fortran" | "fossil" | "gcp" | "git" | "gitversion" | "go" | "haskell" | "helm" | "http" | "ipify" | "java" | "jujutsu" | "julia" | "kotlin" | "kubectl" | "lastfm" | "lua" | "mercurial" | "mojo" | "mvn" | "nbgv" | "nightscout" | "nim" | "nix-shell" | "node" | "npm" | "nx" | "ocaml" | "os" | "owm" | "path" | "perl" | "php" | "plastic" | "pnpm" | "project" | "pulumi" | "python" | "quasar" | "r" | "react" | "root" | "ruby" | "rust" | "sapling" | "session" | "shell" | "sitecore" | "spotify" | "status" | "strava" | "svelte" | "svn" | "swift" | "sysinfo" | "talosctl" | "tauri" | "terraform" | "text" | "time" | "ui5tooling" | "umbraco" | "unity" | "upgrade" | "v" | "vala" | "wakatime" | "winreg" | "withings" | "xmake" | "yarn" | "ytm" | "zig";

/**
 * https://ohmyposh.dev/docs/configuration/block#type
 */
export type BlockType = "prompt" | "rprompt";

export type CycleElement = any[] | boolean | number | number | null | CycleObject | string;

export type CycleObject = {
    background?: string;
    foreground?: string;
    [property: string]: any;
}

/**
 * https://ohmyposh.dev/docs/configuration/debug-prompt
 *
 * https://ohmyposh.dev/docs/configuration/line-error
 *
 * https://ohmyposh.dev/docs/configuration/secondary-prompt
 */
export type ExtraPrompt = {
    background?: string;
    /**
     * https://ohmyposh.dev/docs/configuration/colors#color-templates
     */
    background_templates?: string[];
    foreground?:           string;
    /**
     * https://ohmyposh.dev/docs/configuration/colors#color-templates
     */
    foreground_templates?: string[];
    template?:             string;
    [property: string]: any;
}

export type TheITerm2FeaturesToEnable = "prompt_mark" | "current_dir" | "remote_host";

/**
 * https://ohmyposh.dev/docs/configuration/colors#palettes
 */
export type Palettes = {
    list?:     { [key: string]: { [key: string]: string } };
    template?: string;
    [property: string]: any;
}

/**
 * https://ohmyposh.dev/docs/configuration/segment
 */
export type TooltipListPromptElementsToDisplayBasedOnContext = {
    /**
     * https://ohmyposh.dev/docs/configuration/segment
     */
    alias?:      string;
    background?: string;
    /**
     * https://ohmyposh.dev/docs/configuration/colors#color-templates
     */
    background_templates?: string[];
    /**
     * https://ohmyposh.dev/docs/configuration/segment#cache
     */
    cache?: CacheSettings;
    /**
     * https://ohmyposh.dev/docs/configuration/segment#include--exclude-folders
     */
    exclude_folders?: string[];
    foreground?:      string;
    /**
     * https://ohmyposh.dev/docs/configuration/colors#color-templates
     */
    foreground_templates?: string[];
    /**
     * https://ohmyposh.dev/docs/configuration/segment#include--exclude-folders
     */
    include_folders?: string[];
    /**
     * https://ohmyposh.dev/docs/configuration/segment
     */
    interactive?: boolean;
    /**
     * https://ohmyposh.dev/docs/configuration/segment
     */
    max_width?: number;
    /**
     * https://ohmyposh.dev/docs/configuration/segment
     */
    min_width?: number;
    /**
     * https://ohmyposh.dev/docs/configuration/segment#properties
     */
    properties?: { [key: string]: any };
    /**
     * https://ohmyposh.dev/docs/configuration/segment#style
     */
    style: string;
    /**
     * https://ohmyposh.dev/docs/configuration/templates
     */
    template?: string;
    /**
     * https://ohmyposh.dev/docs/configuration/segment
     */
    templates_logic?: TemplatesLogic;
    tips:             string[];
    /**
     * https://ohmyposh.dev/docs/configuration/segment
     */
    type: SegmentType;
    [property: string]: any;
}

/**
 * https://ohmyposh.dev/docs/configuration/tooltips#tooltips-action
 */
export type TooltipsAction = "replace" | "extend" | "prepend";

/**
 * https://ohmyposh.dev/docs/configuration/transient
 *
 * https://ohmyposh.dev/docs/configuration/debug-prompt
 *
 * https://ohmyposh.dev/docs/configuration/line-error
 *
 * https://ohmyposh.dev/docs/configuration/secondary-prompt
 */
export type TransientPromptSetting = {
    background?: string;
    /**
     * https://ohmyposh.dev/docs/configuration/colors#color-templates
     */
    background_templates?: string[];
    filler?:               string;
    foreground?:           string;
    /**
     * https://ohmyposh.dev/docs/configuration/colors#color-templates
     */
    foreground_templates?: string[];
    /**
     * Add a newline before the prompt
     */
    newline?:  boolean;
    template?: string;
    [property: string]: any;
}

/**
 * https://ohmyposh.dev/docs/configuration/general#general-settings
 */
export type EnableUpgradeNotice = {
    auto?:     boolean;
    interval?: string;
    notice?:   boolean;
    source?:   Source;
    [property: string]: any;
}

export type Source = "cdn" | "github";

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toConfig(json: string): Config {
        return cast(JSON.parse(json), r("Config"));
    }

    public static configToJson(value: Config): string {
        return JSON.stringify(uncast(value, r("Config")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
    const prettyTyp = prettyTypeName(typ);
    const parentText = parent ? ` on ${parent}` : '';
    const keyText = key ? ` for key "${key}"` : '';
    throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
    if (Array.isArray(typ)) {
        if (typ.length === 2 && typ[0] === undefined) {
            return `an optional ${prettyTypeName(typ[1])}`;
        } else {
            return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
        }
    } else if (typeof typ === "object" && typ.literal !== undefined) {
        return typ.literal;
    } else {
        return typeof typ;
    }
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key, parent);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val, key, parent);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue(l("Date"), val, key, parent);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue(l(ref || "object"), val, key, parent);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, key, ref);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key, ref);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val, key, parent);
    }
    if (typ === false) return invalidValue(typ, val, key, parent);
    let ref: any = undefined;
    while (typeof typ === "object" && typ.ref !== undefined) {
        ref = typ.ref;
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val, key, parent);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
    return { literal: typ };
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "Config": o([
        { json: "accent_color", js: "accent_color", typ: u(undefined, "") },
        { json: "async", js: "async", typ: u(undefined, true) },
        { json: "blocks", js: "blocks", typ: a(r("Block")) },
        { json: "console_title_template", js: "console_title_template", typ: u(undefined, "") },
        { json: "cycle", js: "cycle", typ: u(undefined, a(u(a("any"), true, 3.14, 0, null, r("CycleObject"), ""))) },
        { json: "debug_prompt", js: "debug_prompt", typ: u(undefined, r("ExtraPrompt")) },
        { json: "enable_cursor_positioning", js: "enable_cursor_positioning", typ: u(undefined, true) },
        { json: "error_line", js: "error_line", typ: u(undefined, r("ExtraPrompt")) },
        { json: "extends", js: "extends", typ: u(undefined, "") },
        { json: "final_space", js: "final_space", typ: u(undefined, true) },
        { json: "iterm_features", js: "iterm_features", typ: u(undefined, a(r("TheITerm2FeaturesToEnable"))) },
        { json: "maps", js: "maps", typ: u(undefined, m("any")) },
        { json: "palette", js: "palette", typ: u(undefined, m("")) },
        { json: "palettes", js: "palettes", typ: u(undefined, r("Palettes")) },
        { json: "patch_pwsh_bleed", js: "patch_pwsh_bleed", typ: u(undefined, true) },
        { json: "pwd", js: "pwd", typ: u(undefined, "") },
        { json: "secondary_prompt", js: "secondary_prompt", typ: u(undefined, r("ExtraPrompt")) },
        { json: "shell_integration", js: "shell_integration", typ: u(undefined, true) },
        { json: "terminal_background", js: "terminal_background", typ: u(undefined, "") },
        { json: "tooltips", js: "tooltips", typ: u(undefined, a(r("TooltipListPromptElementsToDisplayBasedOnContext"))) },
        { json: "tooltips_action", js: "tooltips_action", typ: u(undefined, r("TooltipsAction")) },
        { json: "transient_prompt", js: "transient_prompt", typ: u(undefined, r("TransientPromptSetting")) },
        { json: "upgrade", js: "upgrade", typ: u(undefined, r("EnableUpgradeNotice")) },
        { json: "valid_line", js: "valid_line", typ: u(undefined, r("ExtraPrompt")) },
        { json: "var", js: "var", typ: u(undefined, m("any")) },
        { json: "version", js: "version", typ: u(undefined, 0) },
    ], "any"),
    "Block": o([
        { json: "alignment", js: "alignment", typ: u(undefined, r("BlockAlignment")) },
        { json: "leading_diamond", js: "leading_diamond", typ: u(undefined, "") },
        { json: "newline", js: "newline", typ: u(undefined, true) },
        { json: "segments", js: "segments", typ: u(undefined, a(r("Segment"))) },
        { json: "trailing_diamond", js: "trailing_diamond", typ: u(undefined, "") },
        { json: "type", js: "type", typ: u(undefined, r("BlockType")) },
    ], "any"),
    "Segment": o([
        { json: "alias", js: "alias", typ: u(undefined, "") },
        { json: "background", js: "background", typ: u(undefined, "") },
        { json: "background_templates", js: "background_templates", typ: u(undefined, a("")) },
        { json: "cache", js: "cache", typ: u(undefined, r("CacheSettings")) },
        { json: "exclude_folders", js: "exclude_folders", typ: u(undefined, a("")) },
        { json: "foreground", js: "foreground", typ: u(undefined, "") },
        { json: "foreground_templates", js: "foreground_templates", typ: u(undefined, a("")) },
        { json: "include_folders", js: "include_folders", typ: u(undefined, a("")) },
        { json: "interactive", js: "interactive", typ: u(undefined, true) },
        { json: "max_width", js: "max_width", typ: u(undefined, 0) },
        { json: "min_width", js: "min_width", typ: u(undefined, 0) },
        { json: "properties", js: "properties", typ: u(undefined, m("any")) },
        { json: "style", js: "style", typ: "" },
        { json: "template", js: "template", typ: u(undefined, "") },
        { json: "templates_logic", js: "templates_logic", typ: u(undefined, r("TemplatesLogic")) },
        { json: "type", js: "type", typ: r("SegmentType") },
    ], "any"),
    "CacheSettings": o([
        { json: "duration", js: "duration", typ: u(undefined, "") },
        { json: "strategy", js: "strategy", typ: u(undefined, r("CacheStrategy")) },
    ], "any"),
    "CycleObject": o([
        { json: "background", js: "background", typ: u(undefined, "") },
        { json: "foreground", js: "foreground", typ: u(undefined, "") },
    ], "any"),
    "ExtraPrompt": o([
        { json: "background", js: "background", typ: u(undefined, "") },
        { json: "background_templates", js: "background_templates", typ: u(undefined, a("")) },
        { json: "foreground", js: "foreground", typ: u(undefined, "") },
        { json: "foreground_templates", js: "foreground_templates", typ: u(undefined, a("")) },
        { json: "template", js: "template", typ: u(undefined, "") },
    ], "any"),
    "Palettes": o([
        { json: "list", js: "list", typ: u(undefined, m(m(""))) },
        { json: "template", js: "template", typ: u(undefined, "") },
    ], "any"),
    "TooltipListPromptElementsToDisplayBasedOnContext": o([
        { json: "alias", js: "alias", typ: u(undefined, "") },
        { json: "background", js: "background", typ: u(undefined, "") },
        { json: "background_templates", js: "background_templates", typ: u(undefined, a("")) },
        { json: "cache", js: "cache", typ: u(undefined, r("CacheSettings")) },
        { json: "exclude_folders", js: "exclude_folders", typ: u(undefined, a("")) },
        { json: "foreground", js: "foreground", typ: u(undefined, "") },
        { json: "foreground_templates", js: "foreground_templates", typ: u(undefined, a("")) },
        { json: "include_folders", js: "include_folders", typ: u(undefined, a("")) },
        { json: "interactive", js: "interactive", typ: u(undefined, true) },
        { json: "max_width", js: "max_width", typ: u(undefined, 0) },
        { json: "min_width", js: "min_width", typ: u(undefined, 0) },
        { json: "properties", js: "properties", typ: u(undefined, m("any")) },
        { json: "style", js: "style", typ: "" },
        { json: "template", js: "template", typ: u(undefined, "") },
        { json: "templates_logic", js: "templates_logic", typ: u(undefined, r("TemplatesLogic")) },
        { json: "tips", js: "tips", typ: a("") },
        { json: "type", js: "type", typ: r("SegmentType") },
    ], "any"),
    "TransientPromptSetting": o([
        { json: "background", js: "background", typ: u(undefined, "") },
        { json: "background_templates", js: "background_templates", typ: u(undefined, a("")) },
        { json: "filler", js: "filler", typ: u(undefined, "") },
        { json: "foreground", js: "foreground", typ: u(undefined, "") },
        { json: "foreground_templates", js: "foreground_templates", typ: u(undefined, a("")) },
        { json: "newline", js: "newline", typ: u(undefined, true) },
        { json: "template", js: "template", typ: u(undefined, "") },
    ], "any"),
    "EnableUpgradeNotice": o([
        { json: "auto", js: "auto", typ: u(undefined, true) },
        { json: "interval", js: "interval", typ: u(undefined, "") },
        { json: "notice", js: "notice", typ: u(undefined, true) },
        { json: "source", js: "source", typ: u(undefined, r("Source")) },
    ], "any"),
    "BlockAlignment": [
        "left",
        "right",
    ],
    "CacheStrategy": [
        "folder",
        "session",
    ],
    "TemplatesLogic": [
        "first_match",
        "join",
    ],
    "SegmentType": [
        "angular",
        "argocd",
        "aurelia",
        "aws",
        "az",
        "azd",
        "azfunc",
        "battery",
        "bazel",
        "brewfather",
        "buf",
        "bun",
        "carbonintensity",
        "cds",
        "cf",
        "cftarget",
        "cmake",
        "command",
        "connection",
        "crystal",
        "dart",
        "deno",
        "docker",
        "dotnet",
        "elixir",
        "executiontime",
        "firebase",
        "flutter",
        "fortran",
        "fossil",
        "gcp",
        "git",
        "gitversion",
        "go",
        "haskell",
        "helm",
        "http",
        "ipify",
        "java",
        "jujutsu",
        "julia",
        "kotlin",
        "kubectl",
        "lastfm",
        "lua",
        "mercurial",
        "mojo",
        "mvn",
        "nbgv",
        "nightscout",
        "nim",
        "nix-shell",
        "node",
        "npm",
        "nx",
        "ocaml",
        "os",
        "owm",
        "path",
        "perl",
        "php",
        "plastic",
        "pnpm",
        "project",
        "pulumi",
        "python",
        "quasar",
        "r",
        "react",
        "root",
        "ruby",
        "rust",
        "sapling",
        "session",
        "shell",
        "sitecore",
        "spotify",
        "status",
        "strava",
        "svelte",
        "svn",
        "swift",
        "sysinfo",
        "talosctl",
        "tauri",
        "terraform",
        "text",
        "time",
        "ui5tooling",
        "umbraco",
        "unity",
        "upgrade",
        "v",
        "vala",
        "wakatime",
        "winreg",
        "withings",
        "xmake",
        "yarn",
        "ytm",
        "zig",
    ],
    "BlockType": [
        "prompt",
        "rprompt",
    ],
    "TheITerm2FeaturesToEnable": [
        "current_dir",
        "prompt_mark",
        "remote_host",
    ],
    "TooltipsAction": [
        "extend",
        "prepend",
        "replace",
    ],
    "Source": [
        "cdn",
        "github",
    ],
};
