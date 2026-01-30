# Multi-tenant “Organisation” (V1)

## Décision figée
Multi-tenant organisation dès la V1.

## Implications
- Un utilisateur appartient à 1..n organisations.
- Une organisation contient 0..n projets.
- Un projet appartient à 1 organisation.
- Rôles V1 : owner / editor / viewer.

## Sécurité (direction)
- Row Level Security (RLS) côté base (Supabase).
- Les permissions se déduisent de la table membership.

## UI
- Sélecteur d’organisation (si >1).
- Gestion membres minimaliste dès V1.
