# SpikeStats 🏐

<img align="right" width="200" height="200" src="https://github.com/Antoineg3802/SpikeStats/assets/72556223/2b398b7a-be02-44ea-9254-4c11b7d61525">


Application de gestion de statistiques de Volley (matchs). Cet outils permet de créer des matchs et de les editer en direct en notant les fautes et les points marqués par le/la joueur/joueuse. Chaque joueur/jouses possédant un compte manager peux créer une équipe et inviter des participants via un code d'invitation. Chaque joueur peux voir ses statistiques, le manager, lui, peux voir les statistiques globales de son équipe et individuellement de ses joueurs/joueuse. 

Le systeme à terme accueillera un système de souscription (abonnement afin de pouvoir utiliser l'application) sur une durée d'une saison

À améliorer  : 
- Systeme de JWT token pour renforcer la sécurité
- Ajouter le systeme de pricing
- Retravailler sur l'UX/UI de l'outil

## Installation

### Exigences
- NodeJs : >v18.18.0
- Docker
- NPM : >9.7.2

### Process d'installation
- Clonez le repository
- Aller dans le dossier du projet.
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

### Vous voilà prêt ! 🎊
