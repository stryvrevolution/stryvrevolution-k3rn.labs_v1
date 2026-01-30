# brique 2 — Cortex V1 + Decision Ledger + k0 (Ingestion & Espace de travail) — k3rn.labs

Date : 2026-01-30

## Ce que cette brique ajoute
- **Cortex V1** (artefacts + couches : raw/clean/structured/validated)
- **Decision Ledger** (empreinte des décisions)
- **Lab session** (k0) : espace de travail minimal, style Payrix-like
- **Ingestion** : texte + fichier (Supabase Storage)
- **Vue Cortex** : liste des artefacts + couches disponibles (V1 minimal)

> ⚠️ Pas encore : LLM experts, scoring, mind map. Cette brique pose le socle déterministe.

## Stack (inchangée)
- Next.js (App Router) + TypeScript
- Supabase (Auth + Postgres + Storage)
- Tailwind + UI minimal

## Comment appliquer cette brique
Cette brique est conçue comme un **overlay** sur la brique 1.

1) Dézipper cette brique au-dessus de ton repo brique 1 (en conservant les fichiers existants).
2) Exécuter la migration Supabase : `supabase/migrations/002_cortex.sql`
3) Créer le bucket Storage : `project-files` (privé)
4) Appliquer les policies Storage recommandées : `supabase/storage_policies.sql` (optionnel mais recommandé)
5) Lancer : `npm run dev`

## Nouvelles routes
- `/app/projects/:projectId/k0` : laboratoire k0 (ingestion + cortex)
- `/app/projects/:projectId` : lien vers k0 ajouté

## Dossiers
- `supabase/migrations/002_cortex.sql` : schéma + RLS cortex/ledger/sessions
- `supabase/storage_policies.sql` : policies Storage (objects) recommandées
- `src/app/app/projects/[projectId]/k0` : UI k0
- `src/components/k0/*` : composants k0
- `src/lib/cortex/*` : helpers types + fonctions

## Checks
Voir `checks/acceptance_criteria.md`.
