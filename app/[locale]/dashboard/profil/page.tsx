"use client";

import DashboardPage from "@/components/pages/DashboardPage";
import { useSession } from "next-auth/react";
import { getFullProfil } from "@/lib/action/users/user.action";
import { useEffect, useState } from "react";
import { UserFullProfil } from "@/datas/User/user";

export default function Page() {
	const { data: session } = useSession();
	const [isLoading, setIsLoading] = useState(true);
	const [profil, setProfil] = useState<UserFullProfil | null>(null);

	useEffect(() => {
		getFullProfil().then((response) => {
			let parsedProfil: UserFullProfil | undefined | null = response?.data;
			setIsLoading(false);
            setProfil(parsedProfil);
		});
	}, [!profil]);

	return (
		<DashboardPage session={session}>
			{isLoading ? (
				<div className="animate-spin">Loading...</div>
			) : (
				<div>
                    {profil ? (
                        <div>
                            <h1>{profil.customer.name}</h1>
                            <h2>{profil.customer.email}</h2>
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
                </div>
			)}
		</DashboardPage>
	);
}
