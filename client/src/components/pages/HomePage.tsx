import { useEffect, useState } from "react";

import { css } from "@emotion/css";

import { User } from "../../data/User";
import { fetchUsers } from "../../service/api/userService";
import Navbar from "../organisms/Navbar";
import HomepageContent from "../organisms/HomepageContent";

const HomePage = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetchUsers()
        .then((data) => {
            setUsers(data)
        })
    }, []);

    return (
        <div className={style}>
            <Navbar />
            <HomepageContent>
                Bienvenue sur SpikeStats
                L'analyse de performance révolutionnaire pour le volley.
                Image illustrant une analyse de données de volley (Cette image serait une représentation graphique des statistiques de volley, comme des graphiques de performance ou une interface utilisateur de l'application.)

                SpikeStats révolutionne la manière dont les joueurs, entraîneurs, et fans de volley-ball accèdent et interprètent les données de jeu. Avec une interface intuitive et des outils d'analyse puissants, SpikeStats offre une vision complète des performances sur le terrain.

                Caractéristiques Principales : 
                <ul>
                    <li>Analyse de Performance en Temps Réel : Suivez chaque point, chaque faute, et chaque succès avec précision au fil du match.</li>
                    <li>Statistiques Détailées par Joueur : Découvrez les points forts et les axes d'amélioration pour chaque membre de l'équipe.</li>
                    <li>Visualisations Impactantes : Comprenez les tendances et les patterns grâce à des graphiques et des visualisations claires.</li>
                    <li>Gestion de Match Facile : Ajoutez et gérez des matchs, des sets, et des statistiques spécifiques avec quelques clics.</li>
                    <li>Collaboration d'Équipe : Partagez les insights et les analyses avec l'ensemble de l'équipe pour une stratégie gagnante.</li>
                </ul>
                Pourquoi SpikeStats ?
                Dans le sport d'aujourd'hui, la différence entre la victoire et la défaite réside souvent dans les détails. SpikeStats apporte ces détails au premier plan, permettant à tous, des entraîneurs chevronnés aux fans passionnés, de plonger profondément dans les mécanismes du jeu. Que vous cherchiez à améliorer la stratégie de l'équipe, à analyser les performances des joueurs, ou simplement à apprécier le jeu à un niveau plus profond, SpikeStats est l'outil qu'il vous faut.

                Commencez avec SpikeStats
                Prêt à transformer votre jeu ? Rejoignez la révolution SpikeStats aujourd'hui.

                Contactez-nous : Pour en savoir plus sur SpikeStats et comment il peut bénéficier à votre équipe, contactez-nous à <a href="mailto:antoineg3802@gmail.com">antoineg3802@gmail.com</a>.
                Demandez une Démonstration : Découvrez la puissance de SpikeStats en action. Demandez une démo gratuite dès maintenant.
            </HomepageContent>
        </div>
    );
}

const style = css`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    grid-template-areas: 
    "navbar content content content content"
    "navbar content content content content"
    "navbar content content content content"
    "navbar content content content content"
    "navbar content content content content";
    overflow: hidden;
    height: 100vh;
    font-family: "Nexa"
`

export default HomePage;