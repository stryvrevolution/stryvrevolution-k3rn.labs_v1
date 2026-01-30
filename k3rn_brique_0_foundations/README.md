# brique 0 — Foundations (k3rn.labs)

Date : 2026-01-30

Cette brique ne contient **aucun code**. Elle fige la vérité structurante de k3rn.labs pour que toutes les briques suivantes puissent être exécutées en “vibe coding” (IA exécutante), sans dette technique structurelle.

## Objectifs
- Définir les principes non négociables (produit + technique).
- Figer le stack V1 (avec contraintes Europe/RGPD, multi-tenant “organisation”, budget ~0).
- Définir le modèle conceptuel : Cortex, Decision Ledger, Labs (k0, k1, …) en architecture “plugin”.
- Définir les conventions de dépôt (repo), de rédaction, de nommage et de langage.
- Produire un kit d’exécution IA : prompt master + PRs documentaires + critères d’acceptation.

## Contenu
- `/decisions/` : décisions figées (source de vérité).
- `/architecture/` : architecture conceptuelle + contrats de modules.
- `/ui/` : vision UI/UX “coworking” + signature minimale.
- `/pr/` : PRs documentaires (ordre chronologique).
- `/checks/` : critères d’acceptation / quality gates.
- `/guide/` : mode opératoire pour exécution par IA (brique par brique).

## Comment utiliser cette brique (workflow IA)
1. Donne à ton IA dev le fichier : `PROMPT_MASTER.md`.
2. Demande-lui d’exécuter les PR dans l’ordre (`/pr/PR_001...`).
3. Après chaque PR, applique les checks (`/checks/...`) et valide.

## Ce qui est figé (résumé)
- Branding : **k3rn.labs** et labs **k0, k1, …** en minuscule (exceptions volontaires).
- Langue : français (règles strictes).
- Hébergement V1 : Europe (RGPD), marché francophone.
- Multi-tenant organisation : **oui** dès la V1.
- UI signature : **oui** dès la V1 (même minimale), style “espaces de coworking”.
- Stack V1 : Next.js + TypeScript + Supabase (EU) + Tailwind + shadcn/ui + Drizzle + Vercel.

## Prochaine brique recommandée
- **brique 1 — User Kernel + Auth + Organisation (multi-tenant)**
