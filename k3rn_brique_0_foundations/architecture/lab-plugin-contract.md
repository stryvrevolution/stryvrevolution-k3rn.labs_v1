# Contrat “Lab Plugin” (V1)

## Objectif
Permettre d’ajouter un laboratoire ultérieurement sans dette structurelle.

## Interface conceptuelle (à implémenter en code plus tard)
Chaque lab doit déclarer :

### Identité
- `lab_id` : ex. `k0`
- `name` : nom humain
- `version` : ex. `1.0.0`

### Entrées (lecture)
- `reads` : chemins/sections du Cortex nécessaires
- `requires_user_kernel` : bool
- `required_files` : types (optionnel)

### Sorties (écriture)
- `writes` : sections du Cortex enrichies
- `outputs` : artefacts (brief, tableau, checklist, etc.)

### Experts
- `experts[]` : liste d’experts disponibles dans ce lab (profils fixes)

### Questions / UI
- `question_types[]` : sliders, choix multiples, cards, drag/drop, texte libre conditionnel
- `dynamic_ui` : oui (génération contrôlée)

### Scoring
- `quality_score` : calcul + justification
- `recommendations` : liste structurée de “next steps”

### Validation & fin de lab
- `can_skip` : oui
- `completion_rule` : validation utilisateur + score indicatif

## Règles
- Un lab ne stocke pas d’état métier en dehors du Cortex et du Ledger.
- Un lab ne “décide” pas : il propose et écrit des hypothèses/recommandations.
- Tout write dans le Cortex doit pointer vers une entrée du Decision Ledger.
