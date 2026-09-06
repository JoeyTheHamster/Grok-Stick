# Dot-source this in PowerShell to put Grok Stick on PATH for this session only.
#   . E:\GrokStick\env.ps1
# Nothing is written to User PATH or the registry.

$Root = $PSScriptRoot
if (-not $env:GROK_HOME) { $env:GROK_HOME = Join-Path $Root 'home' }
$env:GROK_DISABLE_AUTOUPDATER = '1'
New-Item -ItemType Directory -Force -Path $env:GROK_HOME | Out-Null

$keyFile = Join-Path $env:GROK_HOME 'api-key'
if (Test-Path $keyFile) {
  $key = Get-Content $keyFile |
    Where-Object { $_ -and ($_ -notmatch '^\s*#') } |
    Select-Object -First 1
  if ($key) { $env:XAI_API_KEY = $key.Trim() }
}

if (-not ($env:Path -split ';' | Where-Object { $_ -eq $Root })) {
  $env:Path = "$Root;$env:Path"
}

Write-Host "Grok Stick is on PATH for this terminal. cd into a project and run: grok"
