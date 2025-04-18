FROM node:lts

WORKDIR /app

# Installer des dépendances système
RUN apt-get update && apt-get install -y \
    libpq-dev \
    openssl \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Activer pnpm via corepack
RUN corepack enable pnpm 

# Copier package.json, pnpm-lock.yaml et .npmrc (si présent) et installer les dépendances
COPY package.json pnpm-lock.yaml .npmrc* ./
RUN pnpm install --frozen-lockfile

# Copier tout le projet
COPY . .

# Copier le script d'entrypoint et lui donner les droits
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Exposer le port de l'application
EXPOSE 3003

# Définir l'entrypoint pour que le script se lance à démarrage du conteneur.
ENTRYPOINT ["/entrypoint.sh"]

# CMD par défaut : en environnement de développement on peut lancer "pnpm dev"
# en production, on lancera plutôt "pnpm start" (après avoir fait le build via entrypoint)
CMD ["pnpm", "start"]
