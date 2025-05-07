FROM node:18-alpine AS base

WORKDIR /app

RUN apk add --no-cache libc6-compat postgresql-client openssl

RUN corepack enable pnpm

COPY . .

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

FROM base AS dev

ENV NODE_ENV=development \
    WATCHPACK_POLLING=true \
    PORT=3000

EXPOSE 3000
ENTRYPOINT ["/entrypoint.sh"]
CMD ["pnpm", "dev"]

FROM base AS prod

ENV NODE_ENV=production \
    PORT=3000

WORKDIR /app

EXPOSE 3000
ENTRYPOINT ["/entrypoint.sh"]
CMD ["pnpm", "start"]
