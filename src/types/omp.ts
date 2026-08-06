/**
 * Oh My Posh TypeScript definitions
 *
 * Generated from schema: https://raw.githubusercontent.com/JanDeDobbeleer/oh-my-posh/refs/heads/main/themes/schema.json
 * Generated on: 2026-08-06T00:17:39.926Z
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
 * A theme file defines the prompt layout, palette, blocks, and segments Oh My Posh renders
 * in a shell.
 */
export type Config = {
    accent_color?: string;
    /**
     * Render segments as their data becomes available instead of waiting for every segment to
     * finish, so the prompt appears faster while slow segments (e.g. network- or git-heavy
     * ones) update in place once ready.
     */
    async?: boolean;
    /**
     * A list of blocks that define the prompt layout and the segments each block renders.
     */
    blocks: Block[];
    /**
     * Template used to render the terminal's window title.
     */
    console_title_template?: string;
    /**
     * Set the terminal cursor's shape/blink state via a DECSCUSR sequence at the start of the
     * prompt.
     */
    cursor_style?: CursorStyle;
    /**
     * A list of foreground and background colors to rotate through as segments render.
     */
    cycle?: CycleElement[];
    /**
     * Configure the prompt shown while debugging a PowerShell script.
     */
    debug_prompt?: ExtraPrompt;
    /**
     * Fetch the cursor position so the prompt can avoid leaving a leading blank line at the top
     * of the terminal.
     */
    enable_cursor_positioning?: boolean;
    /**
     * Render a custom prompt when the current PowerShell input line contains an error.
     */
    error_line?: ExtraPrompt;
    /**
     * Path to another configuration file to inherit from.
     */
    extends?: string;
    /**
     * Add a trailing space to the end of the prompt.
     */
    final_space?: boolean;
    /**
     * iTerm2-specific shell integration features to enable. "prompt_mark" marks the prompt line
     * so iTerm2 can jump between commands, "current_dir" reports the working directory for the
     * title bar and new tabs/panes, and "remote_host" reports the hostname/username for badges
     * and session restore.
     */
    iterm_features?: TheITerm2FeaturesToEnable[];
    /**
     * Custom replacements for user, host, and shell names used in templates.
     */
    maps?: { [key: string]: any };
    /**
     * A map of named colors that can be reused throughout the theme.
     */
    palette?: { [key: string]: string };
    /**
     * A set of alternate palettes that can be selected dynamically at runtime.
     */
    palettes?: Palettes;
    /**
     * Work around a PowerShell color-bleed issue that can leave stray background colors at the
     * end of the buffer.
     */
    patch_pwsh_bleed?: boolean;
    /**
     * Report the current working directory to the terminal using OSC 99, 7, or 51 sequences.
     */
    pwd?: string;
    /**
     * Configure the prompt shown for multi-line commands.
     */
    secondary_prompt?: SecondaryPromptSetting;
    /**
     * Wrap the prompt and command output in FTCS (Final Term Control Sequences) markers so
     * supported terminals can identify command boundaries, enabling features like command
     * status in the scrollbar and jump-to-previous-command.
     */
    shell_integration?: boolean;
    /**
     * Enable streaming mode with a timeout in milliseconds for segments that are still
     * resolving.
     */
    streaming?:           number;
    terminal_background?: string;
    /**
     * Map terminal features to the terminals that support them.
     */
    terminal_features?: TerminalFeaturesConfiguration;
    /**
     * A list of tooltip segments that appear when you type matching commands.
     */
    tooltips?: TooltipListPromptElementsToDisplayBasedOnContext[];
    /**
     * Choose whether tooltips replace, extend, or prepend the current right prompt.
     */
    tooltips_action?: TooltipsAction;
    /**
     * Configure the prompt that replaces the primary prompt after a command is executed.
     */
    transient_prompt?: TransientPromptSetting;
    /**
     * Enable the upgrade notice or automatic updates for Oh My Posh.
     */
    upgrade?: EnableUpgradeNotice;
    /**
     * Render a custom prompt when the current PowerShell input line is valid.
     */
    valid_line?: ExtraPrompt;
    /**
     * Custom variables that can be referenced from templates.
     */
    var?: { [key: string]: any };
    /**
     * The schema version for the configuration file.
     */
    version?: number;
    [property: string]: any;
}

