# brique 1 — User Kernel + Auth + Organisation (multi-tenant) — k3rn.labs

Date : 2026-01-30

Base exécutable V1 :
- Auth Supabase (email/mot de passe)
- Multi-tenant “organisation” (membres + rôles owner/editor/viewer)
- User Kernel (profil transverse)
- Onboarding obligatoire (création organisation + profil)
- Dashboard minimal (UI premium sobre type Payrix)

## Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS + composants UI (style shadcn-like, intégrés)
- Supabase (Auth + Postgres + Storage) — région Europe (RGPD)
- Déploiement V1 : Vercel + Supabase

## Démarrage local
1) Installer
```bash
npm install
```

2) Variables
```bash
cp .env.example .env.local
```

3) Supabase
- Créer un projet Supabase en **région Europe**.
- Exécuter le SQL : `supabase/migrations/001_init.sql` (éditeur SQL Supabase).
- Renseigner `.env.local`.

4) Lancer
```bash
npm run dev
```

## Parcours utilisateur
- `/auth` : signup/signin
- première connexion sans profil/org → `/onboarding`
- après onboarding → `/app`
  - `/app` aperçu
  - `/app/projects` liste
  - `/app/projects/new` création
  - `/app/projects/:id` vue projet

## Checks
Voir `checks/acceptance_criteria.md`.
