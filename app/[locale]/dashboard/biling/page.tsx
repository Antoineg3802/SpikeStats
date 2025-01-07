"use client"

import Loader from "@/components/atoms/Loader";
import DashboardPageTitle from "@/components/atoms/Titles/DashboardPageTitle";
import DashboardPage from "@/components/pages/DashboardPage";
import { Session } from "@/datas/session";
import { UserFullProfil } from "@/datas/User/user";
import { cancelSubscription, getStripeProfil, stripeProductsClient } from "@/lib/action/stripe/stripe.action";
import { getFullProfil } from "@/lib/action/users/user.action";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Stripe from "stripe";

export default function Page() {
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(true);
    const [profil, setProfil] = useState<UserFullProfil | null | undefined>(
        null
    );
    const parsedSession = session as Session;
    const [products, setProducts] = useState<Stripe.Product[]>([]);

    useEffect(() => {
        let isMounted = true;
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

        return () => {
            isMounted = false;
        };
    }, []);

    console.log(session?.user)

    return (
        <DashboardPage session={session}>
            <div className="h-full w-full flex align-middle">
                {isLoading ? (
                    <Loader />
                ) : (
                    (profil && profil.customer && !profil.customer.deleted) ? (
                        <div className="w-full overflow-auto">
                            <DashboardPageTitle title="Votre abonnement" />
                            <h2>Facturation et abonnement</h2>
                            <div className="h-1/2 w-full">
                                <h3>Abonnement</h3>
                                <div className="h-full w-full flex gap-3 items-center">
                                    {products.map((product, index) => (
                                        <div key={index} className={"w-1/3 h-fit p-4 " + (product.metadata.userPlan === parsedSession?.user?.userPlan ? 'bg-blue' : 'bg-red')}>
                                            <h4>{product.name}</h4>
                                            <p>{product.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="h-1/2 w-full">
                                <h3>Facturation</h3>
                                <div className="h-full w-full bg-blue-400">

                                </div>
                            </div>
                            <button className="p-2 rounded-lg border-[1px] border-red-600 bg-red-200 text-red-600 hover:text-white hover:bg-red-600" onClick={(e) => {
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
                            </button>
                        </div>
                    ) : (<p>Vous n'etes pas connecté</p>)
                )}
            </div>
        </DashboardPage>
    );
}