import grokSh from "./templates/grok.sh?raw";
import grokCmd from "./templates/grok.cmd?raw";
import fetchPs1 from "./templates/lib/fetch.ps1?raw";
import fetchAllSh from "./templates/fetch-all.sh?raw";
import fetchAllCmd from "./templates/fetch-all.cmd?raw";
import envSh from "./templates/env.sh?raw";
import envPs1 from "./templates/env.ps1?raw";
import envCmd from "./templates/env.cmd?raw";
import configToml from "./templates/home/config.toml?raw";
import apiKeyExample from "./templates/home/api-key.example?raw";
import readme from "./templates/README.txt?raw";
import startCommand from "./templates/Start Grok.command?raw";
import binReadme from "./templates/bin/README.txt?raw";

export const KIT_FOLDER = "GrokStick";
export const KIT_ZIP_NAME = "GrokStick.zip";

export type KitFile = {
  path: string;
  content: string;
  executable?: boolean;
  crlf?: boolean;
};

function unix(path: string, content: string, executable = false): KitFile {
  return { path, content: content.replace(/\r\n/g, "\n"), executable };
}

function win(path: string, content: string): KitFile {
  const normalized = content.replace(/\r\n/g, "\n").replace(/\n/g, "\r\n");
  return { path, content: normalized, crlf: true };
}

export const KIT_FILES: KitFile[] = [
  unix("README.txt", readme),
  unix("grok", grokSh, true),
  unix("fetch-all.sh", fetchAllSh, true),
  unix("env.sh", envSh, true),
  unix("Start Grok.command", startCommand, true),
  win("grok.cmd", grokCmd),
  win("fetch-all.cmd", fetchAllCmd),
  win("env.cmd", envCmd),
  win("env.ps1", envPs1),
  win("lib/fetch.ps1", fetchPs1),
  unix("home/config.toml", configToml),
  unix("home/api-key.example", apiKeyExample),
  unix("bin/README.txt", binReadme),
];

export const TREE_ROWS: { name: string; hint: string; kind: "file" | "dir" }[] = [
  { name: "grok", hint: "macOS / Linux launcher", kind: "file" },
  { name: "grok.cmd", hint: "Windows launcher", kind: "file" },
  { name: "fetch-all.sh / .cmd", hint: "preload every OS", kind: "file" },
  { name: "env.sh / .ps1 / .cmd", hint: "session PATH only", kind: "file" },
  { name: "bin/", hint: "official binaries land here", kind: "dir" },
  { name: "home/", hint: "login, settings, sessions", kind: "dir" },
  { name: "README.txt", hint: "keep this next to the launchers", kind: "file" },
];

export const PLATFORMS = [
  { id: "windows-x86_64", os: "Windows", cpu: "x64", size: "~134 MB" },
  { id: "windows-aarch64", os: "Windows", cpu: "ARM64", size: "~116 MB" },
  { id: "macos-aarch64", os: "macOS", cpu: "Apple silicon", size: "~127 MB" },
  { id: "macos-x86_64", os: "macOS", cpu: "Intel", size: "~143 MB" },
  { id: "linux-x86_64", os: "Linux", cpu: "x64", size: "~158 MB" },
  { id: "linux-aarch64", os: "Linux", cpu: "ARM64", size: "~129 MB" },
] as const;
