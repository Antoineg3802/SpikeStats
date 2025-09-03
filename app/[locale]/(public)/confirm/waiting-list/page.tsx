import { Button } from "@/components/ui/button";
import { confirmWaintingList } from "@/lib/action/wainingList/waiting-list.action";
import Link from "next/link";

interface PageProps {
	searchParams: Promise<{
		token: string;
		email: string;
	}>;
}

export default async function page({ searchParams }: PageProps) {
	const { token, email } = await searchParams;
	if (!token && !email && token !== "" && email !== "") {
		throw new Error("");
	}

	let isConfirmed = await confirmWaintingList({ token, email });
	if (isConfirmed && isConfirmed.data && isConfirmed.data.success) {
		return (
			<div className="p-6 text-center my-auto">
				<h1 className="text-2xl font-bold">✅ Confirmation réussie</h1>
				<p className="mt-2">
					Merci, votre email <strong>{email}</strong> a bien été
					confirmé.
				</p>
				<p>
					Nous vous tiendrons informé des dernières mis à
					jour/lancement de{" "}
					<span className="text-primary font-bold">SPIKE-STATS</span>
				</p>
				<Button asChild className="mt-3">
					<Link href="/">Retourner à l'accueil</Link>
				</Button>
			</div>
		);
	} else {
		return (
			<div className="p-6 text-center my-auto">
				<h1 className="text-2xl font-bold">
					❌ Erreur de confirmation
				</h1>
				<p className="mt-2">
					Une erreur est survenue lors de la confirmation de votre
					email <strong>{email}</strong>.
				</p>
				<p>
					Veuillez réessayer ou contacter le support si le problème
					persiste.
				</p>
				<Button asChild className="mt-3">
					<Link href="/">Retourner à l'accueil</Link>
				</Button>
			</div>
		);
	}
}
