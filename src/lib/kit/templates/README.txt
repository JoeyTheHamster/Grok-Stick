GROK STICK
==========

A self-contained Grok CLI you keep on a USB flash drive. It does not install
into Program Files, /usr/local, or your user profile. Config, login, and
session history stay in the home\ folder on this drive.

WHAT YOU NEED
-------------
- A USB stick formatted as exFAT (works on Windows, macOS, and Linux)
- About 200 MB free for one computer, or ~800 MB if you preload every OS
- An internet connection the first time each OS/architecture runs
  (the CLI itself always needs internet to talk to xAI)

QUICK START
-----------
1. Copy the whole GrokStick folder onto the USB drive.

2. Open a terminal in the project you want to work on.

3. Run the launcher from the stick:

   Windows:   E:\GrokStick\grok.cmd
   macOS:     /Volumes/USB/GrokStick/grok
   Linux:     /media/$USER/USB/GrokStick/grok

   First run downloads the official binary for THIS computer onto the stick
   (about 40–140 MB). After that, the same computer — and any other machine
   of the same OS and CPU — starts instantly.

4. Optional, so you can just type "grok":

   Windows PowerShell:  . E:\GrokStick\env.ps1
   Windows CMD:         E:\GrokStick\env.cmd
   macOS / Linux:       source /Volumes/USB/GrokStick/env.sh

   That only lasts for the current terminal. Nothing is added to your PATH
   permanently.

PRELOAD EVERY MACHINE TYPE
--------------------------
If you want the stick ready for Windows, Mac, and Linux before you leave
home, run this once while online:

   Windows:   fetch-all.cmd
   macOS/Linux: ./fetch-all.sh

SIGN IN
-------
On first launch Grok opens a browser. The login file is saved as
home\auth.json on the stick, so the next machine can reuse it until the
token expires (about 7 days).

To skip the browser, paste an API key from https://console.x.ai into a file
named home\api-key (see api-key.example).

WHAT STAYS ON THE STICK
-----------------------
  grok / grok.cmd     launchers
  bin\<platform>\     official Grok CLI binary for that OS
  home\config.toml    settings
  home\auth.json      login (created after you sign in)
  home\sessions\      chat / coding sessions
  home\memory\        cross-session memory

Nothing is written to C:\Users\...\.grok or ~/.grok unless you run the
official installer separately.

UPDATE
------
Delete the bin folder (or one platform folder inside it) and run grok again.
Or rerun fetch-all. The launcher never auto-updates the host.

USB TIPS
--------
- Format as exFAT, not NTFS (Mac) and not APFS (Windows).
- Eject before unplugging.
- If macOS blocks the binary: System Settings → Privacy & Security → Open Anyway.
  The launcher also clears the quarantine flag when it can.
- If a Windows SmartScreen prompt appears, choose Run anyway — these are the
  official binaries from x.ai/cli.
- Do not store the stick where others can copy home\auth.json or home\api-key.
  That is your Grok login.

This kit launches the official Grok CLI published at https://x.ai/cli.
It is a portable wrapper, not a modified build of Grok.
