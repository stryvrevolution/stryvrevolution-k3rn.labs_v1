# Addendum Prompt Master V1.4 — Remote Access Gate

## Règle bloquante : Remote Access Gate

Aucune exécution autonome n'est autorisée si l'accès remote Git (push) n'est pas fonctionnel.

- Détection automatique : remote absent, remote invalide, droits insuffisants, auth manquante.
- Vérification automatique en preflight et verify.
- Blocage intégré avant toute PR.
- Si échec : passage obligatoire en MODE ASSISTED (patchs, pas de push direct).

## Scripts
- `Kern/preflight/check_remote_access.sh`
- `Kern/verify/verify_remote_access.sh`

## Documentation
- Voir : `Kern/guide/Rules/REMOTE_ACCESS_GATE.md`

---

**Cette règle est prioritaire et fait partie du Prompt Master V1.4.**

Toute tentative de contournement ou violation de l'accès remote entraîne l’échec immédiat de la PR et l’arrêt du pipeline CI.
