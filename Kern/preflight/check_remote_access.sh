#!/bin/bash
# Remote Access Gate — preflight
set -euo pipefail

# Vérifie la présence d'un remote origin
REMOTE_URL=$(git remote get-url origin 2>/dev/null || true)
if [ -z "$REMOTE_URL" ]; then
  echo "[Remote Access Gate] ERREUR : Aucun remote 'origin' configuré.\nCorrigez avec : git remote add origin <url>\nVoir RUNBOOK dans Kern/Guide/Rules/REMOTE_ACCESS_GATE.md"
  exit 1
fi

# Affiche le schéma (https ou ssh)
if [[ "$REMOTE_URL" =~ ^https:// ]]; then
  echo "[Remote Access Gate] Remote origin : HTTPS ($REMOTE_URL)"
elif [[ "$REMOTE_URL" =~ ^git@ ]]; then
  echo "[Remote Access Gate] Remote origin : SSH ($REMOTE_URL)"
else
  echo "[Remote Access Gate] Remote origin : inconnu ($REMOTE_URL)"
fi

# Test lecture
if ! git ls-remote origin HEAD &>/dev/null; then
  echo "[Remote Access Gate] ERREUR : Impossible de lire sur le remote.\nVérifiez vos droits d'accès et l'authentification.\nVoir RUNBOOK dans Kern/Guide/Rules/REMOTE_ACCESS_GATE.md"
  exit 1
fi

# Test écriture safe (dry-run)
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if ! git push --dry-run origin "$BRANCH" &>/dev/null; then
  echo "[Remote Access Gate] ERREUR : Impossible de pousser (push) sur le remote.\nVérifiez vos droits d'écriture et l'authentification.\nVoir RUNBOOK dans Kern/Guide/Rules/REMOTE_ACCESS_GATE.md"
  exit 1
fi

echo "[Remote Access Gate] OK : Remote prêt (lecture + écriture) sur $REMOTE_URL"
exit 0
