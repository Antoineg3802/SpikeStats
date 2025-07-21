import { Metadata } from "next";
import { CheckCircle } from "lucide-react";
import { EarlyAccessForm } from "@/components/organisms/EarlyAccessForm";
import { getScopedI18n } from "@/locales/server";

export const metadata: Metadata = {
	title: "Bientôt disponible – Spike-Stats",
	description:
		"Notre site est en cours de construction. Restez à l'écoute pour découvrir nos solutions innovantes pour le volleyball.",
};

export default async function EarlyAccessPage() {
	const t = await getScopedI18n("pages.comingSoon");
	return (
		<main className="flex-1 flex items-center justify-center m-auto">
			<div className="max-w-2xl text-center space-y-10">
				<h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary">
					{t("title")}
				</h1>
				<p className="text-muted-foreground text-lg">
					{t("description")}
				</p>

				{/* Features */}
				<section className="space-y-6">
					<h2 className="text-2xl font-semibold">
						{t("sections.features.title")}
					</h2>
					<ul className="grid gap-3 text-left">
						<li className="flex items-start gap-2">
							<CheckCircle className="h-5 w-5 shrink-0" />
							<span>{t("sections.features.points.1")}</span>
						</li>
						<li className="flex items-start gap-2">
							<CheckCircle className="h-5 w-5 shrink-0" />
							<span>{t("sections.features.points.2")}</span>
						</li>
						<li className="flex items-start gap-2">
							<CheckCircle className="h-5 w-5 shrink-0" />
							<span>
								{t("sections.features.points.3")}
							</span>
						</li>
					</ul>
				</section>

				<section id="subscribe" className="space-y-6">
					<h2 className="text-2xl font-semibold">
						{t("sections.subscribe.title")}
					</h2>
					<p className="text-muted-foreground">
						{t("sections.subscribe.description")}
					</p>

					<EarlyAccessForm />
				</section>
			</div>
		</main>
	);
}
