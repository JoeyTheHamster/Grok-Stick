@echo off
setlocal EnableExtensions EnableDelayedExpansion
rem Grok Stick — Windows launcher. Installs nothing. Config stays on this drive.

set "ROOT=%~dp0"
if "%ROOT:~-1%"=="\" set "ROOT=%ROOT:~0,-1%"
if not defined GROK_HOME set "GROK_HOME=%ROOT%\home"
set "GROK_DISABLE_AUTOUPDATER=1"
if not exist "%GROK_HOME%" mkdir "%GROK_HOME%"
if not exist "%ROOT%\bin" mkdir "%ROOT%\bin"

if exist "%GROK_HOME%\api-key" (
  for /f "usebackq tokens=* eol=#" %%A in ("%GROK_HOME%\api-key") do (
    set "LINE=%%A"
    if not "!LINE!"=="" (
      set "XAI_API_KEY=!LINE!"
      goto :keydone
    )
  )
)
:keydone

set "ARCH=%PROCESSOR_ARCHITECTURE%"
if defined PROCESSOR_ARCHITEW6432 set "ARCH=%PROCESSOR_ARCHITEW6432%"
if /I "%ARCH%"=="ARM64" (
  set "PLAT=windows-aarch64"
) else (
  set "PLAT=windows-x86_64"
)

set "BIN=%ROOT%\bin\%PLAT%\grok.exe"
if not exist "%BIN%" (
  echo Grok Stick: fetching the Windows CLI onto this drive...
  powershell -NoProfile -ExecutionPolicy Bypass -File "%ROOT%\lib\fetch.ps1" -Platform "%PLAT%"
  if errorlevel 1 (
    echo Grok Stick: download failed.
    exit /b 1
  )
)

if not exist "%BIN%" (
  echo Grok Stick: grok.exe is missing after fetch. See README.txt
  exit /b 1
)

"%BIN%" %*
exit /b %ERRORLEVEL%
