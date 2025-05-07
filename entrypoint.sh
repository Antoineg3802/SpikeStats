#!/bin/sh

pnpm install --frozen-lockfile

until pg_isready -h postgres -p $POSTGRES_PORT -U "$POSTGRES_USER"; do
  echo "↪️ En attente de PostgreSQL..."
  sleep 2
done

pnpm dlx prisma migrate deploy
pnpm prisma generate

if [ "$NODE_ENV" = "production" ]; then
  pnpm build
fi

exec "$@"