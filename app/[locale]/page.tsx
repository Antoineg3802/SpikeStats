import LocaleSelector from "@/components/atoms/LocaleSelector";
import Navbar from "@/components/organisms/Navbar";
import { auth } from "@/lib/auth/auth";
import { Metadata } from "next";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
	title: "Spikestats - Outil de gestion et planification pour Volleyball",
	description:
		"Découvrez Spikestats, l'application dédiée aux clubs de volleyball, qui intègre un logiciel de gestion des statistiques, d'organisation d'équipe et de planification des matchs pour optimiser la performance de votre équipe de volleyball.",
	keywords: [
		"outil gestion statistiques volleyball",
		"logiciel organisation équipe volleyball",
		"application planification matchs volleyball",
		"gestion équipe volleyball amateur",
		"analyse performance joueurs volleyball",
		"suivi statistiques match volleyball",
		"logiciel entraîneur volleyball",
		"outil analyse vidéo volleyball",
		"plateforme gestion club volleyball",
		"calendrier matchs volleyball en ligne",
		"application mobile statistiques volleyball",
		"logiciel gestion tournoi volleyball",
		"outils numériques pour entraineur de volleyball",
		"statistiques volleyball",
		"organisation équipe",
		"planification matchs",
		"analyse performance",
		"gestion équipe",
		"entraînement volleyball",
		"logiciel sport collectif",
		"application sport",
		"outil gestion sportive",
		"calendrier sportif",
		"résultats volleyball",
		"logiciel de tournoi de volleyball",
		"logiciel statistique de volley ball",
		"application de statistique pour volley ball",
		"application pour les clubs de volley ball",
		"logiciel pour les entraineurs de volley ball"
	].join(", "),
	openGraph: {
		title: "Spikestats - Outil de gestion et planification pour Volleyball",
		description:
			"Optimisez la performance de votre équipe de volleyball grâce à Spikestats, notre application innovante qui intègre gestion des statistiques, organisation d'équipe et planification des matchs.",
		url: process.env.NEXTAUTH_URL,
		type: "website",
	},
};


export default async function Home() {
	const session = await auth()

	return (
		<main className="bg-gray-50">
			<Navbar session={session} />
			<div className="text-center py-16 px-4">
				<h1 className="text-4xl font-bold mb-4">
					Spikestats : Outil de gestion et planification pour Volleyball
				</h1>
				<p className="text-lg text-gray-700 max-w-2xl mx-auto">
					Optimisez la performance de votre équipe de volleyball grâce à Spikestats, votre solution complète pour la gestion des statistiques, l'organisation d'équipe et la planification stratégique des matchs.
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
							Gestion des statistiques : Analyse de performance
						</CardTitle>
					</CardHeader>
					<CardContent>
						<h3 className="text-xl font-medium mt-4">Collecte de données</h3>
						<ul className="list-disc ml-6 mt-2 text-gray-700">
							<li>
								Identifiez les statistiques clés du volleyball (points marqués, réceptions, passes décisives, blocs, services efficaces).
							</li>
							<li>
								Utilisez Spikestats pour collecter et suivre les données lors des matchs et des entraînements.
							</li>
							<li>
								Impliquez joueurs et staff pour une collecte de données exhaustive.
							</li>
						</ul>
						<h3 className="text-xl font-medium mt-4">Analyse et interprétation</h3>
						<ul className="list-disc ml-6 mt-2 text-gray-700">
							<li>
								Transformez les données brutes en indicateurs de performance (taux de réussite, tendances de jeu, points forts et axes d'amélioration).
							</li>
							<li>
								Utilisez des graphiques et des tableaux pour visualiser et comprendre les statistiques.
							</li>
							<li>
								Identifiez les domaines à améliorer, individuellement et collectivement.
							</li>
						</ul>
						<h3 className="text-xl font-medium mt-4">Prise de décision</h3>
						<ul className="list-disc ml-6 mt-2 text-gray-700">
							<li>
								Ajustez stratégies et tactiques en fonction des analyses.
							</li>
							<li>
								Personnalisez les entraînements pour corriger les faiblesses identifiées.
							</li>
							<li>
								Évaluez la performance des joueurs pour optimiser la composition de l’équipe.
							</li>
						</ul>
					</CardContent>
				</Card>
			</section>

			{/* Section 2 : Organisation de l'équipe */}
			<section id="organisation-equipe" className="container mx-auto px-4 py-12">
				<Card className="mb-8 shadow">
					<CardHeader>
						<CardTitle className="text-2xl font-semibold">
							Organisation de l'équipe : Cohésion et efficacité
						</CardTitle>
					</CardHeader>
					<CardContent>
						<h3 className="text-xl font-medium mt-4">Communication efficace</h3>
						<ul className="list-disc ml-6 mt-2 text-gray-700">
							<li>
								Utilisez des applications de messagerie et organisez des réunions régulières pour une communication fluide.
							</li>
							<li>
								Diffusez les informations importantes (horaires, lieux, changements) à l'ensemble de l'équipe.
							</li>
							<li>
								Encouragez un dialogue ouvert et le feedback constructif.
							</li>
						</ul>
						<h3 className="text-xl font-medium mt-4">Définition des rôles</h3>
						<ul className="list-disc ml-6 mt-2 text-gray-700">
							<li>
								Attribuez clairement les rôles et responsabilités (joueurs, entraîneurs, staff technique).
							</li>
							<li>
								Favorisez la collaboration et le soutien mutuel pour renforcer la cohésion.
							</li>
						</ul>
						<h3 className="text-xl font-medium mt-4">Esprit d'équipe</h3>
						<ul className="list-disc ml-6 mt-2 text-gray-700">
							<li>
								Organisez des activités de team building pour renforcer les liens.
							</li>
							<li>
								Célébrez les succès et apprenez des défis rencontrés en équipe.
							</li>
						</ul>
					</CardContent>
				</Card>
			</section>

			{/* Section 3 : Planification des matchs */}
			<section id="planification-matchs" className="container mx-auto px-4 py-12">
				<Card className="mb-8 shadow">
					<CardHeader>
						<CardTitle className="text-2xl font-semibold">
							Planification des matchs : Préparation et stratégie
						</CardTitle>
					</CardHeader>
					<CardContent>
						<h3 className="text-xl font-medium mt-4">Stratégie de match</h3>
						<ul className="list-disc ml-6 mt-2 text-gray-700">
							<li>
								Analysez les forces et faiblesses de l'équipe pour adapter votre stratégie.
							</li>
							<li>
								Développez des tactiques spécifiques et organisez des séances d'entraînement ciblées.
							</li>
						</ul>
						<h3 className="text-xl font-medium mt-4">Suivi en match</h3>
						<ul className="list-disc ml-6 mt-2 text-gray-700">
							<li>
								Surveillez la performance des joueurs en temps réel et ajustez la stratégie.
							</li>
							<li>
								Communiquez clairement les consignes pendant le match.
							</li>
							<li>
								Analysez les performances post-match pour identifier les axes d'amélioration.
							</li>
						</ul>
					</CardContent>
				</Card>
			</section>
			<LocaleSelector />
			<Image src={"/img/defaultProfilePicture.png"} alt={""} width={32} height={32} />
		</main>
	);
}