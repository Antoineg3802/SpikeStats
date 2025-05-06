#!/bin/sh

if [ ! -d "node_modules" ]; then
  pnpm install --frozen-lockfile
fi

until pg_isready -h postgres -p $POSTGRES_PORT -U "$POSTGRES_USER"; do
  echo "↪️ En attente de PostgreSQL..."
  sleep 2
done

if [ -f "prisma/schema.prisma" ]; then
  pnpm prisma generate
fi

if [ "$NODE_ENV" = "production" ] && [ ! -d ".next" ]; then
  pnpm build
fi

exec "$@"