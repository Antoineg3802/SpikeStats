"use client"

import Loader from "@/components/atoms/Loader";
import DashboardPageTitle from "@/components/atoms/Titles/DashboardPageTitle";
import DashboardSubtitle from "@/components/atoms/Titles/DashboardSubtitle";
import InvoiceTable from "@/components/organisms/InvoiceTable";
import DashboardPage from "@/components/pages/DashboardPage";
import { Button } from "@/components/ui/button";
import { Session } from "@/datas/session";
import { UserFullProfil } from "@/datas/User/user";
import { updateSubscription, stripeProductsClient, getPreviewSubscription, deleteCurrentStripeSubscription } from "@/lib/action/stripe/stripe.action";
import { getFullProfil } from "@/lib/action/users/user.action";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import Stripe from "stripe";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

export default function Page() {
	const session = useSession().data as Session | null;
	const [isLoading, setIsLoading] = useState(true);
	const [profil, setProfil] = useState<UserFullProfil | null | undefined>(
		null
	);
	const isMounted = useRef(false);
	const parsedSession = session as Session;
	const [products, setProducts] = useState<Stripe.Product[]>([]);

	const [previewSubscription, setPreviewSubscription] = useState<Stripe.Invoice | null>(null);

	useEffect(() => {
		if (isMounted.current) return;
		isMounted.current = true;
		const fetchData = async () => {
			const [fullProfil, allProducts] = await Promise.all([
				getFullProfil(),
				stripeProductsClient()
			]);

			if (!fullProfil) {
				return;
			} else {
				let parsedProfil: UserFullProfil | undefined | null =
					fullProfil?.data;
				let parsedProducts: Stripe.Product[] | undefined = allProducts?.data?.products;
				setProfil(parsedProfil);
				setProducts(parsedProducts ? parsedProducts : []);
				setIsLoading(false);
			}
		}
		fetchData();
	}, []);

	const handlePreviewSubscriptionClick = async (priceId: string) => {
		const response = await getPreviewSubscription({ priceId });
		let data = response?.data as Stripe.Invoice;

		if (!data) {
			return
		}

		setPreviewSubscription(data);
	}

	return (
		<DashboardPage session={session}>
			<div className="h-full w-full flex align-middle">
				{isLoading ? (
					<Loader />
				) : (
					(profil && profil.customer && !profil.customer.deleted) ? (
						<div className="w-full overflow-auto p-4">
							<DashboardPageTitle title="Facturation et abonnement" />
							<div className="w-full mb-4">
								<DashboardSubtitle subtitle="Abonnement" />
								<div className="h-max w-full flex gap-3 items-stretch">
									{products.map((product, index) => {
										let price = product.default_price as Stripe.Price;
										let priceAmount = price.unit_amount ? price.unit_amount / 100 : "Indisponible";
										return (
											<div key={index} className="w-1/3 p-6 border shadow-md flex flex-col gap-2 justify-between rounded-lg">
												<AlertDialog>
													<h4>{product.name}</h4>
													<div>
														<p><span className="text-primary text-xl font-semibold">{priceAmount}€</span>/{price.recurring?.interval === "month"
															? "mois"
															: price.recurring?.interval === "year"
																? "année"
																: ""}</p>
														<p>{product.description}</p>
													</div>
													{parsedSession.user.subscription?.active && parsedSession.user.subscription?.productId == product.id ? (
														<>
															<AlertDialogContent>
																<AlertDialogHeader>
																	<AlertDialogTitle>Êtes vous vraiment sûr ?</AlertDialogTitle>
																	<AlertDialogDescription>
																		Cette action ne pourras pas être annulée.
																		Cela résiliera votre abonnement.
																	</AlertDialogDescription>
																</AlertDialogHeader>
																<AlertDialogFooter>
																	<AlertDialogCancel>Annuler</AlertDialogCancel>
																	<AlertDialogAction onClick={() => {
																		deleteCurrentStripeSubscription()
																	}}>Continuer</AlertDialogAction>
																</AlertDialogFooter>
															</AlertDialogContent>
															<AlertDialogTrigger asChild>
																<Button variant="destructiveOutline">
																	Annuler mon abonnement
																</Button>
															</AlertDialogTrigger>
														</>
													) : (
														<>
															<AlertDialogContent>
																<AlertDialogHeader>
																	<AlertDialogTitle>Voulez-vous vraiment change d'abonnement ?</AlertDialogTitle>
																	<AlertDialogDescription>
																		Cette action ne pourras pas être annulée et cela changera automatiquement le montant de la prochaine échéance à <span className="text-primary">{previewSubscription ? previewSubscription.total/100 : "0"} €</span><br />
																		{price.recurring?.interval === "year" && "Sachez qu'un abonement d'un an sera débité en une fois et implique un engagement d'un an,  vous ne pourrez pas être remboursé."}
																	</AlertDialogDescription>
																</AlertDialogHeader>
																<AlertDialogFooter>
																	<AlertDialogCancel>Annuler</AlertDialogCancel>
																	<AlertDialogAction onClick={() => updateSubscription({ priceId: price.id, userPlan: product.metadata.userPlan })}
																	>Continuer</AlertDialogAction>
																</AlertDialogFooter>
															</AlertDialogContent>
															<AlertDialogTrigger asChild>
																<Button variant="default" onClick={() => handlePreviewSubscriptionClick(price.id)}>
																	Changer d'abonnement
																</Button>
															</AlertDialogTrigger>
														</>
													)
													}
												</AlertDialog>
											</div>
										)
									})}
								</div>
							</div>
							<InvoiceTable invoices={profil.invoices} />
						</div>
					) : (<p>Vous n'etes pas connecté</p>)
				)}
			</div>
		</DashboardPage>
	);
}