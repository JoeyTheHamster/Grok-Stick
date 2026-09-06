#!/usr/bin/env bash
# Preload every official Grok CLI binary onto this drive (macOS, Linux, Windows).
set -euo pipefail
DIR="$(cd "$(dirname "$0")" && pwd)"
export GROK_STICK_FETCH_ALL=1
exec "$DIR/grok"