/**
 * A horizontal section of the prompt that groups one or more segments together on a single
 * line.
 */
export type Block = {
    /**
     * Whether the block is aligned to the left or right edge of the terminal.
     */
    alignment?: BlockAlignment;
    /**
     * The character(s) repeated to fill the gap between a left-aligned and right-aligned block.
     */
    filler?: string;
    /**
     * Always render the block, even when every one of its segments is empty.
     */
    force?: boolean;
    /**
     * The position of this block in the configuration, used to target it when overriding a
     * specific block in a base configuration.
     */
    index?: number;
    /**
     * The character used to start the first segment of the block when you want it to always
     * begin with a diamond shape.
     */
    leading_diamond?: string;
    /**
     * Start the block on a new line before rendering its segments.
     */
    newline?: boolean;
    /**
     * How to handle this block when it no longer fits the terminal width: break moves it to a
     * new line, hide removes it.
     */
    overflow?: string;
    /**
     * Restart the shared color cycle from its first color at the start of this block instead of
     * continuing where the previous block left off.
     */
    restart_cycle?: boolean;
    /**
     * The list of segments rendered in this block, in order.
     */
    segments?: Segment[];
    /**
     * The character used to end the last segment of the block when you want it to always finish
     * with a diamond shape.
     */
    trailing_diamond?: string;
    /**
     * Whether this block renders as the main prompt or the right-aligned prompt (rprompt).
     */
    type?: BlockType;
    [property: string]: any;
}

/**
 * Whether the block is aligned to the left or right edge of the terminal.
 */
export type BlockAlignment = "left" | "right";

/**
 * A single element of the prompt, such as the current path, git status, or a language
 * version.
 */
export type Segment = {
    /**
     * A name for this segment so its data can be referenced from other segments' templates.
     */
    alias?:      string;
    background?: string;
    /**
     * A list of templates evaluated in order; the first one that resolves to a non-empty string
     * sets the background color.
     */
    background_templates?: string[];
    /**
     * Controls how long the segment's rendered output is reused before it's refreshed again,
     * useful when the segment is slow to compute.
     */
    cache?: CacheSettings;
    /**
     * Never render the segment while the current path is inside one of these folders.
     */
    exclude_folders?: string[];
    /**
     * A template rendered instead of hiding the segment when it has no data to show. Since the
     * segment isn't fully loaded at that point, stick to static text and global template
     * variables here. Leave empty to hide the segment as usual.
     */
    fallback_template?: string;
    foreground?:        string;
    /**
     * A list of templates evaluated in order; the first one that resolves to a non-empty string
     * sets the foreground color.
     */
    foreground_templates?: string[];
    /**
     * Only render the segment when the current path is inside one of these folders.
     */
    include_folders?: string[];
    /**
     * Stop escaping the segment's text so Bash/Zsh interactive prompt escape sequences inside
     * it are interpreted rather than shown literally.
     */
    interactive?: boolean;
    /**
     * Hide the segment once the terminal width goes above this value. Set to 0 to disable.
     */
    max_width?: number;
    /**
     * Hide the segment while the terminal width stays below this value. Set to 0 to disable.
     */
    min_width?: number;
    /**
     * Segment-specific settings that customize its behavior and appearance beyond the shared
     * segment properties.
     */
    options?: { [key: string]: any };
    /**
     * The text to display while the segment is loading in streaming mode.
     */
    placeholder?: string;
    /**
     * Deprecated: use options instead. This field only exists for backward compatibility with
     * version 3 configs and will be removed in a future version.
     */
    properties?: { [key: string]: any };
    /**
     * How the segment is rendered relative to its neighbors: powerline, plain, diamond, or
     * accordion.
     */
    style: string;
    /**
     * A Go text/template string used to render the segment's text.
     */
    template?: string;
    /**
     * How multiple templates are combined: first_match keeps only the first non-empty result,
     * join combines every non-empty result.
     */
    templates_logic?: TemplatesLogic;
    /**
     * The segment type, which determines what information is displayed and which options are
     * available.
     */
    type: SegmentType;
    [property: string]: any;
}

