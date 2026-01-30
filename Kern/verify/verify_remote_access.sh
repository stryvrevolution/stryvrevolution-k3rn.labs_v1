#!/bin/bash
# Remote Access Gate — verify
set -euo pipefail

SCRIPT="$(dirname "$0")/../preflight/check_remote_access.sh"
if [ -x "$SCRIPT" ]; then
  "$SCRIPT"
else
  echo "[Remote Access Gate] ERREUR : Script de preflight introuvable ($SCRIPT)" >&2
  exit 1
fi
