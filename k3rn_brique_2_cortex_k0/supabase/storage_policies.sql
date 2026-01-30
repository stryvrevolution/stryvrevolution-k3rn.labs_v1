-- Storage policies recommandées (bucket: project-files, privé)
-- ⚠️ À exécuter seulement après création du bucket via l'UI Supabase.
-- Objectif V1 : permettre aux utilisateurs authentifiés d'uploader et lire leurs fichiers.
-- Amélioration future : restreindre par project_id via le chemin.

-- Règle simple V1 (rigoureuse mais large) :
-- - Authentifiés : insert/select/update/delete sur storage.objects pour bucket project-files

-- Enable RLS sur storage.objects est déjà activé côté Supabase.
-- On crée des policies ciblées sur le bucket.

drop policy if exists "project_files_select_authenticated" on storage.objects;
create policy "project_files_select_authenticated"
on storage.objects for select
to authenticated
using (bucket_id = 'project-files');

drop policy if exists "project_files_insert_authenticated" on storage.objects;
create policy "project_files_insert_authenticated"
on storage.objects for insert
to authenticated
with check (bucket_id = 'project-files');

drop policy if exists "project_files_update_authenticated" on storage.objects;
create policy "project_files_update_authenticated"
on storage.objects for update
to authenticated
using (bucket_id = 'project-files');

drop policy if exists "project_files_delete_authenticated" on storage.objects;
create policy "project_files_delete_authenticated"
on storage.objects for delete
to authenticated
using (bucket_id = 'project-files');
