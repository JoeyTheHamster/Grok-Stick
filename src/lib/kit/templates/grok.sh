#!/usr/bin/env bash
# Grok Stick — portable launcher. Lives on this drive. Installs nothing on the host.
set -euo pipefail

grok_stick_root() {
  local source="${BASH_SOURCE[0]}"
  while [ -L "$source" ]; do
    local dir
    dir="$(cd "$(dirname "$source")" && pwd)"
    source="$(readlink "$source")"
    case "$source" in
      /*) ;;
      *) source="$dir/$source" ;;
    esac
  done
  (cd "$(dirname "$source")" && pwd)
}

ROOT="$(grok_stick_root)"
export GROK_HOME="${GROK_HOME:-$ROOT/home}"
export GROK_DISABLE_AUTOUPDATER="${GROK_DISABLE_AUTOUPDATER:-1}"
mkdir -p "$GROK_HOME" "$ROOT/bin"

load_api_key() {
  local file="$GROK_HOME/api-key"
  [ -f "$file" ] || return 0
  local key
  key="$(tr -d '\r' < "$file" | sed '/^[[:space:]]*#/d;/^[[:space:]]*$/d' | head -n 1 | tr -d '[:space:]')"
  if [ -n "$key" ]; then
    export XAI_API_KEY="$key"
  fi
}

detect_platform() {
  local os arch sys
  sys="$(uname -s 2>/dev/null || echo unknown)"
  case "$sys" in
    Darwin) os="macos" ;;
    Linux) os="linux" ;;
    MINGW*|MSYS*|CYGWIN*) os="windows" ;;
    *)
      echo "Grok Stick: unsupported OS '$sys'." >&2
      echo "Use macOS, Linux, or Windows (PowerShell / Git Bash)." >&2
      exit 1
      ;;
  esac
  case "$(uname -m)" in
    x86_64|amd64|AMD64) arch="x86_64" ;;
    arm64|aarch64|ARM64) arch="aarch64" ;;
    *)
      echo "Grok Stick: unsupported architecture '$(uname -m)'." >&2
      exit 1
      ;;
  esac
  if [ "$os" = "macos" ] && [ "$arch" = "x86_64" ]; then
    local sysctl_bin
    sysctl_bin="$(command -v sysctl || echo /usr/sbin/sysctl)"
    if [ "$("$sysctl_bin" -n hw.optional.arm64 2>/dev/null || true)" = "1" ]; then
      arch="aarch64"
    fi
  fi
  printf '%s-%s\n' "$os" "$arch"
}

resolve_version() {
  if [ -n "${GROK_VERSION:-}" ]; then
    printf '%s\n' "$GROK_VERSION"
    return
  fi
  local url body
  for url in \
    "https://x.ai/cli/stable" \
    "https://storage.googleapis.com/grok-build-public-artifacts/cli/stable"
  do
    if body="$(curl -fsSL --retry 3 --retry-delay 1 --connect-timeout 20 "$url" 2>/dev/null)"; then
      body="$(printf '%s' "$body" | tr -d '\r' | head -n 1 | tr -d '[:space:]')"
      if printf '%s' "$body" | grep -Eq '^[0-9]+\.[0-9]+\.[0-9]+'; then
        printf '%s\n' "$body"
        return
      fi
    fi
  done
  echo "Grok Stick: could not reach x.ai to resolve the CLI version." >&2
  echo "Connect to the internet (one-time) or set GROK_VERSION." >&2
  exit 1
}

download_to() {
  local url="$1" dest="$2"
  if command -v curl >/dev/null 2>&1; then
    curl -fL --retry 3 --retry-delay 2 --connect-timeout 20 --progress-bar -o "$dest" "$url"
  elif command -v wget >/dev/null 2>&1; then
    wget --tries=3 -O "$dest" "$url"
  else
    echo "Grok Stick: need curl or wget to download the CLI binary." >&2
    exit 1
  fi
}

file_ok() {
  local path="$1"
  [ -f "$path" ] && [ "$(wc -c < "$path" | tr -d ' ')" -gt 1000000 ]
}

fetch_binary() {
  local platform="$1"
  local version="$2"
  local dest_dir="$ROOT/bin/$platform"
  local dest name url tmp
  mkdir -p "$dest_dir"
  case "$platform" in
    windows-*)
      dest="$dest_dir/grok.exe"
      name="grok-${version}-${platform}.exe"
      ;;
    *)
      dest="$dest_dir/grok"
      name="grok-${version}-${platform}"
      ;;
  esac
  if file_ok "$dest"; then
    printf '%s\n' "$dest"
    return
  fi
  echo "Grok Stick: fetching grok ${version} (${platform}) onto this drive..." >&2
  tmp="$dest.partial"
  rm -f "$tmp" "$tmp.gz"
  case "$platform" in
    windows-*) ;;
    *)
      for url in \
        "https://x.ai/cli/${name}.gz" \
        "https://storage.googleapis.com/grok-build-public-artifacts/cli/${name}.gz"
      do
        if download_to "$url" "$tmp.gz" && gzip -dc "$tmp.gz" > "$tmp" 2>/dev/null; then
          rm -f "$tmp.gz"
          mv "$tmp" "$dest"
          chmod +x "$dest" 2>/dev/null || true
          printf '%s\n' "$dest"
          return
        fi
        rm -f "$tmp.gz" "$tmp"
      done
      ;;
  esac
  for url in \
    "https://x.ai/cli/${name}" \
    "https://storage.googleapis.com/grok-build-public-artifacts/cli/${name}"
  do
    if download_to "$url" "$tmp"; then
      mv "$tmp" "$dest"
      chmod +x "$dest" 2>/dev/null || true
      printf '%s\n' "$dest"
      return
    fi
    rm -f "$tmp"
  done
  echo "Grok Stick: download failed for ${platform}." >&2
  exit 1
}

existing_binary() {
  local platform="$1"
  local unix="$ROOT/bin/$platform/grok"
  local win="$ROOT/bin/$platform/grok.exe"
  if file_ok "$unix"; then
    printf '%s\n' "$unix"
    return 0
  fi
  if file_ok "$win"; then
    printf '%s\n' "$win"
    return 0
  fi
  return 1
}

load_api_key

if [ "${GROK_STICK_FETCH_ALL:-}" = "1" ]; then
  VERSION="$(resolve_version)"
  echo "Grok Stick: fetching grok ${VERSION} for every platform..." >&2
  for p in linux-x86_64 linux-aarch64 macos-aarch64 macos-x86_64 windows-x86_64 windows-aarch64; do
    fetch_binary "$p" "$VERSION" >/dev/null
    echo "  ready  $p" >&2
  done
  echo "All platform binaries are on this drive. You can unplug and use it offline-to-install." >&2
  exit 0
fi

PLATFORM="$(detect_platform)"
if ! BIN="$(existing_binary "$PLATFORM")"; then
  VERSION="$(resolve_version)"
  BIN="$(fetch_binary "$PLATFORM" "$VERSION")"
fi

chmod +x "$BIN" 2>/dev/null || true
if [ "$(uname -s 2>/dev/null || true)" = "Darwin" ]; then
  xattr -d com.apple.quarantine "$BIN" 2>/dev/null || true
fi

exec "$BIN" "$@"
