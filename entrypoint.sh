#!/bin/sh
# Attendre que PostgreSQL soit accessible
until pg_isready -h postgres -p $POSTGRES_PORT -U "$POSTGRES_USER"; do
  echo "↪️ En attente de PostgreSQL..."
  sleep 2
done
echo "✅ PostgreSQL est prêt. Lancement du build..."

rm -f /app/.env.production

pnpm build

exec "$@"