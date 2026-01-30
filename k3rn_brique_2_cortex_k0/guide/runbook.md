# Runbook — brique 2

## Supabase
1) Exécuter `supabase/migrations/002_cortex.sql`
2) Storage :
   - Créer le bucket privé `project-files`
   - (Optionnel mais recommandé) Exécuter `supabase/storage_policies.sql`

## App
- Ouvrir un projet → cliquer **Ouvrir k0**
- Tester ingestion texte (>= 10 caractères)
- Tester ingestion fichier (upload)

## Notes
- Les experts (LLM) ne sont pas encore branchés.
- Les couches clean/structured/validated arrivent en brique ultérieure (pipeline).
