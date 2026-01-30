#!/usr/bin/env bash
set -euo pipefail

# Remote Access Gate : vérification accès remote git
KERN_VERIFY_REMOTE="$(dirname "$0")/../verify/verify_remote_access.sh"
if [ -x "$KERN_VERIFY_REMOTE" ]; then
  "$KERN_VERIFY_REMOTE" || exit 1
else
  echo "[Remote Access Gate] ERREUR : Script de vérification introuvable ($KERN_VERIFY_REMOTE)" >&2
  exit 1
fi

echo "== k3rn verify repo =="

need(){ [ -e "$1" ] || { echo "FAIL: missing $1" >&2; exit 1; }; }

need k3rn
need k3rn/PROMPT_MASTER_FINAL.md

if [ -f package.json ]; then
  echo "OK: package.json present."
  need src
  need src/app
else
  echo "INFO: package.json not present yet (expected before PR_001)."
fi

echo "OK."
