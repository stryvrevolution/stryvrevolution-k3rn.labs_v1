# Changelog

## v0.1-k0-socle (Briques 0 → 4)

- Brique 0 – Preflight & Remote Access Gate
  - Structure Kern/ (preflight, verify, patch)
  - Scripts Remote Access Gate (préflight + verify)
- Brique 1 – Cortex Core
  - Modèle et exemples de données (json/md)
- Brique 2 – k0 Skeleton
  - Next.js App Router (k0_skeleton)
  - API /api/k0/* (session/start, ingest/text, expert/chat, score, validate)
  - Partagés API (_shared), alias TS, @supabase/supabase-js
- Brique 3 – UX Signature v1_1 (k0)
  - UI orchestrée (experts, chat, score, validate)
  - Démarrage auto de session
- Brique 4 – k0 Brainstorming Lab (V1)
  - Experts canoniques (Ideation, Challenger, Projection, Structuration)
  - Ingestion lien/fichier (mock V1)
  - Cortex live preview & export artefacts (cortex_k0.json, k0_session.log, k0_summary.md)

CI & Verify:
- verify_repo.sh & verify_build.sh
- GitHub Actions: verify + build k0_skeleton (Node 20)

Notes:
- Renseigner SUPABASE_URL et SUPABASE_ANON_KEY en secrets GitHub pour le build CI.
