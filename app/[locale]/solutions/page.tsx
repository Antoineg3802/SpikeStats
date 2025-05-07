import Navbar from '@/components/organisms/Navbar';
import { Session } from '@/datas/session';
import { auth } from '@/lib/auth/auth';
import prisma from '@/lib/prisma/prisma';
import { stripe } from '@/lib/stripe/stripe';
import { CircleCheck } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import Stripe from 'stripe';

export default async function Page() {
    const session = await auth() as Session;
    const products = await stripe.products.list({
        active: true,
        expand: ['data.default_price'],
    });

    // order products by price reccuring interval
    const intervalOrder: { [key: string]: number } = { month: 1, year: 2 };

    // Fonction pour obtenir la valeur de l'intervalle
    const getIntervalValue = (product: Stripe.Product): number => {
        const price = product.default_price as Stripe.Price;
        const interval = price?.recurring?.interval;
        return intervalOrder[interval || ''] || 0;
    };

    // Trier les produits en utilisant les valeurs d'intervalle
    products.data.sort((a: Stripe.Product, b: Stripe.Product) => getIntervalValue(a) - getIntervalValue(b));

    return (
        <div className="h-screen flex flex-col">
            <Navbar />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-5/6 w-10/12 m-auto">
                {products.data.map((product: Stripe.Product) => {
                    const price = product.default_price as Stripe.Price | null;
                    const user = session?.user;

                    // Vérifier si le prix est valide
                    const isPriceValid = price?.unit_amount != null;

                    // Déterminer si le formulaire doit être affiché
                    const showForm =
                        session &&
                        user &&
                        (!user.subscription ||
                            user.subscription.productId !== product.id);

                    const showDisableForm = session && user && user.subscription && user.subscription.productId === product.id && user.subscription.active === true;

                    // Si le prix n'est pas valide, ne rien rendre
                    if (!isPriceValid) return null;

                    return (
                        <div
                            key={product.id}
                            className="grid text-foreground grid-rows-2 grid-cols-1 border p-6 rounded-lg shadow-md h-5/6 my-auto"
                        >
                            <div>
                                <h3 className="text-2xl text-primary font-semibold mb-4">{product.name}</h3>
                                <p className="text-foreground mb-6">{product.description}</p>
                            </div>
                            <div className="flex flex-col">
                                <p className="font-bold">
                                    <span className="text-2xl text-primary">
                                        {price.unit_amount ? price.unit_amount / 100 : ''}{" "}
                                        {price.currency.toUpperCase() === "EUR" ? "€" : "$"}
                                    </span>{" "}
                                    /{" "}
                                    {price.recurring?.interval === "month"
                                        ? "mois"
                                        : price.recurring?.interval === "year"
                                            ? "année"
                                            : ""}
                                </p>
                                <ul className="list-disc list-inside list-image-checkmark my-4">
                                    {product.marketing_features.map((feature: any, index: number) => (
                                        <li key={index}>{feature.name}</li>
                                    ))}
                                </ul>
                                {showDisableForm && (
                                    <div className='h-full flex flex-col justify-center items-center'>
                                        <div className='flex justify-center items-center'>
                                            <CircleCheck className='fill-primary text-background' />
                                            <p className="text-foreground-400 ml-2 italic text-center">
                                                Vous avez déjà ce plan
                                            </p>
                                        </div>
                                        <Link className='inline-block mx-auto mt-2 text-sm text-primary hover:underline underline-offset-2' href='/dashboard/biling'>Modifier mon abonnement</Link>
                                    </div>
                                )}
                                {showForm && (
                                    <form className='h-full flex justify-center items-center'>
                                        <button
                                            className="h-fit bg-primary text-background hover:cursor-pointer py-2 px-4 rounded hover:bg-primary/80 hover:shadow-md"
                                            formAction={async () => {
                                                "use server";
                                                if (session && !session.user?.subscription) {
                                                    await handleFormAction(price.id, product, session);
                                                } else if (session.user?.subscription) {
                                                    redirect('/dashboard/biling')
                                                }
                                            }}
                                        >
                                            Choisir ce plan
                                        </button>
                                    </form>
                                )}
                                {!session && (
                                    <p className="text-foreground-400 mt-4 italic text-center">
                                        Vous devez être connecté pour procéder au paiement
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );

}

async function handleFormAction(priceId: string, product: Stripe.Product, session: Session | null) {
    "use server"
    const user = await prisma.user.findUnique({
        where: {
            id: session?.user?.id
        },
        select: {
            stripeCustomerId: true,
            email: true
        }
    })

    let stripeCustomerId = user?.stripeCustomerId

    if (stripeCustomerId == null && session?.user?.email) {
        const customer = await stripe.customers.create({
            email: session?.user?.email,
        })

        await prisma.user.update({
            where: {
                id: session?.user?.id
            },
            data: {
                stripeCustomerId: customer.id
            }
        })

        stripeCustomerId = customer.id
    }

    if (stripeCustomerId != null) {
        const sessionStripe = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${process.env.NEXTAUTH_URL}/dashboard/biling`,
            cancel_url: `${process.env.NEXTAUTH_URL}/solutions`,
            customer: stripeCustomerId,
            metadata: {
                userPlan: product.metadata.userPlan
            }
        })

        if (sessionStripe.url != null) {
            redirect(sessionStripe.url)
        } else {
            throw new Error("Erreur lors de la création de la session de payement")
        }
    }
    throw new Error("Erreur lors de la création de la session de payement")
}