import LocaleSelector from "@/components/atoms/LocaleSelector";
import Navbar from "@/components/organisms/Navbar";
import { auth } from "@/lib/auth/auth";
import Image from "next/image";

export default async function Home() {
	const session = await auth()

	return (
		<div>
			<Navbar session={session} />
			<LocaleSelector />
			<Image src={"/img/defaultProfilePicture.png"} alt={""} width={32} height={32}/>
		</div>
	);
}

// TODO: Ajout de la landing page en ajoutant les infos suivantes pour le wording SEO (source prompt gemini sur 'Gestionnaire de statistiques, organisation de l'équipe et planification de matchs')
// 1. Gestion des statistiques : l'analyse pour la performance

// Collecte de données :
// Identifiez les statistiques clés pertinentes pour votre sport (ex : buts, passes décisives, temps de possession, etc.).
// Utilisez des outils de suivi (applications, logiciels, feuilles de calcul) pour collecter ces données pendant les matchs et les entraînements.
// Impliquez les membres de l'équipe dans la collecte de données pour une analyse plus complète.
// Analyse et interprétation :
// Transformez les données brutes en informations exploitables (ex : taux de réussite, tendances, points forts et faibles).
// Utilisez des visualisations (graphiques, tableaux) pour faciliter la compréhension des statistiques.
// Identifiez les domaines d'amélioration individuels et collectifs.
// Utilisation pour la prise de décision :
// Ajustez les stratégies et les tactiques en fonction des statistiques analysées.
// Personnalisez les entraînements pour cibler les points faibles identifiés.
// Utilisez les statistiques pour évaluer les performances des joueurs et prendre des décisions éclairées sur la composition de l'équipe.
// 2. Organisation de l'équipe : cohésion et efficacité

// Communication claire et efficace :
// Établissez des canaux de communication clairs (ex : applications de messagerie, réunions régulières).
// Assurez-vous que les informations importantes (horaires, lieux, changements) sont communiquées à tous les membres de l'équipe.
// Encouragez la communication ouverte et le feedback constructif.
// Gestion des rôles et responsabilités :
// Définissez clairement les rôles de chaque membre de l'équipe (joueurs, entraîneurs, personnel de soutien).
// Attribuez des responsabilités spécifiques à chaque rôle.
// Favorisez la collaboration et le soutien mutuel.
// Création d'un esprit d'équipe :
// Organisez des activités de team building pour renforcer la cohésion.
// Célébrez les succès et apprenez des échecs en équipe.
// Créez un environnement positif et inclusif.
// Outils de gestion d'équipe:
// SportEasy
// MonClubSportif
// Teampulse
// 3. Planification des matchs : préparation et stratégie

// Planification logistique :
// Établissez un calendrier de matchs clair et communiquez-le à l'équipe.
// Organisez le transport, l'hébergement et les repas si nécessaire.
// Préparez les équipements et les fournitures nécessaires.
// Préparation stratégique :
// Analysez les forces et les faiblesses de l'équipe adverse.
// Développez des stratégies et des tactiques adaptées à chaque match.
// Organisez des séances d'entraînement spécifiques pour préparer les matchs.
// Gestion des performances pendant les matchs :
// Surveillez les performances des joueurs et ajustez les stratégies si nécessaire.
// Communiquez clairement les instructions et les encouragements.
// Analysez les performances après le match pour identifier les domaines d'amélioration.
// Outils et technologies utiles :

// Applications de gestion d'équipe (SportEasy, MonClubSportif, Teampulse)
// Logiciels d'analyse de données sportives
// Outils de communication en ligne (messagerie, visioconférence)
// En combinant une gestion efficace des statistiques, une organisation d'équipe solide et une planification de matchs stratégique, vous pouvez maximiser les performances de votre équipe et atteindre vos objectifs.