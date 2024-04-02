import { css } from "@emotion/css";

import Navbar from "../organisms/Navbar";
import HomepageContent from "../organisms/HomepageContent";
import SecondaryTitle from "../atoms/titles/SecondaryTitle";

const HomePage = () => {
    return (
        <div className={style}>
            <Navbar />
            <HomepageContent>
                <SecondaryTitle text="Bienvenue sur SpikeStats" />
                <p>L'analyse de performance révolutionnaire pour le volley.</p>

                <p>SpikeStats révolutionne la manière dont les joueurs, entraîneurs, et fans de volley-ball accèdent et interprètent les données de jeu. Avec une interface intuitive et des outils d'analyse puissants, SpikeStats offre une vision complète des performances sur le terrain.</p>

                <SecondaryTitle text="Caractéristiques Principales : " />
                <ul>
                    <li><strong>Analyse de Performance en Temps Réel :</strong> Suivez chaque point, chaque faute, et chaque succès avec précision au fil du match.</li>
                    <li><strong>Statistiques Détailées par Joueur :</strong> Découvrez les points forts et les axes d'amélioration pour chaque membre de l'équipe.</li>
                    <li><strong>Visualisations Impactantes :</strong> Comprenez les tendances et les patterns grâce à des graphiques et des visualisations claires.</li>
                    <li><strong>Gestion de Match Facile :</strong> Ajoutez et gérez des matchs, des sets, et des statistiques spécifiques avec quelques clics.</li>
                    <li><strong>Collaboration d'Équipe :</strong> Partagez les insights et les analyses avec l'ensemble de l'équipe pour une stratégie gagnante.</li>
                </ul>
                <SecondaryTitle text="Pourquoi SpikeStats ?" />
                <p>Dans le sport d'aujourd'hui, la différence entre la victoire et la défaite réside souvent dans les détails. SpikeStats apporte ces détails au premier plan, permettant à tous, des entraîneurs chevronnés aux fans passionnés, de plonger profondément dans les mécanismes du jeu. Que vous cherchiez à améliorer la stratégie de l'équipe, à analyser les performances des joueurs, ou simplement à apprécier le jeu à un niveau plus profond, SpikeStats est l'outil qu'il vous faut.</p>

                <h3>Commencez avec SpikeStats ! </h3>
                <p>Prêt à transformer votre jeu ? Rejoignez la révolution SpikeStats aujourd'hui.</p>
                <h3>Contactez-nous :</h3> Pour en savoir plus sur SpikeStats et comment il peut bénéficier à votre équipe, contactez-nous à <a href="mailto:antoineg3802@gmail.com">antoineg3802@gmail.com</a>.
                <p>Vous etes interressé ? Rendez-vous sur <a href="/pricing">Pricing</a></p>
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