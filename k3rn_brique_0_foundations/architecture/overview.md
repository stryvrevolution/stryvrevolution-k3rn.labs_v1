# Architecture conceptuelle — vue d’ensemble

k3rn.labs est un système d’orchestration de décisions qui transforme des intentions humaines (non-tech) en artefacts exploitables (briefs, blueprints, Zip Master, guides), via des laboratoires (k0, k1, …) composables.

## Entités centrales
- **User Kernel** : profil transverse (stable), utilisé par tous les labs.
- **Organisation** : multi-tenant (source de vérité des membres, rôles, projets).
- **Projet** : conteneur d’un Cortex vivant.
- **Cortex** : mémoire structurée du projet (couches + graph).
- **Decision Ledger** : journal immuable des décisions (utilisateur + compilées + propositions).
- **Lab Engine** : système plugin, chaque lab lit/écrit dans le Cortex.
- **Expert System** : experts fixes (rôle stable) avec accès au Cortex.
- **Compiler** : transforme Intentions → Contraintes → Recommandations (déterministe).
- **Zip Master** : export structuré “machine & humain”.

## Principes
- L’utilisateur décide toujours.
- L’IA recommande, structure, explique.
- Chaque lab est ajoutable sans refactor massif (plugin contract).
