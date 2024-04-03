# BOILER TEMPLATE
Template d'API Rest pour NodeJS 

## Installation

### Exigences
- NodeJs : >v18.18.0
- Docker
- NPM : >9.7.2

### Process d'installation
- Clonez le repository
- Aller dans le dossier ``fullstack-typescript-project`` du projet.
#### Processus Backend : 
- Executez la commande `docker compose up` afin de créer un container contenant la BDD et le panel d'administration PHPMYADMIN.
- Créez un fichier .env à partir du fichier .env.local en modifiant les variables selon vos besoins.
- Executer la commande `npm i` afin d'installer les dependances.

#### Processus Frontend
- Executer la commande `cd client` pour se rendre dans le côté frontEnd du server.
- Executer la commande `npm run build` afin de compiler le client (utilisé pour l'appli en mode production).
- Commandes à votre disposition (**executables seulement depuis la racine du projet**) : 
    - `npm start` : lance l'application en mode production
    - `npm run dev` : lance l'application en mode developpement (Back et Front)
    - `npm run dev-server` : lance le back de l'application
    - `npm run dev-client` : lance le front de l'application

### Vous voilà prêt !
