# BOILER TEMPLATE
Template d'API Rest pour NodeJS 

## Installation

### Exigences
- NodeJs : >v18.18.0
- Docker
- NPM : >9.7.2

### Process d'installation
- Clonez le repository `https://github.com/Antoineg3802/starter-template-nodejs.git`
- Aller dans le dossier ``boiler-template`` du projet.
- Executer la commande `npm i` afin d'installer les dependances. 
- Créez un fichier .env à partir du fichier .env.exemple en modifiant les variables selon vos besoins.
- Executez la commande `docker compose up` afin de créer un container ayant tout ce que l'on a besoin.
- Deux commandes sont à disposition : 
    - `npm start` afin de démarrer le serveur
    - `npm run dev` afin de démarrer le serveur en mode dev et permet de reload le serveur à chaque modification d'un fichier
    - `npm test` afin d'utiliser la librairie Jest afin de tester les routes

### Vous voilà prêt !