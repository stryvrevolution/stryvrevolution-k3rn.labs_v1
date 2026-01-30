# Remote Access Gate

## Règle bloquante

Aucune exécution autonome n'est autorisée si l'accès remote Git (push) n'est pas fonctionnel.

- Détection automatique : remote absent, remote invalide, droits insuffisants, auth manquante.
- Deux chemins supportés :
  - Rapide : HTTPS (token ou login)
  - Propre : SSH (clé publique)
- Procédure migration HTTPS → SSH :
  1. Générer une clé SSH : `ssh-keygen -t ed25519`
  2. Ajouter la clé à GitHub : https://github.com/settings/keys
  3. Modifier le remote : `git remote set-url origin git@github.com:<org>/<repo>.git`

## Scripts
- `Kern/preflight/check_remote_access.sh`
- `Kern/verify/verify_remote_access.sh`

## Exemples d'échec
- Remote absent :
  ```
  [Remote Access Gate] ERREUR : Aucun remote 'origin' configuré.
  Corrigez avec : git remote add origin <url>
  Voir RUNBOOK dans Kern/Guide/Rules/REMOTE_ACCESS_GATE.md
  ```
- Remote lecture KO :
  ```
  [Remote Access Gate] ERREUR : Impossible de lire sur le remote.
  Vérifiez vos droits d'accès et l'authentification.
  Voir RUNBOOK dans Kern/Guide/Rules/REMOTE_ACCESS_GATE.md
  ```
- Remote écriture KO :
  ```
  [Remote Access Gate] ERREUR : Impossible de pousser (push) sur le remote.
  Vérifiez vos droits d'écriture et l'authentification.
  Voir RUNBOOK dans Kern/Guide/Rules/REMOTE_ACCESS_GATE.md
  ```

## Mode Assisted
En cas d'échec, basculez en mode Assisted (patchs manuels, pas de push direct).
