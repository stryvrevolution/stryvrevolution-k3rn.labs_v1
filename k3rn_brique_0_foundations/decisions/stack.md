# Stack V1 (figé)

## Objectif
Stack optimisé pour : solo, budget quasi nul, vibe coding, itération rapide, sécurité nette, extensibilité “labs plugins”.

## Choix
- Next.js (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Zod + React Hook Form
- Supabase (Postgres + Auth + Storage), région Europe
- Drizzle ORM
- Déploiement : Vercel + Supabase

## Notes
- Backend : V1 “dans Next” via Route Handlers.
- Jobs async : V1 minimal, file d’attente en base + worker Node (à définir en brique dédiée).
