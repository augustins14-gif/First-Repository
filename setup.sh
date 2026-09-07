#!/usr/bin/env bash
# Installs the @linkedapi/linkedin-cli npm package globally.
#
# Usage:
#   ./setup.sh
#
# After installation, authenticate with:
#   linkedin setup
# or non-interactively:
#   linkedin setup --linked-api-token=<token> --identification-token=<token>

set -euo pipefail

PACKAGE="@linkedapi/linkedin-cli"

if ! command -v npm >/dev/null 2>&1; then
  echo "Error: npm is required but was not found on PATH." >&2
  echo "Install Node.js (which bundles npm) from https://nodejs.org/ and re-run this script." >&2
  exit 1
fi

echo "Installing ${PACKAGE} globally..."
npm install -g "${PACKAGE}"

echo
echo "Installed. Verify with: linkedin --version"
echo "Next, authenticate with: linkedin setup"
