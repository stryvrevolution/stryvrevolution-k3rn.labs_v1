K0 Skeleton (Next.js App Router) pour Kern Labs.

## Prérequis

- Node 20+
- npm

## Configuration

1) Copier le fichier d’exemple d’environnement et le remplir:

```bash
cp .env.example .env.local
```

Variables attendues:

```
SUPABASE_URL=...                    # URL du projet Supabase
SUPABASE_ANON_KEY=...               # Clé anonyme Supabase
```

2) Installer les dépendances:

```bash
npm install
```

## Démarrer

Développement:

```bash
npm run dev
```

Production:

```bash
npm run build
npm run start
```

## Endpoints k0 (smoke tests)

Exemples curl (dev: http://localhost:3000):

- Start session
```bash
curl -s -X POST http://localhost:3000/api/k0/session/start \
	-H 'Content-Type: application/json' \
	-d '{"projectId":"proj_demo","startedBy":"user_demo"}'
```

- Ingest text
```bash
curl -s -X POST http://localhost:3000/api/k0/ingest/text \
	-H 'Content-Type: application/json' \
	-d '{"projectId":"proj_demo","sessionId":"sess_demo","text":"Bonjour k0","userId":"user_demo"}'
```

- Expert chat (innovation)
```bash
curl -s -X POST http://localhost:3000/api/k0/expert/chat \
	-H 'Content-Type: application/json' \
	-d '{"projectId":"proj_demo","sessionId":"sess_demo","expertId":"innovation","message":"Idées produit?","userId":"user_demo"}'
```

- Score
```bash
curl -s -X POST http://localhost:3000/api/k0/score \
	-H 'Content-Type: application/json' \
	-d '{"projectId":"proj_demo","sessionId":"sess_demo","userId":"user_demo"}'
```

- Validate
```bash
curl -s -X POST http://localhost:3000/api/k0/validate \
	-H 'Content-Type: application/json' \
	-d '{"projectId":"proj_demo","sessionId":"sess_demo","validatedBy":"user_demo"}'
```

Notes:
- Si la base Supabase n’est pas migrée, attendez-vous à des erreurs 4xx/5xx côté DB; cela prouve déjà que les routes sont actives.
- Les experts dispo: innovation, produit, critique (voir src/app/api/_shared/experts.ts).
