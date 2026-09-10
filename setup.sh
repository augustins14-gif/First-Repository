#!/usr/bin/env bash
# Installs the CLI npm packages documented in this repo globally:
#   - @linkedapi/linkedin-cli
#   - @p1va/ashby
#
# Usage:
#   ./setup.sh
#
# After installation:
#   linkedin setup                     # authenticate the LinkedIn CLI
#   ashby <company-slug-or-board-url>  # browse a company's Ashby job board

set -euo pipefail

PACKAGES=(
  "@linkedapi/linkedin-cli"
  "@p1va/ashby"
)

if ! command -v npm >/dev/null 2>&1; then
  echo "Error: npm is required but was not found on PATH." >&2
  echo "Install Node.js (which bundles npm) from https://nodejs.org/ and re-run this script." >&2
  exit 1
fi

for package in "${PACKAGES[@]}"; do
  echo "Installing ${package} globally..."
  npm install -g "${package}"
done

echo
echo "Installed. Verify with: linkedin --version && ashby --version"
echo "Next, authenticate the LinkedIn CLI with: linkedin setup"
echo "And list jobs on an Ashby board with: ashby <company-slug>"