/**
 * Controls how long the segment's rendered output is reused before it's refreshed again,
 * useful when the segment is slow to compute.
 */
export type CacheSettings = {
    duration?: string;
    /**
     * Choose how cache entries are matched, such as by folder, shell session, or device.
     */
    strategy?: CacheStrategy;
    [property: string]: any;
}

/**
 * Choose how cache entries are matched, such as by folder, shell session, or device.
 */
export type CacheStrategy = "folder" | "session" | "device";

/**
 * How multiple templates are combined: first_match keeps only the first non-empty result,
 * join combines every non-empty result.
 */
export type TemplatesLogic = "first_match" | "join";

/**
 * The segment type, which determines what information is displayed and which options are
 * available.
 */
export type SegmentType = "angular" | "argocd" | "aspire" | "aurelia" | "aws" | "az" | "azd" | "azfunc" | "battery" | "bazel" | "brewfather" | "buf" | "bun" | "carbonintensity" | "cds" | "cf" | "cftarget" | "claude" | "clojure" | "cmake" | "copilot" | "copilot_cli" | "connection" | "crystal" | "dart" | "deno" | "docker" | "dotnet" | "dvc" | "elixir" | "executiontime" | "firebase" | "flutter" | "fortran" | "fossil" | "gcp" | "git" | "gitversion" | "go" | "gradle" | "haskell" | "helm" | "http" | "ipify" | "java" | "jujutsu" | "julia" | "kotlin" | "kubectl" | "lastfm" | "lua" | "mercurial" | "mojo" | "mvn" | "nba" | "nbgv" | "nightscout" | "nim" | "nix-shell" | "node" | "npm" | "nx" | "ocaml" | "orthodoxcal" | "os" | "owm" | "path" | "perl" | "php" | "plastic" | "pnpm" | "project" | "pulumi" | "python" | "quasar" | "r" | "ramadan" | "react" | "root" | "ruby" | "rust" | "sapling" | "session" | "shell" | "sitecore" | "spotify" | "status" | "strava" | "svelte" | "svn" | "swift" | "sysinfo" | "talosctl" | "taskwarrior" | "tauri" | "terraform" | "text" | "time" | "todoist" | "ui5tooling" | "umbraco" | "uno" | "unity" | "upgrade" | "v" | "vala" | "vimode" | "wakatime" | "winget" | "winreg" | "withings" | "xmake" | "yarn" | "ytm" | "zig" | "zvm";

/**
 * Whether this block renders as the main prompt or the right-aligned prompt (rprompt).
 */
export type BlockType = "prompt" | "rprompt";

/**
 * Set the terminal cursor's shape/blink state via a DECSCUSR sequence at the start of the
 * prompt.
 */
export type CursorStyle = "blinking_block" | "steady_block" | "blinking_underline" | "steady_underline" | "blinking_bar" | "steady_bar" | "default_steady" | "default_blinking";

export type CycleElement = any[] | boolean | number | number | null | CycleObject | string;

export type CycleObject = {
    background?: string;
    foreground?: string;
    [property: string]: any;
}

/**
 * Configure the prompt shown while debugging a PowerShell script.
 *
 * Render a custom prompt when the current PowerShell input line contains an error.
 *
 * Render a custom prompt when the current PowerShell input line is valid.
 */
