import { Metadata } from "next";
import { CheckCircle } from "lucide-react";
import { EarlyAccessForm } from "@/components/organisms/EarlyAccessForm";

export const metadata: Metadata = {
	title: "Bientôt disponible – Spike-Stats",
	description:
		"Notre site est en cours de construction. Restez à l'écoute pour découvrir nos solutions innovantes pour le volleyball.",
};

export default function EarlyAccessPage() {
	return (
		<main className="flex-1 flex items-center justify-center m-auto">
			<div className="max-w-2xl text-center space-y-10">
				<h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary">
					Bientôt disponible
				</h1>
				<p className="text-muted-foreground text-lg">
					Notre site est en cours de construction. Restez à l'écoute
					pour découvrir nos solutions innovantes pour le volleyball.
				</p>

				{/* Features */}
				<section className="space-y-6">
					<h2 className="text-2xl font-semibold">
						Fonctionnalités à venir
					</h2>
					<ul className="grid gap-3 text-left">
						<li className="flex items-start gap-2">
							<CheckCircle className="h-5 w-5 shrink-0" />
							<span>Analyse avancée des performances.</span>
						</li>
						<li className="flex items-start gap-2">
							<CheckCircle className="h-5 w-5 shrink-0" />
							<span>Outils de planification d'équipe.</span>
						</li>
						<li className="flex items-start gap-2">
							<CheckCircle className="h-5 w-5 shrink-0" />
							<span>
								Statistiques en temps réel pendant les matchs.
							</span>
						</li>
					</ul>
				</section>

				{/* Subscribe */}
				<section id="subscribe" className="space-y-6">
					<h2 className="text-2xl font-semibold">
						Inscrivez-vous pour être informé
					</h2>
					<p className="text-muted-foreground">
						Soyez le premier à découvrir nos fonctionnalités et à
						recevoir des mises à jour sur notre lancement.
					</p>

					{/* Form seulement sur le client */}
					<EarlyAccessForm />
				</section>
			</div>
		</main>
	);
}
