import LocaleSelector from "@/components/atoms/LocaleSelector";
import Navbar from "@/components/organisms/Navbar";
import { auth } from "@/lib/auth/auth";
import { Metadata } from "next";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
	title: "Optimisez la performance de votre équipe sportive",
	description:
		"Découvrez comment maximiser les performances de votre équipe avec une gestion efficace des statistiques, une organisation solide et une planification stratégique des matchs.",
	keywords: "sport, statistiques, gestion d'équipe, planification des matchs, performance sportive, SportEasy, MonClubSportif, Teampulse",
	openGraph: {
		title: "Optimisez la performance de votre équipe sportive",
		description:
			"Maximisez les performances de votre équipe grâce à des outils et stratégies de gestion des statistiques, d'organisation d'équipe et de planification des matchs.",
		url: process.env.NEXTAUTH_URL,
		type: "website",
		images: ["/images/og-image.jpg"],
	},
};


export default async function Home() {
	const session = await auth()

	return (
		<main className="bg-gray-50">
			<Navbar session={session} />
			<div className="text-center py-16 px-4">
				<h1 className="text-4xl font-bold mb-4">
					Maximisez la performance de votre équipe sportive
				</h1>
				<p className="text-lg text-gray-700 max-w-2xl mx-auto">
					Une approche complète pour booster vos performances grâce à une gestion optimisée des statistiques, une organisation d'équipe efficace et une planification stratégique des matchs.
				</p>
				<div className="mt-8">
					<Button variant="default">Découvrez nos solutions</Button>
				</div>
			</div>

			{/* Section 1 : Gestion des statistiques */}
			<section id="gestion-statistiques" className="container mx-auto px-4 py-12">
				<Card className="mb-8 shadow">
					<CardHeader>
						<CardTitle className="text-2xl font-semibold">
							Gestion des statistiques : l'analyse pour la performance
						</CardTitle>
					</CardHeader>
					<CardContent>
						<h3 className="text-xl font-medium mt-4">Collecte de données</h3>
						<ul className="list-disc ml-6 mt-2 text-gray-700">
							<li>Identifiez les statistiques clés pertinentes pour votre sport (ex : buts, passes décisives, temps de possession, etc.).</li>
							<li>Utilisez des outils de suivi (applications, logiciels, feuilles de calcul) pour collecter ces données pendant les matchs et les entraînements.</li>
							<li>Impliquez les membres de l'équipe dans la collecte de données pour une analyse plus complète.</li>
						</ul>
						<h3 className="text-xl font-medium mt-4">Analyse et interprétation</h3>
						<ul className="list-disc ml-6 mt-2 text-gray-700">
							<li>Transformez les données brutes en informations exploitables (ex : taux de réussite, tendances, points forts et faibles).</li>
							<li>Utilisez des visualisations (graphiques, tableaux) pour faciliter la compréhension des statistiques.</li>
							<li>Identifiez les domaines d'amélioration individuels et collectifs.</li>
						</ul>
						<h3 className="text-xl font-medium mt-4">Utilisation pour la prise de décision</h3>
						<ul className="list-disc ml-6 mt-2 text-gray-700">
							<li>Ajustez les stratégies et les tactiques en fonction des statistiques analysées.</li>
							<li>Personnalisez les entraînements pour cibler les points faibles identifiés.</li>
							<li>Utilisez les statistiques pour évaluer les performances des joueurs et prendre des décisions éclairées sur la composition de l'équipe.</li>
						</ul>
					</CardContent>
				</Card>
			</section>

			{/* Section 2 : Organisation de l'équipe */}
			<section id="organisation-equipe" className="container mx-auto px-4 py-12">
				<Card className="mb-8 shadow">
					<CardHeader>
						<CardTitle className="text-2xl font-semibold">
							Organisation de l'équipe : cohésion et efficacité
						</CardTitle>
					</CardHeader>
					<CardContent>
						<h3 className="text-xl font-medium mt-4">Communication claire et efficace</h3>
						<ul className="list-disc ml-6 mt-2 text-gray-700">
							<li>Établissez des canaux de communication clairs (ex : applications de messagerie, réunions régulières).</li>
							<li>Assurez-vous que les informations importantes (horaires, lieux, changements) sont communiquées à tous les membres de l'équipe.</li>
							<li>Encouragez la communication ouverte et le feedback constructif.</li>
						</ul>
						<h3 className="text-xl font-medium mt-4">Gestion des rôles et responsabilités</h3>
						<ul className="list-disc ml-6 mt-2 text-gray-700">
							<li>Définissez clairement les rôles de chaque membre de l'équipe (joueurs, entraîneurs, personnel de soutien).</li>
							<li>Attribuez des responsabilités spécifiques à chaque rôle.</li>
							<li>Favorisez la collaboration et le soutien mutuel.</li>
						</ul>
						<h3 className="text-xl font-medium mt-4">Création d'un esprit d'équipe</h3>
						<ul className="list-disc ml-6 mt-2 text-gray-700">
							<li>Organisez des activités de team building pour renforcer la cohésion.</li>
							<li>Célébrez les succès et apprenez des échecs en équipe.</li>
							<li>Créez un environnement positif et inclusif.</li>
						</ul>
						<h3 className="text-xl font-medium mt-4">Outils de gestion d'équipe</h3>
						<p className="text-gray-700 mt-2">SportEasy, MonClubSportif, Teampulse</p>
					</CardContent>
				</Card>
			</section>

			{/* Section 3 : Planification des matchs */}
			<section id="planification-matchs" className="container mx-auto px-4 py-12">
				<Card className="mb-8 shadow">
					<CardHeader>
						<CardTitle className="text-2xl font-semibold">
							Planification des matchs : préparation et stratégie
						</CardTitle>
					</CardHeader>
					<CardContent>
						<h3 className="text-xl font-medium mt-4">Planification logistique</h3>
						<ul className="list-disc ml-6 mt-2 text-gray-700">
							<li>Établissez un calendrier de matchs clair et communiquez-le à l'équipe.</li>
							<li>Organisez le transport, l'hébergement et les repas si nécessaire.</li>
							<li>Préparez les équipements et les fournitures nécessaires.</li>
						</ul>
						<h3 className="text-xl font-medium mt-4">Préparation stratégique</h3>
						<ul className="list-disc ml-6 mt-2 text-gray-700">
							<li>Analysez les forces et les faiblesses de l'équipe adverse.</li>
							<li>Développez des stratégies et des tactiques adaptées à chaque match.</li>
							<li>Organisez des séances d'entraînement spécifiques pour préparer les matchs.</li>
						</ul>
						<h3 className="text-xl font-medium mt-4">Gestion des performances pendant les matchs</h3>
						<ul className="list-disc ml-6 mt-2 text-gray-700">
							<li>Surveillez les performances des joueurs et ajustez les stratégies si nécessaire.</li>
							<li>Communiquez clairement les instructions et les encouragements.</li>
							<li>Analysez les performances après le match pour identifier les domaines d'amélioration.</li>
						</ul>
						<h3 className="text-xl font-medium mt-4">Outils et technologies utiles</h3>
						<p className="text-gray-700 mt-2">
							Applications de gestion d'équipe (SportEasy, MonClubSportif, Teampulse), logiciels d'analyse de données sportives, outils de communication en ligne (messagerie, visioconférence)
						</p>
					</CardContent>
				</Card>
			</section>
			<LocaleSelector />
			<Image src={"/img/defaultProfilePicture.png"} alt={""} width={32} height={32} />
		</main>
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