@echo off
rem Run this to put Grok Stick on PATH for this Command Prompt only.
set "ROOT=%~dp0"
if "%ROOT:~-1%"=="\" set "ROOT=%ROOT:~0,-1%"
if not defined GROK_HOME set "GROK_HOME=%ROOT%\home"
set "GROK_DISABLE_AUTOUPDATER=1"
set "PATH=%ROOT%;%PATH%"
echo Grok Stick is on PATH for this terminal. cd into a project and run: grok
