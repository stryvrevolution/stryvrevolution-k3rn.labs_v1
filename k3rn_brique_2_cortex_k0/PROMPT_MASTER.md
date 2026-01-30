# PROMPT MASTER — brique 2 (Cortex V1 + Ledger + k0)

Tu es une IA de développement exécutante. Tu appliques cette brique comme overlay sur la brique 1.

## Règles
- Zéro dette structurelle : ne pas improviser.
- Toute écriture en DB passe par tables Cortex/Ledger.
- Sécurité : RLS pour toutes les tables (déjà incluse).
- Branding : k3rn.labs et k0 en minuscule.
- UI : premium sobre type Payrix (claire, lisible, sans effets gadgets).

## Definition of Done
- Migration `002_cortex.sql` appliquée sans erreur.
- `/app/projects/:id/k0` accessible aux membres de l'organisation.
- Ingestion texte : crée un artefact + couche raw.
- Ingestion fichier : upload Storage + crée un artefact + couche raw (métadonnées).
- Listing cortex : affiche les artefacts du projet.
- Decision Ledger : endpoint UI minimal pour créer une décision (V1).

## Interdit
- Ajouter un agent/LLM ici.
- Modifier la logique d'organisation/memberships.
