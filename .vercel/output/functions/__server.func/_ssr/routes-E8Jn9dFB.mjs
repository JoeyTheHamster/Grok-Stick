import { i as __toESM } from "../_runtime.mjs";
import { y as require_jsx_runtime, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as HardDrive, c as Download, d as ArrowRight, i as KeyRound, l as Copy, o as Folder, r as ShieldOff, s as File, t as Usb, u as Check } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Route } from "./router-DJRtFSay.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-E8Jn9dFB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 font-medium transition-[transform,background-color,color,border-color,opacity] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			primary: "bg-accent text-accent-fg hover:bg-accent-hover",
			secondary: "border border-border bg-surface text-fg hover:border-border-strong hover:bg-raised",
			ghost: "text-muted hover:bg-raised hover:text-fg"
		},
		size: {
			md: "h-11 rounded-md px-5 text-sm",
			lg: "h-12 rounded-lg px-6 text-base"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
var Button = (0, import_react.forwardRef)(function Button({ className, variant, size, type = "button", ...props }, ref) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		ref,
		type,
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
});
var grok_default$1 = "#!/usr/bin/env bash\n# Grok Stick — portable launcher. Lives on this drive. Installs nothing on the host.\nset -euo pipefail\n\ngrok_stick_root() {\n  local source=\"${BASH_SOURCE[0]}\"\n  while [ -L \"$source\" ]; do\n    local dir\n    dir=\"$(cd \"$(dirname \"$source\")\" && pwd)\"\n    source=\"$(readlink \"$source\")\"\n    case \"$source\" in\n      /*) ;;\n      *) source=\"$dir/$source\" ;;\n    esac\n  done\n  (cd \"$(dirname \"$source\")\" && pwd)\n}\n\nROOT=\"$(grok_stick_root)\"\nexport GROK_HOME=\"${GROK_HOME:-$ROOT/home}\"\nexport GROK_DISABLE_AUTOUPDATER=\"${GROK_DISABLE_AUTOUPDATER:-1}\"\nmkdir -p \"$GROK_HOME\" \"$ROOT/bin\"\n\nload_api_key() {\n  local file=\"$GROK_HOME/api-key\"\n  [ -f \"$file\" ] || return 0\n  local key\n  key=\"$(tr -d '\\r' < \"$file\" | sed '/^[[:space:]]*#/d;/^[[:space:]]*$/d' | head -n 1 | tr -d '[:space:]')\"\n  if [ -n \"$key\" ]; then\n    export XAI_API_KEY=\"$key\"\n  fi\n}\n\ndetect_platform() {\n  local os arch sys\n  sys=\"$(uname -s 2>/dev/null || echo unknown)\"\n  case \"$sys\" in\n    Darwin) os=\"macos\" ;;\n    Linux) os=\"linux\" ;;\n    MINGW*|MSYS*|CYGWIN*) os=\"windows\" ;;\n    *)\n      echo \"Grok Stick: unsupported OS '$sys'.\" >&2\n      echo \"Use macOS, Linux, or Windows (PowerShell / Git Bash).\" >&2\n      exit 1\n      ;;\n  esac\n  case \"$(uname -m)\" in\n    x86_64|amd64|AMD64) arch=\"x86_64\" ;;\n    arm64|aarch64|ARM64) arch=\"aarch64\" ;;\n    *)\n      echo \"Grok Stick: unsupported architecture '$(uname -m)'.\" >&2\n      exit 1\n      ;;\n  esac\n  if [ \"$os\" = \"macos\" ] && [ \"$arch\" = \"x86_64\" ]; then\n    local sysctl_bin\n    sysctl_bin=\"$(command -v sysctl || echo /usr/sbin/sysctl)\"\n    if [ \"$(\"$sysctl_bin\" -n hw.optional.arm64 2>/dev/null || true)\" = \"1\" ]; then\n      arch=\"aarch64\"\n    fi\n  fi\n  printf '%s-%s\\n' \"$os\" \"$arch\"\n}\n\nresolve_version() {\n  if [ -n \"${GROK_VERSION:-}\" ]; then\n    printf '%s\\n' \"$GROK_VERSION\"\n    return\n  fi\n  local url body\n  for url in \\\n    \"https://x.ai/cli/stable\" \\\n    \"https://storage.googleapis.com/grok-build-public-artifacts/cli/stable\"\n  do\n    if body=\"$(curl -fsSL --retry 3 --retry-delay 1 --connect-timeout 20 \"$url\" 2>/dev/null)\"; then\n      body=\"$(printf '%s' \"$body\" | tr -d '\\r' | head -n 1 | tr -d '[:space:]')\"\n      if printf '%s' \"$body\" | grep -Eq '^[0-9]+\\.[0-9]+\\.[0-9]+'; then\n        printf '%s\\n' \"$body\"\n        return\n      fi\n    fi\n  done\n  echo \"Grok Stick: could not reach x.ai to resolve the CLI version.\" >&2\n  echo \"Connect to the internet (one-time) or set GROK_VERSION.\" >&2\n  exit 1\n}\n\ndownload_to() {\n  local url=\"$1\" dest=\"$2\"\n  if command -v curl >/dev/null 2>&1; then\n    curl -fL --retry 3 --retry-delay 2 --connect-timeout 20 --progress-bar -o \"$dest\" \"$url\"\n  elif command -v wget >/dev/null 2>&1; then\n    wget --tries=3 -O \"$dest\" \"$url\"\n  else\n    echo \"Grok Stick: need curl or wget to download the CLI binary.\" >&2\n    exit 1\n  fi\n}\n\nfile_ok() {\n  local path=\"$1\"\n  [ -f \"$path\" ] && [ \"$(wc -c < \"$path\" | tr -d ' ')\" -gt 1000000 ]\n}\n\nfetch_binary() {\n  local platform=\"$1\"\n  local version=\"$2\"\n  local dest_dir=\"$ROOT/bin/$platform\"\n  local dest name url tmp\n  mkdir -p \"$dest_dir\"\n  case \"$platform\" in\n    windows-*)\n      dest=\"$dest_dir/grok.exe\"\n      name=\"grok-${version}-${platform}.exe\"\n      ;;\n    *)\n      dest=\"$dest_dir/grok\"\n      name=\"grok-${version}-${platform}\"\n      ;;\n  esac\n  if file_ok \"$dest\"; then\n    printf '%s\\n' \"$dest\"\n    return\n  fi\n  echo \"Grok Stick: fetching grok ${version} (${platform}) onto this drive...\" >&2\n  tmp=\"$dest.partial\"\n  rm -f \"$tmp\" \"$tmp.gz\"\n  case \"$platform\" in\n    windows-*) ;;\n    *)\n      for url in \\\n        \"https://x.ai/cli/${name}.gz\" \\\n        \"https://storage.googleapis.com/grok-build-public-artifacts/cli/${name}.gz\"\n      do\n        if download_to \"$url\" \"$tmp.gz\" && gzip -dc \"$tmp.gz\" > \"$tmp\" 2>/dev/null; then\n          rm -f \"$tmp.gz\"\n          mv \"$tmp\" \"$dest\"\n          chmod +x \"$dest\" 2>/dev/null || true\n          printf '%s\\n' \"$dest\"\n          return\n        fi\n        rm -f \"$tmp.gz\" \"$tmp\"\n      done\n      ;;\n  esac\n  for url in \\\n    \"https://x.ai/cli/${name}\" \\\n    \"https://storage.googleapis.com/grok-build-public-artifacts/cli/${name}\"\n  do\n    if download_to \"$url\" \"$tmp\"; then\n      mv \"$tmp\" \"$dest\"\n      chmod +x \"$dest\" 2>/dev/null || true\n      printf '%s\\n' \"$dest\"\n      return\n    fi\n    rm -f \"$tmp\"\n  done\n  echo \"Grok Stick: download failed for ${platform}.\" >&2\n  exit 1\n}\n\nexisting_binary() {\n  local platform=\"$1\"\n  local unix=\"$ROOT/bin/$platform/grok\"\n  local win=\"$ROOT/bin/$platform/grok.exe\"\n  if file_ok \"$unix\"; then\n    printf '%s\\n' \"$unix\"\n    return 0\n  fi\n  if file_ok \"$win\"; then\n    printf '%s\\n' \"$win\"\n    return 0\n  fi\n  return 1\n}\n\nload_api_key\n\nif [ \"${GROK_STICK_FETCH_ALL:-}\" = \"1\" ]; then\n  VERSION=\"$(resolve_version)\"\n  echo \"Grok Stick: fetching grok ${VERSION} for every platform...\" >&2\n  for p in linux-x86_64 linux-aarch64 macos-aarch64 macos-x86_64 windows-x86_64 windows-aarch64; do\n    fetch_binary \"$p\" \"$VERSION\" >/dev/null\n    echo \"  ready  $p\" >&2\n  done\n  echo \"All platform binaries are on this drive. You can unplug and use it offline-to-install.\" >&2\n  exit 0\nfi\n\nPLATFORM=\"$(detect_platform)\"\nif ! BIN=\"$(existing_binary \"$PLATFORM\")\"; then\n  VERSION=\"$(resolve_version)\"\n  BIN=\"$(fetch_binary \"$PLATFORM\" \"$VERSION\")\"\nfi\n\nchmod +x \"$BIN\" 2>/dev/null || true\nif [ \"$(uname -s 2>/dev/null || true)\" = \"Darwin\" ]; then\n  xattr -d com.apple.quarantine \"$BIN\" 2>/dev/null || true\nfi\n\nexec \"$BIN\" \"$@\"\n";
var grok_default = "@echo off\nsetlocal EnableExtensions EnableDelayedExpansion\nrem Grok Stick — Windows launcher. Installs nothing. Config stays on this drive.\n\nset \"ROOT=%~dp0\"\nif \"%ROOT:~-1%\"==\"\\\" set \"ROOT=%ROOT:~0,-1%\"\nif not defined GROK_HOME set \"GROK_HOME=%ROOT%\\home\"\nset \"GROK_DISABLE_AUTOUPDATER=1\"\nif not exist \"%GROK_HOME%\" mkdir \"%GROK_HOME%\"\nif not exist \"%ROOT%\\bin\" mkdir \"%ROOT%\\bin\"\n\nif exist \"%GROK_HOME%\\api-key\" (\n  for /f \"usebackq tokens=* eol=#\" %%A in (\"%GROK_HOME%\\api-key\") do (\n    set \"LINE=%%A\"\n    if not \"!LINE!\"==\"\" (\n      set \"XAI_API_KEY=!LINE!\"\n      goto :keydone\n    )\n  )\n)\n:keydone\n\nset \"ARCH=%PROCESSOR_ARCHITECTURE%\"\nif defined PROCESSOR_ARCHITEW6432 set \"ARCH=%PROCESSOR_ARCHITEW6432%\"\nif /I \"%ARCH%\"==\"ARM64\" (\n  set \"PLAT=windows-aarch64\"\n) else (\n  set \"PLAT=windows-x86_64\"\n)\n\nset \"BIN=%ROOT%\\bin\\%PLAT%\\grok.exe\"\nif not exist \"%BIN%\" (\n  echo Grok Stick: fetching the Windows CLI onto this drive...\n  powershell -NoProfile -ExecutionPolicy Bypass -File \"%ROOT%\\lib\\fetch.ps1\" -Platform \"%PLAT%\"\n  if errorlevel 1 (\n    echo Grok Stick: download failed.\n    exit /b 1\n  )\n)\n\nif not exist \"%BIN%\" (\n  echo Grok Stick: grok.exe is missing after fetch. See README.txt\n  exit /b 1\n)\n\n\"%BIN%\" %*\nexit /b %ERRORLEVEL%\n";
var fetch_default = "#Requires -Version 5.1\n# Grok Stick — download the official CLI binary onto this drive.\n[CmdletBinding()]\nparam(\n  [string]$Platform,\n  [switch]$All\n)\n\n$ErrorActionPreference = 'Stop'\n[Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor [Net.SecurityProtocolType]::Tls12\nAdd-Type -AssemblyName System.IO.Compression\n\n$Root = Split-Path -Parent (Split-Path -Parent $PSCommandPath)\nif (-not $env:GROK_HOME) { $env:GROK_HOME = Join-Path $Root 'home' }\n$env:GROK_DISABLE_AUTOUPDATER = '1'\n\nfunction Get-GrokVersion {\n  if ($env:GROK_VERSION) { return $env:GROK_VERSION.Trim() }\n  $urls = @(\n    'https://x.ai/cli/stable',\n    'https://storage.googleapis.com/grok-build-public-artifacts/cli/stable'\n  )\n  foreach ($url in $urls) {\n    try {\n      $v = (Invoke-WebRequest -UseBasicParsing -Uri $url -TimeoutSec 30).Content.Trim()\n      if ($v -match '^\\d+\\.\\d+\\.\\d+') { return $v }\n    } catch { }\n  }\n  throw 'Grok Stick: could not reach x.ai to resolve the CLI version.'\n}\n\nfunction Get-NativePlatform {\n  $arch = $env:PROCESSOR_ARCHITECTURE\n  if ($env:PROCESSOR_ARCHITEW6432) { $arch = $env:PROCESSOR_ARCHITEW6432 }\n  switch ($arch) {\n    'ARM64' { return 'windows-aarch64' }\n    default { return 'windows-x86_64' }\n  }\n}\n\nfunction Test-Binary([string]$Path) {\n  return (Test-Path $Path) -and ((Get-Item $Path).Length -gt 1MB)\n}\n\nfunction Save-Url([string]$Url, [string]$Dest) {\n  $curl = Get-Command curl.exe -ErrorAction SilentlyContinue\n  if ($curl) {\n    & curl.exe -fL --retry 3 --retry-delay 2 --progress-bar -o $Dest $Url\n    if ($LASTEXITCODE -ne 0) { throw \"curl failed: $Url\" }\n    return\n  }\n  Invoke-WebRequest -UseBasicParsing -Uri $Url -OutFile $Dest -TimeoutSec 600\n}\n\nfunction Install-GrokBinary([string]$Plat) {\n  $destDir = Join-Path $Root \"bin\\$Plat\"\n  New-Item -ItemType Directory -Force -Path $destDir | Out-Null\n  $isWindows = $Plat -like 'windows-*'\n  $dest = if ($isWindows) { Join-Path $destDir 'grok.exe' } else { Join-Path $destDir 'grok' }\n  if (Test-Binary $dest) { return $dest }\n\n  $version = Get-GrokVersion\n  $name = if ($isWindows) { \"grok-$version-$Plat.exe\" } else { \"grok-$version-$Plat\" }\n  Write-Host \"Grok Stick: fetching grok $version ($Plat) onto this drive...\"\n  $tmp = \"$dest.partial\"\n  $urls = @(\n    \"https://x.ai/cli/$name\",\n    \"https://storage.googleapis.com/grok-build-public-artifacts/cli/$name\"\n  )\n  if (-not $isWindows) {\n    $urls = @(\n      \"https://x.ai/cli/$name.gz\",\n      \"https://storage.googleapis.com/grok-build-public-artifacts/cli/$name.gz\"\n    ) + $urls\n  }\n  $ok = $false\n  foreach ($url in $urls) {\n    try {\n      if (Test-Path $tmp) { Remove-Item $tmp -Force }\n      Save-Url $url $tmp\n      if ($url.EndsWith('.gz')) {\n        $out = $dest\n        $gz = \"$tmp.gz\"\n        Move-Item -Force $tmp $gz\n        $in = [System.IO.File]::OpenRead($gz)\n        try {\n          $gzip = New-Object System.IO.Compression.GzipStream($in, [System.IO.Compression.CompressionMode]::Decompress)\n          $file = [System.IO.File]::Create($tmp)\n          try { $gzip.CopyTo($file) } finally { $file.Dispose(); $gzip.Dispose() }\n        } finally { $in.Dispose() }\n        Remove-Item $gz -Force -ErrorAction SilentlyContinue\n      }\n      if ((Get-Item $tmp).Length -gt 1MB) {\n        Move-Item -Force $tmp $dest\n        $ok = $true\n        break\n      }\n    } catch {\n      if (Test-Path $tmp) { Remove-Item $tmp -Force -ErrorAction SilentlyContinue }\n    }\n  }\n  if (-not $ok) { throw \"Grok Stick: download failed for $Plat\" }\n  return $dest\n}\n\n$targets = @()\nif ($All) {\n  $targets = @(\n    'linux-x86_64', 'linux-aarch64',\n    'macos-aarch64', 'macos-x86_64',\n    'windows-x86_64', 'windows-aarch64'\n  )\n} elseif ($Platform) {\n  $targets = @($Platform)\n} else {\n  $targets = @(Get-NativePlatform)\n}\n\nforeach ($t in $targets) {\n  $null = Install-GrokBinary $t\n  Write-Host \"  ready  $t\"\n}\n";
var fetch_all_default$1 = "#!/usr/bin/env bash\n# Preload every official Grok CLI binary onto this drive (macOS, Linux, Windows).\nset -euo pipefail\nDIR=\"$(cd \"$(dirname \"$0\")\" && pwd)\"\nexport GROK_STICK_FETCH_ALL=1\nexec \"$DIR/grok\"\n";
var fetch_all_default = "@echo off\nsetlocal\nset \"ROOT=%~dp0\"\nif \"%ROOT:~-1%\"==\"\\\" set \"ROOT=%ROOT:~0,-1%\"\necho Grok Stick: fetching every platform binary onto this drive...\npowershell -NoProfile -ExecutionPolicy Bypass -File \"%ROOT%\\lib\\fetch.ps1\" -All\nif errorlevel 1 exit /b 1\necho Done. This stick now has binaries for Windows, macOS, and Linux.\n";
var env_default$2 = "# Source this from a terminal to put Grok Stick on PATH for this session only.\n#   source /path/to/GrokStick/env.sh\n# Nothing is written to ~/.bashrc or the registry.\n\n_src=\"${BASH_SOURCE[0]:-$0}\"\n_grok_stick_dir=\"$(CDPATH= cd -- \"$(dirname -- \"$_src\")\" && pwd)\"\nexport GROK_HOME=\"${GROK_HOME:-$_grok_stick_dir/home}\"\nexport GROK_DISABLE_AUTOUPDATER=\"${GROK_DISABLE_AUTOUPDATER:-1}\"\nmkdir -p \"$GROK_HOME\" 2>/dev/null || true\n\nif [ -f \"$GROK_HOME/api-key\" ]; then\n  _key=\"$(tr -d '\\r' < \"$GROK_HOME/api-key\" | sed '/^[[:space:]]*#/d;/^[[:space:]]*$/d' | head -n 1 | tr -d '[:space:]')\"\n  if [ -n \"$_key\" ]; then\n    export XAI_API_KEY=\"$_key\"\n  fi\n  unset _key\nfi\n\ncase \":$PATH:\" in\n  *\":$_grok_stick_dir:\"*) ;;\n  *) export PATH=\"$_grok_stick_dir:$PATH\" ;;\nesac\n\nunset _src _grok_stick_dir\necho \"Grok Stick is on PATH for this terminal. cd into a project and run: grok\"\n";
var env_default$1 = "# Dot-source this in PowerShell to put Grok Stick on PATH for this session only.\n#   . E:\\GrokStick\\env.ps1\n# Nothing is written to User PATH or the registry.\n\n$Root = $PSScriptRoot\nif (-not $env:GROK_HOME) { $env:GROK_HOME = Join-Path $Root 'home' }\n$env:GROK_DISABLE_AUTOUPDATER = '1'\nNew-Item -ItemType Directory -Force -Path $env:GROK_HOME | Out-Null\n\n$keyFile = Join-Path $env:GROK_HOME 'api-key'\nif (Test-Path $keyFile) {\n  $key = Get-Content $keyFile |\n    Where-Object { $_ -and ($_ -notmatch '^\\s*#') } |\n    Select-Object -First 1\n  if ($key) { $env:XAI_API_KEY = $key.Trim() }\n}\n\nif (-not ($env:Path -split ';' | Where-Object { $_ -eq $Root })) {\n  $env:Path = \"$Root;$env:Path\"\n}\n\nWrite-Host \"Grok Stick is on PATH for this terminal. cd into a project and run: grok\"\n";
var env_default = "@echo off\nrem Run this to put Grok Stick on PATH for this Command Prompt only.\nset \"ROOT=%~dp0\"\nif \"%ROOT:~-1%\"==\"\\\" set \"ROOT=%ROOT:~0,-1%\"\nif not defined GROK_HOME set \"GROK_HOME=%ROOT%\\home\"\nset \"GROK_DISABLE_AUTOUPDATER=1\"\nset \"PATH=%ROOT%;%PATH%\"\necho Grok Stick is on PATH for this terminal. cd into a project and run: grok\n";
var config_default = "# Grok Stick — this file lives on the flash drive (GROK_HOME).\n# The launcher disables host installs and auto-updates.\n\n[cli]\nauto_update = false\n";
var api_key_default = "# Optional. Rename this file to \"api-key\" (no extension) and paste your key\n# on its own line below. Get a key at https://console.x.ai\n#\n# If you skip this, Grok opens a browser to sign in. The session is stored\n# on this drive as home/auth.json — it travels with the stick.\n#\n# xai-your-key-here\n";
var README_default$1 = "GROK STICK\n==========\n\nA self-contained Grok CLI you keep on a USB flash drive. It does not install\ninto Program Files, /usr/local, or your user profile. Config, login, and\nsession history stay in the home\\ folder on this drive.\n\nWHAT YOU NEED\n-------------\n- A USB stick formatted as exFAT (works on Windows, macOS, and Linux)\n- About 200 MB free for one computer, or ~800 MB if you preload every OS\n- An internet connection the first time each OS/architecture runs\n  (the CLI itself always needs internet to talk to xAI)\n\nQUICK START\n-----------\n1. Copy the whole GrokStick folder onto the USB drive.\n\n2. Open a terminal in the project you want to work on.\n\n3. Run the launcher from the stick:\n\n   Windows:   E:\\GrokStick\\grok.cmd\n   macOS:     /Volumes/USB/GrokStick/grok\n   Linux:     /media/$USER/USB/GrokStick/grok\n\n   First run downloads the official binary for THIS computer onto the stick\n   (about 40–140 MB). After that, the same computer — and any other machine\n   of the same OS and CPU — starts instantly.\n\n4. Optional, so you can just type \"grok\":\n\n   Windows PowerShell:  . E:\\GrokStick\\env.ps1\n   Windows CMD:         E:\\GrokStick\\env.cmd\n   macOS / Linux:       source /Volumes/USB/GrokStick/env.sh\n\n   That only lasts for the current terminal. Nothing is added to your PATH\n   permanently.\n\nPRELOAD EVERY MACHINE TYPE\n--------------------------\nIf you want the stick ready for Windows, Mac, and Linux before you leave\nhome, run this once while online:\n\n   Windows:   fetch-all.cmd\n   macOS/Linux: ./fetch-all.sh\n\nSIGN IN\n-------\nOn first launch Grok opens a browser. The login file is saved as\nhome\\auth.json on the stick, so the next machine can reuse it until the\ntoken expires (about 7 days).\n\nTo skip the browser, paste an API key from https://console.x.ai into a file\nnamed home\\api-key (see api-key.example).\n\nWHAT STAYS ON THE STICK\n-----------------------\n  grok / grok.cmd     launchers\n  bin\\<platform>\\     official Grok CLI binary for that OS\n  home\\config.toml    settings\n  home\\auth.json      login (created after you sign in)\n  home\\sessions\\      chat / coding sessions\n  home\\memory\\        cross-session memory\n\nNothing is written to C:\\Users\\...\\.grok or ~/.grok unless you run the\nofficial installer separately.\n\nUPDATE\n------\nDelete the bin folder (or one platform folder inside it) and run grok again.\nOr rerun fetch-all. The launcher never auto-updates the host.\n\nUSB TIPS\n--------\n- Format as exFAT, not NTFS (Mac) and not APFS (Windows).\n- Eject before unplugging.\n- If macOS blocks the binary: System Settings → Privacy & Security → Open Anyway.\n  The launcher also clears the quarantine flag when it can.\n- If a Windows SmartScreen prompt appears, choose Run anyway — these are the\n  official binaries from x.ai/cli.\n- Do not store the stick where others can copy home\\auth.json or home\\api-key.\n  That is your Grok login.\n\nThis kit launches the official Grok CLI published at https://x.ai/cli.\nIt is a portable wrapper, not a modified build of Grok.\n";
var Start_Grok_default = "#!/bin/bash\n# Double-click on macOS to open Grok Stick in Terminal.\ncd \"$(dirname \"$0\")\" || exit 1\nchmod +x ./grok ./fetch-all.sh ./env.sh 2>/dev/null || true\necho \"Grok Stick\"\necho \"cd into a project in another tab, then run this path:\"\necho \"  $(pwd)/grok\"\necho\n./grok\n";
var README_default = "Official Grok CLI binaries land here on first run, one folder per platform:\n\n  linux-x86_64/grok\n  linux-aarch64/grok\n  macos-aarch64/grok\n  macos-x86_64/grok\n  windows-x86_64/grok.exe\n  windows-aarch64/grok.exe\n\nRun fetch-all to preload every platform while you have a fast connection.\n";
var KIT_FOLDER = "GrokStick";
var KIT_ZIP_NAME = "GrokStick.zip";
function unix(path, content, executable = false) {
	return {
		path,
		content: content.replace(/\r\n/g, "\n"),
		executable
	};
}
function win(path, content) {
	return {
		path,
		content: content.replace(/\r\n/g, "\n").replace(/\n/g, "\r\n"),
		crlf: true
	};
}
var KIT_FILES = [
	unix("README.txt", README_default$1),
	unix("grok", grok_default$1, true),
	unix("fetch-all.sh", fetch_all_default$1, true),
	unix("env.sh", env_default$2, true),
	unix("Start Grok.command", Start_Grok_default, true),
	win("grok.cmd", grok_default),
	win("fetch-all.cmd", fetch_all_default),
	win("env.cmd", env_default),
	win("env.ps1", env_default$1),
	win("lib/fetch.ps1", fetch_default),
	unix("home/config.toml", config_default),
	unix("home/api-key.example", api_key_default),
	unix("bin/README.txt", README_default)
];
var TREE_ROWS = [
	{
		name: "grok",
		hint: "macOS / Linux launcher",
		kind: "file"
	},
	{
		name: "grok.cmd",
		hint: "Windows launcher",
		kind: "file"
	},
	{
		name: "fetch-all.sh / .cmd",
		hint: "preload every OS",
		kind: "file"
	},
	{
		name: "env.sh / .ps1 / .cmd",
		hint: "session PATH only",
		kind: "file"
	},
	{
		name: "bin/",
		hint: "official binaries land here",
		kind: "dir"
	},
	{
		name: "home/",
		hint: "login, settings, sessions",
		kind: "dir"
	},
	{
		name: "README.txt",
		hint: "keep this next to the launchers",
		kind: "file"
	}
];
var PLATFORMS = [
	{
		id: "windows-x86_64",
		os: "Windows",
		cpu: "x64",
		size: "~134 MB"
	},
	{
		id: "windows-aarch64",
		os: "Windows",
		cpu: "ARM64",
		size: "~116 MB"
	},
	{
		id: "macos-aarch64",
		os: "macOS",
		cpu: "Apple silicon",
		size: "~127 MB"
	},
	{
		id: "macos-x86_64",
		os: "macOS",
		cpu: "Intel",
		size: "~143 MB"
	},
	{
		id: "linux-x86_64",
		os: "Linux",
		cpu: "x64",
		size: "~158 MB"
	},
	{
		id: "linux-aarch64",
		os: "Linux",
		cpu: "ARM64",
		size: "~129 MB"
	}
];
async function buildKitBlob() {
	const { default: JSZip } = await import("../_libs/jszip+[...].mjs").then((n) => /* @__PURE__ */ __toESM(n.t()));
	const zip = new JSZip();
	const root = zip.folder(KIT_FOLDER);
	if (!root) throw new Error("Could not create kit folder");
	for (const file of KIT_FILES) {
		const opts = {};
		if (file.executable) opts.unixPermissions = 33261;
		else opts.unixPermissions = 33188;
		root.file(file.path, file.content, opts);
	}
	return zip.generateAsync({
		type: "blob",
		mimeType: "application/zip",
		platform: "UNIX",
		compression: "DEFLATE",
		compressionOptions: { level: 6 }
	});
}
async function triggerKitDownload() {
	const blob = await buildKitBlob();
	const url = URL.createObjectURL(blob);
	const anchor = document.createElement("a");
	anchor.href = url;
	anchor.download = KIT_ZIP_NAME;
	anchor.rel = "noopener";
	anchor.style.display = "none";
	document.body.appendChild(anchor);
	anchor.click();
	window.setTimeout(() => {
		anchor.remove();
		URL.revokeObjectURL(url);
	}, 4e3);
}
function DownloadKit({ size = "lg" }) {
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function onDownload() {
		if (busy) return;
		setBusy(true);
		try {
			await triggerKitDownload();
			toast.success(`${KIT_ZIP_NAME} is ready — unzip it onto a USB drive.`);
		} catch (err) {
			const message = err instanceof Error ? err.message : "Download failed";
			toast.error(message);
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		size,
		onClick: onDownload,
		disabled: busy,
		className: "min-h-12 w-full sm:w-auto",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
			className: "size-4",
			strokeWidth: 1.75
		}), busy ? "Building kit…" : "Download Grok Stick"]
	});
}
function KitPreview() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-surface p-4 sm:p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-4 font-mono text-xs tracking-wide text-subtle uppercase",
			children: "GrokStick/"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-2.5",
			children: TREE_ROWS.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-start gap-3",
				children: [row.kind === "dir" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Folder, {
					className: "mt-0.5 size-4 shrink-0 text-muted",
					strokeWidth: 1.5
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(File, {
					className: "mt-0.5 size-4 shrink-0 text-muted",
					strokeWidth: 1.5
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-sm text-fg",
						children: row.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: row.hint
					})]
				})]
			}, row.name))
		})]
	});
}
var LINES = [
	{
		delay: 400,
		text: "$ /Volumes/USB/GrokStick/grok",
		tone: "cmd"
	},
	{
		delay: 1600,
		text: "Grok Stick: fetching grok 1.0.13 (macos-aarch64) onto this drive...",
		tone: "muted"
	},
	{
		delay: 3200,
		text: "Ready. Nothing installed on this Mac.",
		tone: "ok"
	},
	{
		delay: 4e3,
		text: "grok · portable · home=/Volumes/USB/GrokStick/home",
		tone: "fg"
	}
];
function TerminalDemo() {
	const [shown, setShown] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const timers = LINES.map((line, i) => window.setTimeout(() => setShown(i + 1), line.delay));
		return () => timers.forEach(clearTimeout);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "overflow-hidden rounded-xl border border-border bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 border-b border-border px-4 py-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2.5 rounded-full bg-raised" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2.5 rounded-full bg-raised" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2.5 rounded-full bg-raised" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-2 font-mono text-xs text-subtle",
					children: "first run · this computer"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-h-44 space-y-2 px-4 py-4 font-mono text-sm leading-relaxed",
			children: [LINES.slice(0, shown).map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: line.tone === "cmd" ? "text-fg" : line.tone === "ok" ? "text-ok" : line.tone === "muted" ? "text-muted" : "text-fg",
				children: line.text
			}, line.text)), shown < LINES.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block h-4 w-2 bg-accent align-middle" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "gs-caret inline-block h-4 w-2 bg-accent align-middle" })]
		})]
	});
}
function UsbStick({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 420 220",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		className,
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id: "gs-body",
					x1: "80",
					y1: "20",
					x2: "400",
					y2: "200",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0%",
							stopColor: "var(--color-fg)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "45%",
							stopColor: "var(--color-accent)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "100%",
							stopColor: "var(--color-muted)"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id: "gs-edge",
					x1: "70",
					y1: "40",
					x2: "70",
					y2: "180",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: "var(--color-fg)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "100%",
						stopColor: "var(--color-muted)"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id: "gs-plug",
					x1: "0",
					y1: "70",
					x2: "90",
					y2: "150",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: "var(--color-accent)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "100%",
						stopColor: "var(--color-subtle)"
					})]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "18",
				y: "78",
				width: "72",
				height: "64",
				rx: "4",
				fill: "url(#gs-plug)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "8",
				y: "86",
				width: "18",
				height: "48",
				rx: "2",
				fill: "var(--color-subtle)"
			}),
			[
				0,
				1,
				2,
				3
			].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: 28,
				y: 90 + i * 10,
				width: "52",
				height: "5",
				rx: "1",
				fill: "var(--color-bg)",
				opacity: "0.7"
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "84",
				y: "48",
				width: "312",
				height: "124",
				rx: "18",
				fill: "url(#gs-body)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "90",
				y: "54",
				width: "300",
				height: "112",
				rx: "14",
				fill: "url(#gs-edge)",
				opacity: "0.18"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "132",
				y: "72",
				width: "232",
				height: "76",
				rx: "10",
				fill: "var(--color-bg)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "248",
				y: "118",
				textAnchor: "middle",
				fill: "var(--color-fg)",
				fontFamily: "Georgia, 'Times New Roman', serif",
				fontSize: "28",
				fontStyle: "italic",
				letterSpacing: "4",
				children: "GROK STICK"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "368",
				y: "96",
				width: "10",
				height: "28",
				rx: "2",
				fill: "var(--color-bg)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "370",
				y: "106",
				width: "6",
				height: "8",
				rx: "1",
				className: "gs-led",
				fill: "var(--color-led)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "372",
				cy: "70",
				r: "7",
				fill: "none",
				stroke: "var(--color-subtle)",
				strokeWidth: "3"
			})
		]
	});
}
var STEPS = [
	{
		n: "01",
		title: "Unzip onto a stick",
		body: "Format the drive as exFAT so Windows, Mac, and Linux can all read it. Drop the GrokStick folder on the root."
	},
	{
		n: "02",
		title: "Run the launcher",
		body: "From any project folder, call grok.cmd (Windows) or grok (macOS/Linux) on the stick. First run fetches that computer’s binary onto the drive."
	},
	{
		n: "03",
		title: "Unplug. Repeat.",
		body: "Login, settings, and sessions live in home/ on the stick. The host is left untouched — no PATH edits, no ~/.grok."
	}
];
var COMMANDS = [
	{
		label: "Windows",
		lines: ["cd C:\\Users\\you\\project", "E:\\GrokStick\\grok.cmd"]
	},
	{
		label: "macOS",
		lines: ["cd ~/project", "/Volumes/USB/GrokStick/grok"]
	},
	{
		label: "Linux",
		lines: ["cd ~/project", "/media/$USER/USB/GrokStick/grok"]
	}
];
var FAQS = [
	{
		q: "Does this install Grok on the computer?",
		a: "No. The launcher sets GROK_HOME to the stick’s home folder and GROK_DISABLE_AUTOUPDATER so the official CLI never writes into your user profile. Session PATH helpers (env.sh / env.ps1) last only for that terminal."
	},
	{
		q: "Does it work without internet?",
		a: "After the binary is on the stick, you don’t need the official installer or npm. Grok still needs internet to talk to xAI — this is a portable install, not an offline model."
	},
	{
		q: "How do I sign in?",
		a: "First launch opens a browser. The session is saved as home/auth.json on the stick and travels with you until it expires (about 7 days). Or paste an API key from console.x.ai into home/api-key."
	},
	{
		q: "Can I preload every operating system?",
		a: "Yes. Run fetch-all.cmd (Windows) or ./fetch-all.sh (macOS/Linux) once on a fast connection. That puts Windows, Mac, and Linux binaries on the drive so the next machine skips the download."
	},
	{
		q: "What if macOS or Windows blocks it?",
		a: "These are the official binaries from x.ai/cli, unsigned as a portable copy. On Mac: Privacy & Security → Open Anyway. On Windows: SmartScreen → Run anyway. The Unix launcher also clears the quarantine flag when it can."
	},
	{
		q: "What if I lose the stick?",
		a: "Treat it like a lost password manager. home/auth.json and home/api-key are your Grok login. Sign out from grok.com if you used browser login, and rotate the API key."
	}
];
function Home() {
	const { version } = Route.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative min-h-screen overflow-x-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute inset-x-0 top-0 h-96 gs-wash"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "relative mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Usb, {
						className: "size-4 text-accent",
						strokeWidth: 1.75
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-medium tracking-wide",
						children: "Grok Stick"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-mono text-xs text-subtle",
					children: ["CLI ", version]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative mx-auto grid max-w-6xl items-center gap-10 px-5 pt-6 pb-16 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:pt-10 lg:pb-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "gs-stagger",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-5 font-mono text-xs tracking-[0.18em] text-muted uppercase",
							children: "Portable Grok CLI"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "font-display text-3xl leading-tight tracking-tight text-fg",
							children: ["Keep Grok on a flash drive.", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-2 block italic text-muted",
								children: "Leave nothing installed."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 max-w-md text-base text-muted",
							children: "A tiny kit that launches the official Grok CLI from USB. The binary, your login, and your sessions stay on the stick — so the next machine is just plug in and run."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-col gap-4 sm:flex-row sm:items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DownloadKit, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-subtle",
								children: "~20 KB zip. The CLI binary downloads onto the stick on first run."
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-surface px-4 py-8 sm:px-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsbStick, { className: "mx-auto w-full max-w-md" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex items-center justify-between gap-4 border-t border-border pt-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-xs text-subtle uppercase",
								children: "On the stick"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-fg",
								children: "Launcher + home + bin"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-xs text-subtle uppercase",
									children: "Host"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-fg",
									children: "Untouched"
								})]
							})]
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-t border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto grid max-w-6xl gap-px bg-border sm:grid-cols-3",
					children: STEPS.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "bg-bg px-5 py-8 sm:px-8 sm:py-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-xs text-subtle",
								children: step.n
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-3 font-display text-xl italic tracking-tight",
								children: step.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 max-w-sm text-sm leading-relaxed text-muted",
								children: step.body
							})
						]
					}, step.n))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-12 lg:py-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl tracking-tight italic",
						children: "What’s in the kit"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-md text-sm text-muted",
						children: "Launchers for every desktop OS, a home folder Grok will actually use, and empty bin slots that fill themselves the first time you run."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KitPreview, {})
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl tracking-tight italic",
						children: "First plug-in"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-md text-sm text-muted",
						children: "Same stick, new computer: if that OS is already in bin/, it starts immediately. Otherwise it fetches once, onto the drive."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TerminalDemo, {})
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RunFromProject, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-t border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl tracking-tight italic",
						children: "How it stays portable"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10 grid gap-4 md:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
								icon: HardDrive,
								title: "GROK_HOME on the stick",
								body: "Config, auth.json, sessions, and memory write under GrokStick/home — not ~/.grok on the host."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
								icon: ShieldOff,
								title: "No host installer",
								body: "Auto-update is off. PATH helpers are session-only. Unplug and the computer is as you found it."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
								icon: KeyRound,
								title: "Login travels with you",
								body: "Browser sign-in is stored on the drive. Optional API key file if you would rather skip the browser."
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-t border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-end justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl tracking-tight italic",
								children: "Platforms"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: "Official binaries from x.ai/cli"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 overflow-hidden rounded-xl border border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full text-left text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
									className: "border-b border-border bg-surface text-xs tracking-wide text-subtle uppercase",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-4 py-3 font-medium sm:px-5",
											children: "System"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-4 py-3 font-medium sm:px-5",
											children: "CPU"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-4 py-3 font-medium sm:px-5",
											children: "On-stick size"
										})
									] })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: PLATFORMS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-b border-border last:border-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3.5 sm:px-5",
											children: p.os
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3.5 text-muted sm:px-5",
											children: p.cpu
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3.5 font-mono text-muted sm:px-5",
											children: p.size
										})
									]
								}, p.id)) })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-2xl text-sm text-muted",
							children: "First run stores only the current computer’s binary. Preload all six with fetch-all if you want the stick ready for whatever you plug into next."
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-t border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl tracking-tight italic",
						children: "Questions"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 divide-y divide-border border-y border-border",
						children: FAQS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
							className: "group py-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
								className: "flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium marker:content-none [&::-webkit-details-marker]:hidden",
								children: [item.q, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-subtle transition-transform duration-200 ease-out group-open:rotate-45",
									children: "+"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 max-w-2xl text-sm leading-relaxed text-muted",
								children: item.a
							})]
						}, item.q))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-t border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl flex-col items-start gap-6 px-5 py-16 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:py-20",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl tracking-tight italic",
						children: "Copy it onto a stick and go."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-md text-sm text-muted",
						children: "Uses the official Grok CLI from x.ai. This kit is a portable wrapper — it does not modify the binary."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DownloadKit, { size: "md" })]
				})
			})
		]
	});
}
function Fact({ icon: Icon, title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-xl border border-border bg-surface p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				className: "size-4 text-accent",
				strokeWidth: 1.75
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-4 text-base font-medium",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-relaxed text-muted",
				children: body
			})
		]
	});
}
function RunFromProject() {
	const [os, setOs] = (0, import_react.useState)("Windows");
	const [copied, setCopied] = (0, import_react.useState)(false);
	const active = COMMANDS.find((c) => c.label === os) ?? COMMANDS[0];
	const block = active.lines.join("\n");
	async function copy() {
		try {
			await navigator.clipboard.writeText(block);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 1600);
		} catch {}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-t border-border bg-surface",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-end justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl tracking-tight italic",
						children: "Run it from a project"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-lg text-sm text-muted",
						children: "The working directory is whatever folder you are in — the stick only supplies the binary and GROK_HOME."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex rounded-md border border-border bg-bg p-1",
						children: COMMANDS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setOs(c.label),
							className: cn("h-11 min-w-20 rounded-sm px-3 text-sm transition-colors duration-150", os === c.label ? "bg-raised text-fg" : "text-muted hover:text-fg"),
							children: c.label
						}, c.label))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mt-8 overflow-hidden rounded-xl border border-border bg-bg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: copy,
						className: "absolute top-3 right-3 inline-flex h-11 items-center gap-2 rounded-md border border-border bg-surface px-3 text-xs text-muted hover:text-fg",
						children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
							className: "size-3.5 text-ok",
							strokeWidth: 2
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
							className: "size-3.5",
							strokeWidth: 1.75
						}), copied ? "Copied" : "Copy"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "overflow-x-auto px-5 py-6 pr-28 font-mono text-sm leading-7 text-fg",
						children: active.lines.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-subtle",
								children: "$ "
							}), line]
						}, line))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 flex items-center gap-2 text-sm text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
						className: "size-3.5",
						strokeWidth: 1.75
					}), "Optional: source env.sh or env.ps1 so this terminal can just type grok."]
				})
			]
		})
	});
}
//#endregion
export { Home as component };
