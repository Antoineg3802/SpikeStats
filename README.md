# BOILER TEMPLATE
Template d'API Rest pour NodeJS 

## Installation

### Exigences
- NodeJs : >v18.18.0
- Docker
- NPM : >9.7.2

### Process d'installation
- Aller dans le dossier ``fullstack-typescript-project`` du projet.
- Executer la commande `npm i` afin d'installer les dependances. 
- Executer la commande `cd client && npm run build` afin de compiler le client.
- Créez un fichier .env à partir du fichier .env.exemple en modifiant les variables selon vos besoins.
- Executez la commande `docker compose up` afin de créer un container contenant la BDD et le panel d'administration PHPMYADMIN.
- Deux commandes sont à disposition : 
    - `npm start` : lance l'application en mode production
    - `npm run dev` : lance l'application en mode developpement (Back et Front)
    - `npm run dev-server` : lance le back de l'application
    - `npm run dev-client` : lance le front de l'application
    - `npm run test` : execute les tests unitaires coté seveurs

### Vous voilà prêt !