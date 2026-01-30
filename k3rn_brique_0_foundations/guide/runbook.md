# Runbook — exécution par IA (brique par brique)

## Principe
Chaque brique est un zip autonome. Tu donnes le zip à ton IA dev. Elle exécute.

## Pour brique 0
1. Donne `PROMPT_MASTER.md`.
2. Exécute PR_001, puis PR_002, puis PR_003.
3. Après chaque PR : appliquer `checks/acceptance_criteria.md` + `checks/quality_gate.md`.
4. Quand tout est validé : passer à la brique 1.

## Règle anti-dette
Si une décision manque : on la documente d’abord (brique 0/1), puis seulement ensuite on code.
