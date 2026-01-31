# PR 006 – Brique 4: k0 Brainstorming Lab (V1)

Objectif:
- Implémenter l’espace de coworking cognitif k0 (experts canoniques, ingestion multi-source, cortex live, artefacts).

Changements clés:
- Experts V1 canoniques (ideation/challenger/projection/structuration) côté API et UI.
- Ingestion:
  - Texte (existant)
  - Lien: POST /api/k0/ingest/link
  - Fichiers (mock V1): POST /api/k0/ingest/file
- Cortex live preview: génération de nœuds (idea/question/hypothesis/constraint) depuis les interactions.
- Export artefacts: POST /api/k0/artifacts/export → data/k0/<project>/<session>/{cortex_k0.json,k0_session.log,k0_summary.md}
- UI mise à jour: ExpertSelector (état actif/inactif + rôle), ChatPanel (lien + dropzone), CortexPreview (nœuds), orchestration ClientRoot.

Preuve build:
- `npm run build` OK.

Notes:
- Ingestion fichiers: mock (métadonnées), pas de stockage binaire V1.
- Les tables Supabase doivent exister pour l’insertion (k0_ingestions, etc.).

Branche:
- br/brick-3-ux-signature-v1_1 (inclut la livraison Brique 3 et Brique 4)
