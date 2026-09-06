# Source this from a terminal to put Grok Stick on PATH for this session only.
#   source /path/to/GrokStick/env.sh
# Nothing is written to ~/.bashrc or the registry.

_src="${BASH_SOURCE[0]:-$0}"
_grok_stick_dir="$(CDPATH= cd -- "$(dirname -- "$_src")" && pwd)"
export GROK_HOME="${GROK_HOME:-$_grok_stick_dir/home}"
export GROK_DISABLE_AUTOUPDATER="${GROK_DISABLE_AUTOUPDATER:-1}"
mkdir -p "$GROK_HOME" 2>/dev/null || true

if [ -f "$GROK_HOME/api-key" ]; then
  _key="$(tr -d '\r' < "$GROK_HOME/api-key" | sed '/^[[:space:]]*#/d;/^[[:space:]]*$/d' | head -n 1 | tr -d '[:space:]')"
  if [ -n "$_key" ]; then
    export XAI_API_KEY="$_key"
  fi
  unset _key
fi

case ":$PATH:" in
  *":$_grok_stick_dir:"*) ;;
  *) export PATH="$_grok_stick_dir:$PATH" ;;
esac

unset _src _grok_stick_dir
echo "Grok Stick is on PATH for this terminal. cd into a project and run: grok"
