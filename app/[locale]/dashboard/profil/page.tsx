"use client";

import DashboardPage from "@/components/pages/DashboardPage";
import { useSession } from "next-auth/react";
import { getFullProfil } from "@/lib/action/users/user.action";
import { useEffect, useState } from "react";
import { UserFullProfil } from "@/datas/User/user";
import ProfilSeparator from "@/components/atoms/ProfilSeparator";
import Loader from "@/components/atoms/Loader";

export default function Page() {
	const { data: session } = useSession();
	const [isLoading, setIsLoading] = useState(true);
	const [profil, setProfil] = useState<UserFullProfil | null | undefined>(
		null
	);
	console.log(profil && profil.customer && !profil.customer?.deleted);

	useEffect(() => {
		getFullProfil().then((response) => {
			let parsedProfil: UserFullProfil | undefined | null =
				response?.data;
			setIsLoading(false);
			setProfil(parsedProfil);
		});
	}, [!profil]);

	return (
		<DashboardPage session={session}>
			<div className="h-full w-full flex align-middle">
				{isLoading ? (
					<Loader />
				) : (
					<>
						{profil &&
						profil.customer &&
						!profil.customer.deleted ? (
							<div className="w-full">
								<h1>{session?.user?.name}</h1>
								<h2>{profil.customer.email}</h2>
								<ProfilSeparator/>
								{profil.invoices.map((invoice) => (
									<div key={invoice.id}>
										<h3>{invoice.id}</h3>
										<h4>{invoice.amount_paid}</h4>
									</div>
								))}
							</div>
						) : (
							<p>Vous n'etes pas connecté</p>
						)}
					</>
				)}
			</div>
		</DashboardPage>
	);
}
