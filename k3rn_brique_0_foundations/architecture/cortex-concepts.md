# Cortex — concepts (V1)

## Pourquoi un Cortex ?
Un projet n’est pas un document figé. C’est une entité vivante, qui accumule :
- des inputs bruts (fichiers, notes, vocaux),
- des interprétations (résumés, extraction),
- une structure (taxonomie, sections, nœuds),
- des validations (décisions signées).

## Modèle par couches
- **Raw** : intouchable (fichiers originaux, transcripts bruts, liens).
- **Interpreted** : extraction/normalisation (résumés, tags, entités).
- **Structured** : organisation en sections/nœuds (brief, specs, mind map).
- **Validated** : ce qui est approuvé par l’utilisateur (empreinte forte).

## Représentations
- Graph logique (nœuds/relations)
- Document vivant (vue lisible)
- Mind map “signature” (vue graphique)

## Lien avec le Decision Ledger
Tout élément en couche “Validated” doit référencer :
- une décision utilisateur OU
- une décision compilée explicitement approuvée.
