import { Button } from "@/components/ui/button";
import { confirmWaintingList } from "@/lib/action/wainingList/waiting-list.action";
import Link from "next/link";

interface PageProps {
	searchParams: {
		token: string;
		email: string;
	};
}

export default async function page({ searchParams }: PageProps) {
	const { token, email } = await searchParams
	if (!token && !email && token !== "" && email !== "") {
		throw new Error("");
	}

    confirmWaintingList({ token, email });

	return (
		<div className="p-6 text-center">
			<h1 className="text-2xl font-bold">✅ Confirmation réussie</h1>
			<p className="mt-2">
				Merci, votre email <strong>{email}</strong> a bien été confirmé.
			</p>
            <Button asChild>
                <Link href="/">Retourner à l'accueil</Link>
            </Button>
		</div>
	);
}
