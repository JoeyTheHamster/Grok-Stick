#!/bin/bash
# Double-click on macOS to open Grok Stick in Terminal.
cd "$(dirname "$0")" || exit 1
chmod +x ./grok ./fetch-all.sh ./env.sh 2>/dev/null || true
echo "Grok Stick"
echo "cd into a project in another tab, then run this path:"
echo "  $(pwd)/grok"
echo
./grok
