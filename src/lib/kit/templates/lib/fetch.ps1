#Requires -Version 5.1
# Grok Stick — download the official CLI binary onto this drive.
[CmdletBinding()]
param(
  [string]$Platform,
  [switch]$All
)

$ErrorActionPreference = 'Stop'
[Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor [Net.SecurityProtocolType]::Tls12
Add-Type -AssemblyName System.IO.Compression

$Root = Split-Path -Parent (Split-Path -Parent $PSCommandPath)
if (-not $env:GROK_HOME) { $env:GROK_HOME = Join-Path $Root 'home' }
$env:GROK_DISABLE_AUTOUPDATER = '1'

function Get-GrokVersion {
  if ($env:GROK_VERSION) { return $env:GROK_VERSION.Trim() }
  $urls = @(
    'https://x.ai/cli/stable',
    'https://storage.googleapis.com/grok-build-public-artifacts/cli/stable'
  )
  foreach ($url in $urls) {
    try {
      $v = (Invoke-WebRequest -UseBasicParsing -Uri $url -TimeoutSec 30).Content.Trim()
      if ($v -match '^\d+\.\d+\.\d+') { return $v }
    } catch { }
  }
  throw 'Grok Stick: could not reach x.ai to resolve the CLI version.'
}

function Get-NativePlatform {
  $arch = $env:PROCESSOR_ARCHITECTURE
  if ($env:PROCESSOR_ARCHITEW6432) { $arch = $env:PROCESSOR_ARCHITEW6432 }
  switch ($arch) {
    'ARM64' { return 'windows-aarch64' }
    default { return 'windows-x86_64' }
  }
}

function Test-Binary([string]$Path) {
  return (Test-Path $Path) -and ((Get-Item $Path).Length -gt 1MB)
}

function Save-Url([string]$Url, [string]$Dest) {
  $curl = Get-Command curl.exe -ErrorAction SilentlyContinue
  if ($curl) {
    & curl.exe -fL --retry 3 --retry-delay 2 --progress-bar -o $Dest $Url
    if ($LASTEXITCODE -ne 0) { throw "curl failed: $Url" }
    return
  }
  Invoke-WebRequest -UseBasicParsing -Uri $Url -OutFile $Dest -TimeoutSec 600
}

function Install-GrokBinary([string]$Plat) {
  $destDir = Join-Path $Root "bin\$Plat"
  New-Item -ItemType Directory -Force -Path $destDir | Out-Null
  $isWindows = $Plat -like 'windows-*'
  $dest = if ($isWindows) { Join-Path $destDir 'grok.exe' } else { Join-Path $destDir 'grok' }
  if (Test-Binary $dest) { return $dest }

  $version = Get-GrokVersion
  $name = if ($isWindows) { "grok-$version-$Plat.exe" } else { "grok-$version-$Plat" }
  Write-Host "Grok Stick: fetching grok $version ($Plat) onto this drive..."
  $tmp = "$dest.partial"
  $urls = @(
    "https://x.ai/cli/$name",
    "https://storage.googleapis.com/grok-build-public-artifacts/cli/$name"
  )
  if (-not $isWindows) {
    $urls = @(
      "https://x.ai/cli/$name.gz",
      "https://storage.googleapis.com/grok-build-public-artifacts/cli/$name.gz"
    ) + $urls
  }
  $ok = $false
  foreach ($url in $urls) {
    try {
      if (Test-Path $tmp) { Remove-Item $tmp -Force }
      Save-Url $url $tmp
      if ($url.EndsWith('.gz')) {
        $out = $dest
        $gz = "$tmp.gz"
        Move-Item -Force $tmp $gz
        $in = [System.IO.File]::OpenRead($gz)
        try {
          $gzip = New-Object System.IO.Compression.GzipStream($in, [System.IO.Compression.CompressionMode]::Decompress)
          $file = [System.IO.File]::Create($tmp)
          try { $gzip.CopyTo($file) } finally { $file.Dispose(); $gzip.Dispose() }
        } finally { $in.Dispose() }
        Remove-Item $gz -Force -ErrorAction SilentlyContinue
      }
      if ((Get-Item $tmp).Length -gt 1MB) {
        Move-Item -Force $tmp $dest
        $ok = $true
        break
      }
    } catch {
      if (Test-Path $tmp) { Remove-Item $tmp -Force -ErrorAction SilentlyContinue }
    }
  }
  if (-not $ok) { throw "Grok Stick: download failed for $Plat" }
  return $dest
}

$targets = @()
if ($All) {
  $targets = @(
    'linux-x86_64', 'linux-aarch64',
    'macos-aarch64', 'macos-x86_64',
    'windows-x86_64', 'windows-aarch64'
  )
} elseif ($Platform) {
  $targets = @($Platform)
} else {
  $targets = @(Get-NativePlatform)
}

foreach ($t in $targets) {
  $null = Install-GrokBinary $t
  Write-Host "  ready  $t"
}
