#!/usr/bin/env bash
set -euo pipefail

echo "== k3rn verify build =="

# Build k0_skeleton app
if [ -d k0_skeleton ]; then
  pushd k0_skeleton >/dev/null
  if [ ! -f package.json ]; then
    echo "FAIL: k0_skeleton/package.json missing" >&2
    exit 1
  fi
  npm ci
  npm run build
  popd >/dev/null
  echo "OK: k0_skeleton built successfully."
else
  echo "INFO: k0_skeleton workspace not found. Skipping."
fi

exit 0
