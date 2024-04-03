import { css } from "@emotion/css";

import SecondaryTitle from "../atoms/titles/SecondaryTitle";
import ThirdTitle from "../atoms/titles/ThirdTitle";
import HomepageContent from "../organisms/HomepageContent";
import Navbar from "../organisms/Navbar";
import ContentList from "../molecules/ContentList";
import ContentLink from "../atoms/content/ContentLink";
import ContentText from "../atoms/content/ContentText";

const HomePage = () => {
    return (
        <div className={style}>
            <Navbar />
            <HomepageContent>
                <SecondaryTitle text="Bienvenue sur SpikeStats" />
                <ContentText>L'analyse de performance révolutionnaire pour le volley.</ContentText>

                <ContentText>
                    SpikeStats révolutionne la manière dont les joueurs, entraîneurs, et fans de volley-ball accèdent et interprètent les données de jeu. 
                    Avec une interface intuitive et des outils d'analyse puissants, SpikeStats offre une vision complète des performances sur le terrain.
                </ContentText>

                <SecondaryTitle text="Caractéristiques Principales : " />
                <ContentList>
                    <li><strong>Analyse de Performance en Temps Réel :</strong> Suivez chaque point, chaque faute, et chaque succès avec précision au fil du match.</li>
                    <li><strong>Statistiques Détailées par Joueur :</strong> Découvrez les points forts et les axes d'amélioration pour chaque membre de l'équipe.</li>
                    <li><strong>Visualisations Impactantes :</strong> Comprenez les tendances et les patterns grâce à des graphiques et des visualisations claires.</li>
                    <li><strong>Gestion de Match Facile :</strong> Ajoutez et gérez des matchs, des sets, et des statistiques spécifiques avec quelques clics.</li>
                    <li><strong>Collaboration d'Équipe :</strong> Partagez les insights et les analyses avec l'ensemble de l'équipe pour une stratégie gagnante.</li>
                </ContentList>
                <SecondaryTitle text="Pourquoi SpikeStats ?" />
                <ContentText>
                    Dans le sport d'aujourd'hui, la différence entre la victoire et la défaite réside souvent dans les détails. 
                    SpikeStats apporte ces détails au premier plan, permettant à tous, des entraîneurs chevronnés aux fans passionnés, de plonger 
                    profondément dans les mécanismes du jeu. Que vous cherchiez à améliorer la stratégie de l'équipe, à analyser les performances des joueurs, 
                    ou simplement à apprécier le jeu à un niveau plus profond, SpikeStats est l'outil qu'il vous faut.
                </ContentText>

                <ThirdTitle text="Commencez avec SpikeStats !" />
                <ContentText>Prêt à transformer votre jeu ? Rejoignez la révolution SpikeStats aujourd'hui !</ContentText>
                <ThirdTitle text="Contactez-nous :" />
                <ContentText>Pour en savoir plus sur SpikeStats et comment il peut bénéficier à votre équipe, contactez-nous à <ContentLink href="mailto:antoineg3802@gmail.com" text="antoineg3802@gmail.com" /></ContentText>.
                <ContentText>Vous etes interressé ? Rendez-vous sur la page <ContentLink text="pricing" href="/pricing" /></ContentText>
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