export type ExtraPrompt = {
    background?: string;
    /**
     * A list of templates evaluated in order; the first one that resolves to a non-empty string
     * sets the background color.
     */
    background_templates?: string[];
    foreground?:           string;
    /**
     * A list of templates evaluated in order; the first one that resolves to a non-empty string
     * sets the foreground color.
     */
    foreground_templates?: string[];
    /**
     * The template used to render this prompt segment; supports the same Go template syntax and
     * functions as regular segment templates.
     */
    template?: string;
    [property: string]: any;
}

export type TheITerm2FeaturesToEnable = "prompt_mark" | "current_dir" | "remote_host";

/**
 * A set of alternate palettes that can be selected dynamically at runtime.
 */
export type Palettes = {
    /**
     * A map of palette name to palette definition; each named palette can be activated at
     * runtime via the "template" above.
     */
    list?: { [key: string]: { [key: string]: string } };
    /**
     * A template that resolves to the key of the palette (in "list") to activate; leave empty
     * or unresolved to use the default palette.
     */
    template?: string;
    [property: string]: any;
}

/**
 * Configure the prompt shown for multi-line commands.
 *
 * Configure the prompt shown while debugging a PowerShell script.
 *
 * Render a custom prompt when the current PowerShell input line contains an error.
 *
 * Render a custom prompt when the current PowerShell input line is valid.
 */
export type SecondaryPromptSetting = {
    background?: string;
    /**
     * A list of templates evaluated in order; the first one that resolves to a non-empty string
     * sets the background color.
     */
    background_templates?: string[];
    foreground?:           string;
    /**
     * A list of templates evaluated in order; the first one that resolves to a non-empty string
     * sets the foreground color.
     */
    foreground_templates?: string[];
    /**
     * Treat multi-line commands as a single block to support transient prompts correctly.
     */
    multiline_keepprompt?: boolean;
    /**
     * The template used to render this prompt segment; supports the same Go template syntax and
     * functions as regular segment templates.
     */
    template?: string;
    [property: string]: any;
}

/**
 * Map terminal features to the terminals that support them.
 */
export type TerminalFeaturesConfiguration = {
    /**
     * Terminal programs supporting OSC 9;4 progress sequences, matched case-insensitively
     * against $TERM_PROGRAM. Defaults to Windows Terminal.
     */
    progress?: string[];
    [property: string]: any;
}

/**
 * A single element of the prompt, such as the current path, git status, or a language
 * version.
 */
export type TooltipListPromptElementsToDisplayBasedOnContext = {
    /**
     * A name for this segment so its data can be referenced from other segments' templates.
     */
    alias?:      string;
    background?: string;
    /**
     * A list of templates evaluated in order; the first one that resolves to a non-empty string
     * sets the background color.
     */
    background_templates?: string[];
    /**
     * Controls how long the segment's rendered output is reused before it's refreshed again,
     * useful when the segment is slow to compute.
     */
    cache?: CacheSettings;
    /**
     * Never render the segment while the current path is inside one of these folders.
     */
    exclude_folders?: string[];
    /**
     * A template rendered instead of hiding the segment when it has no data to show. Since the
     * segment isn't fully loaded at that point, stick to static text and global template
     * variables here. Leave empty to hide the segment as usual.
     */
    fallback_template?: string;
    foreground?:        string;
    /**
     * A list of templates evaluated in order; the first one that resolves to a non-empty string
     * sets the foreground color.
     */
    foreground_templates?: string[];
    /**
     * Only render the segment when the current path is inside one of these folders.
     */
    include_folders?: string[];
    /**
     * Stop escaping the segment's text so Bash/Zsh interactive prompt escape sequences inside
     * it are interpreted rather than shown literally.
     */
    interactive?: boolean;
    /**
     * Hide the segment once the terminal width goes above this value. Set to 0 to disable.
     */
    max_width?: number;
    /**
     * Hide the segment while the terminal width stays below this value. Set to 0 to disable.
     */
    min_width?: number;
    /**
     * Segment-specific settings that customize its behavior and appearance beyond the shared
     * segment properties.
     */
    options?: { [key: string]: any };
    /**
     * The text to display while the segment is loading in streaming mode.
     */
    placeholder?: string;
    /**
     * Deprecated: use options instead. This field only exists for backward compatibility with
     * version 3 configs and will be removed in a future version.
     */
    properties?: { [key: string]: any };
    /**
     * How the segment is rendered relative to its neighbors: powerline, plain, diamond, or
     * accordion.
     */
    style: string;
    /**
     * A Go text/template string used to render the segment's text.
     */
    template?: string;
    /**
     * How multiple templates are combined: first_match keeps only the first non-empty result,
     * join combines every non-empty result.
     */
    templates_logic?: TemplatesLogic;
    tips:             string[];
    /**
     * The segment type, which determines what information is displayed and which options are
     * available.
     */
    type: SegmentType;
    [property: string]: any;
}

