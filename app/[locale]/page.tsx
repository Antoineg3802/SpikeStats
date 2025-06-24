import LocaleSelector from "@/components/atoms/LocaleSelector";
import { Metadata } from "next";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getScopedI18n } from "@/locales/server";

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
		"logiciel pour les entraineurs de volley ball",
	].join(", "),
	openGraph: {
		title: "Spikestats - Outil de gestion et planification pour Volleyball",
		description:
			"Optimisez la performance de votre équipe de volleyball grâce à Spikestats, notre application innovante qui intègre gestion des statistiques, organisation d'équipe et planification des matchs.",
		url: process.env.NEXTAUTH_URL,
		type: "website",
	},
};

export async function generateStaticParams() {
	return [{ locale: "fr" }, { locale: "en" }];
}

export default async function Home() {
	const t = await getScopedI18n("pages.home");
	return (
		<main>
			<section className="text-center py-16 px-4">
				<h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
				<p className="text-lg text-gray-700 max-w-2xl mx-auto">
					{t("description")}
				</p>
				<div className="mt-8">
					<Button variant="default" asChild>
						<Link href="/solutions">{t("cta")}</Link>
					</Button>
				</div>
			</section>

			<section className="container bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 mx-auto">
				<h2 className="font-bold">{t("sections.warningDev.title")}</h2>
				<p>{t("sections.warningDev.description")}</p>
				<Link
					href="/contact"
					className="text-yellow-600 hover:text-yellow-800 font-semibold"
				/>
			</section>

			{/* Section 1 : Gestion des statistiques */}
			<section
				id="gestion-statistiques"
				className="container mx-auto px-4 py-12"
			>
				<Card className="mb-8 shadow">
					<CardHeader>
						<CardTitle className="text-2xl font-semibold">
							{t("sections.stats.title")}
						</CardTitle>
					</CardHeader>
					<CardContent>
						<h3 className="text-xl font-medium mt-4">
							{t("sections.stats.data")}
						</h3>
						<ul className="list-disc ml-6 mt-2 text-gray-700">
							<li>{t("sections.stats.points.1")}</li>
							<li>{t("sections.stats.points.2")}</li>
							<li>{t("sections.stats.points.3")}</li>
						</ul>
						<h3 className="text-xl font-medium mt-4">
							{t("sections.stats.analysis")}
						</h3>
						<ul className="list-disc ml-6 mt-2 text-gray-700">
							<li>{t("sections.stats.analysisPoints.1")}</li>
							<li>{t("sections.stats.analysisPoints.2")}</li>
							<li>{t("sections.stats.analysisPoints.3")}</li>
						</ul>
						<h3 className="text-xl font-medium mt-4">
							{t("sections.stats.decision")}
						</h3>
						<ul className="list-disc ml-6 mt-2 text-gray-700">
							<li>{t("sections.stats.decisionPoints.1")}</li>
							<li>{t("sections.stats.decisionPoints.2")}</li>
							<li>{t("sections.stats.decisionPoints.3")}</li>
						</ul>
					</CardContent>
				</Card>
			</section>

			{/* Section 2 : Organisation de l'équipe */}
			<section
				id="organisation-equipe"
				className="container mx-auto px-4 py-12"
			>
				<Card className="mb-8 shadow">
					<CardHeader>
						<CardTitle className="text-2xl font-semibold">
							{t("sections.team.title")}
						</CardTitle>
					</CardHeader>
					<CardContent>
						<h3 className="text-xl font-medium mt-4">
							{t("sections.team.communication")}
						</h3>
						<ul className="list-disc ml-6 mt-2 text-gray-700">
							<li>{t("sections.team.communicationPoints.1")}</li>
							<li>{t("sections.team.communicationPoints.2")}</li>
							<li>{t("sections.team.communicationPoints.3")}</li>
						</ul>
						<h3 className="text-xl font-medium mt-4">
							{t("sections.team.roles")}
						</h3>
						<ul className="list-disc ml-6 mt-2 text-gray-700">
							<li>{t("sections.team.rolesPoints.1")}</li>
							<li>{t("sections.team.rolesPoints.2")}</li>
						</ul>
						<h3 className="text-xl font-medium mt-4">
							{t("sections.team.spirit")}
						</h3>
						<ul className="list-disc ml-6 mt-2 text-gray-700">
							<li>{t("sections.team.spiritPoints.1")}</li>
							<li>{t("sections.team.spiritPoints.2")}</li>
						</ul>
					</CardContent>
				</Card>
			</section>

			<section
				id="planification-matchs"
				className="container mx-auto px-4 py-12"
			>
				<Card className="mb-8 shadow">
					<CardHeader>
						<CardTitle className="text-2xl font-semibold">
							{t("sections.planning.title")}
						</CardTitle>
					</CardHeader>
					<CardContent>
						<h3 className="text-xl font-medium mt-4">
							{t("sections.planning.strategy")}
						</h3>
						<ul className="list-disc ml-6 mt-2 text-gray-700">
							<li>{t("sections.planning.strategyPoints.1")}</li>
							<li>{t("sections.planning.strategyPoints.2")}</li>
						</ul>
						<h3 className="text-xl font-medium mt-4">
							{t("sections.planning.live")}
						</h3>
						<ul className="list-disc ml-6 mt-2 text-gray-700">
							<li>{t("sections.planning.livePoints.1")}</li>
							<li>{t("sections.planning.livePoints.2")}</li>
							<li>{t("sections.planning.livePoints.3")}</li>
						</ul>
					</CardContent>
				</Card>
			</section>

			<LocaleSelector />
			<Image
				src={"/img/defaultProfilePicture.png"}
				alt={""}
				width={32}
				height={32}
			/>
		</main>
	);
}
