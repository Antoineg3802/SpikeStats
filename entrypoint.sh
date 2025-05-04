#!/bin/sh
until pg_isready -h postgres -p $POSTGRES_PORT -U "$POSTGRES_USER"; do
  echo "↪️ En attente de PostgreSQL..."
  sleep 2
done
echo "✅ PostgreSQL est prêt. Lancement du build..."

pnpm build

exec "$@"