/**
 * Choose whether tooltips replace, extend, or prepend the current right prompt.
 */
export type TooltipsAction = "replace" | "extend" | "prepend";

/**
 * Configure the prompt that replaces the primary prompt after a command is executed.
 *
 * Configure the prompt shown while debugging a PowerShell script.
 *
 * Render a custom prompt when the current PowerShell input line contains an error.
 *
 * Render a custom prompt when the current PowerShell input line is valid.
 */
export type TransientPromptSetting = {
    background?: string;
    /**
     * A list of templates evaluated in order; the first one that resolves to a non-empty string
     * sets the background color.
     */
    background_templates?: string[];
    filler?:               string;
    foreground?:           string;
    /**
     * A list of templates evaluated in order; the first one that resolves to a non-empty string
     * sets the foreground color.
     */
    foreground_templates?: string[];
    /**
     * Add a newline before the prompt.
     */
    newline?: boolean;
    /**
     * The right-aligned template to render next to the transient prompt, supported in zsh and
     * PowerShell only.
     */
    right_template?: string;
    /**
     * The template used to render this prompt segment; supports the same Go template syntax and
     * functions as regular segment templates.
     */
    template?: string;
    [property: string]: any;
}

/**
 * Enable the upgrade notice or automatic updates for Oh My Posh.
 */
export type EnableUpgradeNotice = {
    /**
     * Automatically download and install new releases in the background instead of only
     * notifying that one is available.
     */
    auto?:     boolean;
    interval?: string;
    /**
     * Show a one-time notice in the prompt when a new release is available.
     */
    notice?: boolean;
    /**
     * Where to check for and download new releases from. "cdn" uses the Oh My Posh CDN;
     * "github" queries the GitHub releases API directly.
     */
    source?: Source;
    [property: string]: any;
}

