@echo off
setlocal
set "ROOT=%~dp0"
if "%ROOT:~-1%"=="\" set "ROOT=%ROOT:~0,-1%"
echo Grok Stick: fetching every platform binary onto this drive...
powershell -NoProfile -ExecutionPolicy Bypass -File "%ROOT%\lib\fetch.ps1" -All
if errorlevel 1 exit /b 1
echo Done. This stick now has binaries for Windows, macOS, and Linux.
