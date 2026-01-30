# PROMPT MASTER — brique 1 (User Kernel + Auth + Organisation)

Tu es une IA de développement exécutante. Objectif : appliquer cette brique sans ajouter de fonctionnalités non demandées.

## Règles
- Français correct.
- Branding : `k3rn.labs` et `k0/k1/...` en minuscule (exceptions volontaires).
- Multi-tenant organisation dès V1.
- Sécurité : RLS Supabase obligatoire.
- Onboarding obligatoire avant accès à `/app`.

## Définition de “fait”
- Auth OK (signup/signin/signout).
- Onboarding crée organisation + membership owner + profile.
- `/app` et sous-routes protégées (middleware + guards).
- RLS active et policies appliquées (SQL).

## Interdit
- Ajouter des dépendances inutiles.
- Changer le schéma DB sans raison.
