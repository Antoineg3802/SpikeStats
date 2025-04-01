"use client"

import Loader from "@/components/atoms/Loader";
import DashboardPageTitle from "@/components/atoms/Titles/DashboardPageTitle";
import DashboardSubtitle from "@/components/atoms/Titles/DashboardSubtitle";
import InvoiceTable from "@/components/organisms/InvoiceTable";
import DashboardPage from "@/components/pages/DashboardPage";
import { Button } from "@/components/ui/button";
import { Session } from "@/datas/session";
import { UserFullProfil } from "@/datas/User/user";
import { cancelSubscription, updateSubscription, stripeProductsClient } from "@/lib/action/stripe/stripe.action";
import { getFullProfil } from "@/lib/action/users/user.action";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import Stripe from "stripe";

export default function Page() {
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(true);
    const [profil, setProfil] = useState<UserFullProfil | null | undefined>(
        null
    );
    const isMounted = useRef(false);
    const parsedSession = session as Session;
    const [products, setProducts] = useState<Stripe.Product[]>([]);

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

    return (
        <DashboardPage session={session}>
            <div className="h-full w-full flex align-middle">
                {isLoading ? (
                    <Loader />
                ) : (
                    (profil && profil.customer && !profil.customer.deleted) ? (
                        <div className="w-full overflow-auto">
                            <DashboardPageTitle title="Facturation et abonnement" />
                            <div className="w-full mb-4">
                                <DashboardSubtitle subtitle="Abonnement" />
                                <div className="h-max w-full flex gap-3 items-stretch">
                                    {products.map((product, index) => {
                                        let price = product.default_price as Stripe.Price;
                                        let priceAmount = price.unit_amount ? price.unit_amount / 100 : "Indisponible";
                                        return (
                                            <div key={index} className="w-1/3 p-6 border shadow-md flex flex-col gap-2 justify-between rounded-lg">
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
                                                    <Button variant="destructive" onClick={() => {
                                                        let confirmAnulation: boolean = confirm("Voulez-vous vraiment résilier votre abonnement ?");
                                                        if (confirmAnulation) {
                                                            // cancelSubscription({subscriptionId: profil.customer}).then((response)=>{
                                                            console.log('cancel')
                                                            // })
                                                        } else {
                                                            console.log('no cancel')
                                                        }
                                                    }}>
                                                        Annuler mon abonnement
                                                    </Button>
                                                ) : (
                                                    <Button variant="default"
                                                        onClick={(e) => updateSubscription({ priceId: price.id, userPlan: product.metadata.userPlan })}>
                                                        Changer d'abonnement
                                                    </Button>
                                                )
                                                }
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