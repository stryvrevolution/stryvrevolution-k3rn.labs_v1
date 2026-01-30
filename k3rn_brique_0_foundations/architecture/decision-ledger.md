# Decision Ledger — concepts (V1)

## Objectif
Rendre chaque évolution traçable, explicable et versionnable.

## Types de décisions
1. **Utilisateur (empreinte forte)** : choix explicites, validation, refus.
2. **Compilée (empreinte moyenne)** : déduite de règles déterministes, override possible.
3. **Proposition expert (empreinte faible)** : suggestion non validée.

## Champs conceptuels
- `decision_id`
- `timestamp`
- `actor` : user / system / expert
- `type` : user / compiled / proposal
- `topic`
- `input_refs` : liens vers éléments source (User Kernel, Intent Profile, fichiers, etc.)
- `rationale` : pourquoi (adapté au niveau)
- `alternatives` : options comparées
- `status` : proposed / accepted / rejected / superseded
- `supersedes` : référence si remplace une décision
- `version` : règles/pack utilisé (si compilée)

## Règle d’or
Aucune donnée “Validated” dans le Cortex sans une décision correspondante.
