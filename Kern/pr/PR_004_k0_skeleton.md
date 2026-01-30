# PR 004 – Brique 2: k0 Skeleton

Objectif:
- Initialiser le socle k0 (Next.js App Router + endpoints API + intégration Supabase) sous gouvernance Kern.

Changements clés:
- Projet Next.js (app router) `k0_skeleton/` avec structure standard.
- Endpoints API:
  - POST /api/k0/session/start
  - POST /api/k0/ingest/text
  - POST /api/k0/expert/chat
  - POST /api/k0/score
  - POST /api/k0/validate
- Partagés API: `src/app/api/_shared/{k0Db, supabaseClient, provider, experts}.ts`.
- Alias TS `@/*` → `./src/*` (tsconfig).
- Dépendance installée: `@supabase/supabase-js`.
- Fichier `.env.example` (SUPABASE_URL, SUPABASE_ANON_KEY).
- README mis à jour avec setup et smoke tests.

Preuve build:
- `npm run build` OK (Next.js 16 / Turbopack). Pages statiques générées. Aucune erreur TS.

Smoke tests (manuel):
- Voir k0_skeleton/README.md (curl pour chaque route).

Notes:
- Les erreurs DB possibles indiquent l’absence de migrations. Les routes et la pile s’exécutent.

Branch:
- br/brick-2-k0-skeleton

