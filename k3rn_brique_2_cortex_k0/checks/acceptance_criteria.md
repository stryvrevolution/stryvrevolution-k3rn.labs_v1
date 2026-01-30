# Critères d’acceptation — brique 2

Pré-requis : brique 1 installée et fonctionnelle.

- [ ] Migration `supabase/migrations/002_cortex.sql` exécutée sans erreur.
- [ ] Bucket Supabase Storage `project-files` créé.
- [ ] (Recommandé) Policies Storage appliquées (fichier `supabase/storage_policies.sql`).
- [ ] Création projet → un `project_cortex` est créé automatiquement (trigger).
- [ ] `/app/projects/:id/k0` accessible.
- [ ] Ingestion texte : crée `artefacts` + `artefact_layers` (raw).
- [ ] Ingestion fichier : upload storage + crée `artefacts` + layer raw.
- [ ] Cortex liste les artefacts correctement.
- [ ] Ledger : création d’une décision OK (table `decisions`).
