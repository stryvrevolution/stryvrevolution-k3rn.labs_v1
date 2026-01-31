#!/bin/bash
set -e

# Vérification Node.js
if ! command -v node &> /dev/null; then
  echo "Node.js non installé"; exit 1
fi
node -v

# Vérification npm
if ! command -v npm &> /dev/null; then
  echo "npm non installé"; exit 1
fi
npm -v

# Préparation du template de secrets
cat <<EOF > secrets.template
# secrets.template
# Remplir avec vos secrets (format clé=valeur)
API_KEY=
DB_URL=
EOF

echo "Préflight OK"
