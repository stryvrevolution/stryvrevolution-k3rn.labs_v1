# PR 005 – Brique 3: UX Signature v1_1 (k0)

Objectif:
- Livrer l’interface k0 Brainstorming connectée aux endpoints (session, chat expert, score, validate).

Changements clés:
- ClientRoot orchestrateur côté client (état session, expert, transcript, score, validation).
- ExpertSelector contrôlé (choix expert).
- ChatPanel (saisie message, transcript, envoi → /api/k0/expert/chat).
- CortexPreview (aperçu des réponses expert récentes).
- ScorePanel (appel /api/k0/score, affichage breakdown).
- ValidateButton (appel /api/k0/validate).
- page.tsx: serveur → rend ClientRoot avec params.projectId.

Preuve build:
- `npm run build` OK.

Notes:
- Démarrage de session auto au mount (POST /api/k0/session/start).
- Les erreurs DB sont possibles si les tables Supabase ne sont pas migrées (attendu).

Branche:
- br/brick-3-ux-signature-v1_1
