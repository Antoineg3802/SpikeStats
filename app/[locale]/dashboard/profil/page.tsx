"use client";

import DashboardPage from "@/components/pages/DashboardPage";
import { useSession } from "next-auth/react";
import { getFullProfil } from "@/lib/action/users/user.action";
import { useEffect, useState } from "react";
import { UserFullProfil } from "@/datas/User/user";
import Loader from "@/components/atoms/Loader";
import DashboardPageTitle from "@/components/atoms/Titles/DashboardPageTitle";
import ProfilLine from "@/components/molecules/ProfilLine";
import InvoiceExcerpt from "@/components/molecules/InvoiceExcerpt";
import Image from "next/image";
import { Session } from "@/datas/session";

export default function Page() {
	const session = useSession().data as Session | null;
	const [isLoading, setIsLoading] = useState(true);
	const [profil, setProfil] = useState<UserFullProfil | null | undefined>(
		null
	);

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
							<div className="w-full overflow-auto p-4">
								<DashboardPageTitle title="Votre profil" />
								<ProfilLine subtitle="Photo de profil" >
									<Image className="rounded-lg" height={80} width={80} src={session?.user?.image || "/img/defaultProfilePicture.png"} alt="" />
								</ProfilLine>
								<ProfilLine subtitle="Nom" isModifiable>
									<p className="py-1 px-2 rounded-lg" contentEditable="true">{session?.user?.name}</p>
								</ProfilLine>
								<ProfilLine subtitle="Addresse e-mail" isModifiable>
									<p className="py-1 px-2 rounded-lg" contentEditable="true">{session?.user?.email}</p>
								</ProfilLine>
								<InvoiceExcerpt invoices={profil.invoices}/>
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