/**
 * Where to check for and download new releases from. "cdn" uses the Oh My Posh CDN;
 * "github" queries the GitHub releases API directly.
 */
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
        { json: "cursor_style", js: "cursor_style", typ: u(undefined, r("CursorStyle")) },
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
        { json: "secondary_prompt", js: "secondary_prompt", typ: u(undefined, r("SecondaryPromptSetting")) },
        { json: "shell_integration", js: "shell_integration", typ: u(undefined, true) },
        { json: "streaming", js: "streaming", typ: u(undefined, 0) },
        { json: "terminal_background", js: "terminal_background", typ: u(undefined, "") },
        { json: "terminal_features", js: "terminal_features", typ: u(undefined, r("TerminalFeaturesConfiguration")) },
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
        { json: "filler", js: "filler", typ: u(undefined, "") },
        { json: "force", js: "force", typ: u(undefined, true) },
        { json: "index", js: "index", typ: u(undefined, 0) },
        { json: "leading_diamond", js: "leading_diamond", typ: u(undefined, "") },
        { json: "newline", js: "newline", typ: u(undefined, true) },
        { json: "overflow", js: "overflow", typ: u(undefined, "") },
        { json: "restart_cycle", js: "restart_cycle", typ: u(undefined, true) },
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
        { json: "fallback_template", js: "fallback_template", typ: u(undefined, "") },
        { json: "foreground", js: "foreground", typ: u(undefined, "") },
        { json: "foreground_templates", js: "foreground_templates", typ: u(undefined, a("")) },
        { json: "include_folders", js: "include_folders", typ: u(undefined, a("")) },
        { json: "interactive", js: "interactive", typ: u(undefined, true) },
        { json: "max_width", js: "max_width", typ: u(undefined, 0) },
        { json: "min_width", js: "min_width", typ: u(undefined, 0) },
        { json: "options", js: "options", typ: u(undefined, m("any")) },
        { json: "placeholder", js: "placeholder", typ: u(undefined, "") },
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
    "SecondaryPromptSetting": o([
        { json: "background", js: "background", typ: u(undefined, "") },
        { json: "background_templates", js: "background_templates", typ: u(undefined, a("")) },
        { json: "foreground", js: "foreground", typ: u(undefined, "") },
        { json: "foreground_templates", js: "foreground_templates", typ: u(undefined, a("")) },
        { json: "multiline_keepprompt", js: "multiline_keepprompt", typ: u(undefined, true) },
        { json: "template", js: "template", typ: u(undefined, "") },
    ], "any"),
    "TerminalFeaturesConfiguration": o([
        { json: "progress", js: "progress", typ: u(undefined, a("")) },
    ], "any"),
    "TooltipListPromptElementsToDisplayBasedOnContext": o([
        { json: "alias", js: "alias", typ: u(undefined, "") },
        { json: "background", js: "background", typ: u(undefined, "") },
        { json: "background_templates", js: "background_templates", typ: u(undefined, a("")) },
        { json: "cache", js: "cache", typ: u(undefined, r("CacheSettings")) },
        { json: "exclude_folders", js: "exclude_folders", typ: u(undefined, a("")) },
        { json: "fallback_template", js: "fallback_template", typ: u(undefined, "") },
        { json: "foreground", js: "foreground", typ: u(undefined, "") },
        { json: "foreground_templates", js: "foreground_templates", typ: u(undefined, a("")) },
        { json: "include_folders", js: "include_folders", typ: u(undefined, a("")) },
        { json: "interactive", js: "interactive", typ: u(undefined, true) },
        { json: "max_width", js: "max_width", typ: u(undefined, 0) },
        { json: "min_width", js: "min_width", typ: u(undefined, 0) },
        { json: "options", js: "options", typ: u(undefined, m("any")) },
        { json: "placeholder", js: "placeholder", typ: u(undefined, "") },
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
        { json: "right_template", js: "right_template", typ: u(undefined, "") },
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
        "device",
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
        "aspire",
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
        "claude",
        "clojure",
        "cmake",
        "connection",
        "copilot",
        "copilot_cli",
        "crystal",
        "dart",
        "deno",
        "docker",
        "dotnet",
        "dvc",
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
        "gradle",
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
        "nba",
        "nbgv",
        "nightscout",
        "nim",
        "nix-shell",
        "node",
        "npm",
        "nx",
        "ocaml",
        "orthodoxcal",
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
        "ramadan",
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
        "taskwarrior",
        "tauri",
        "terraform",
        "text",
        "time",
        "todoist",
        "ui5tooling",
        "umbraco",
        "unity",
        "uno",
        "upgrade",
        "v",
        "vala",
        "vimode",
        "wakatime",
        "winget",
        "winreg",
        "withings",
        "xmake",
        "yarn",
        "ytm",
        "zig",
        "zvm",
    ],
    "BlockType": [
        "prompt",
        "rprompt",
    ],
    "CursorStyle": [
        "blinking_bar",
        "blinking_block",
        "blinking_underline",
        "default_blinking",
        "default_steady",
        "steady_bar",
        "steady_block",
        "steady_underline",
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
