import Navbar from '@/components/organisms/Navbar';
import { auth } from '@/lib/auth/auth';
import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe/stripe';
import { redirect } from 'next/navigation';
import React from 'react';
import Stripe from 'stripe';

export default async function Page() {
    const session = await auth();
    const products = await stripe.products.list({
        active: true,
        expand: ['data.default_price'],
    });

    const user = await prisma.user.findUnique({
        where: {
            id: session?.user?.id
        },
    })
    console.log(user)

    // order products by price reccuring interval
    products.data = products.data.sort((a: Stripe.Product, b: Stripe.Product) => {
        const default_price_a = a.default_price as Stripe.Price;
        const default_price_b = b.default_price as Stripe.Price;
        if (default_price_a && default_price_b) {
            if (default_price_a.recurring?.interval && default_price_b.recurring?.interval && default_price_a.recurring.interval > default_price_b.recurring.interval) {
                return 1;
            }
            if (default_price_a.recurring?.interval && default_price_b.recurring?.interval && default_price_a.recurring.interval < default_price_b.recurring.interval) {
                return -1;
            }
        }
        return 0;
    });

    return <div className='h-screen'>
        <Navbar session={session} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-5/6 w-10/12 mx-auto mt-8">
            {products.data.map((product) => (
                <div key={product.id} className="grid grid-rows-2 grid-cols-1 border p-6 rounded-lg shadow-md h-5/6 my-auto">
                    <div>
                        <h3 className="text-2xl font-semibold mb-4">{product.name}</h3>
                        <p className="text-gray-700 mb-6">{product.description}</p>
                    </div>
                    {product.default_price != null &&
                        (() => {
                            const price = product.default_price as Stripe.Price;
                            return (
                                price.unit_amount != null && (
                                    <div key={price.id} className="flex-col">
                                        <p className=" font-bold">
                                            <span className="text-2xl text-lightOrange">{price.unit_amount / 100} {price.currency.toUpperCase() == "EUR" ? "€" : "$"}</span> /{' '}
                                            {price.recurring?.interval == 'month' ? 'mois' : ''}
                                            {price.recurring?.interval == 'year' ? 'année' : ''}
                                        </p>
                                        <ul className="list-disc list-inside list-image-checkmark my-4">
                                            {product.marketing_features.map((feature, index) => (
                                                <li key={index}>{feature.name}</li>
                                            ))}
                                        </ul>
                                        {session &&
                                            <form>
                                                <button className='className="ml-auto mt-auto bg-lightOrange text-white py-2 px-4 rounded hover:bg-lightOrange/80 hover:shadow-md"' formAction={async ()=>{
                                                    "use server"

                                                    const session = await auth()
                                                    const user = await prisma.user.findUnique({
                                                        where: {
                                                            id : session?.user?.id
                                                        },
                                                        select: {
                                                            stripeCustomerId: true,
                                                            email: true
                                                        }
                                                    })

                                                    let stripeCustomerId = user?.stripeCustomerId

                                                    if(stripeCustomerId == null && session?.user?.email){
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

                                                    if (stripeCustomerId != null){
                                                        const sessionStripe = await stripe.checkout.sessions.create({
                                                            payment_method_types: ['card'],
                                                            line_items: [
                                                                {
                                                                    price: price.id,
                                                                    quantity: 1,
                                                                },
                                                            ],
                                                            metadata: {
                                                                userPlan: product.name
                                                            },
                                                            mode: 'subscription',
                                                            success_url: `${process.env.NEXTAUTH_URL}/dashboard/biling?session_id={CHECKOUT_SESSION_ID}`,
                                                            cancel_url: `${process.env.NEXTAUTH_URL}/pricing`,
                                                            customer: stripeCustomerId
                                                        })

                                                        if (sessionStripe.url != null) {
                                                            redirect(sessionStripe.url)
                                                        }else{
                                                            throw new Error("Erreur lors de la création de la session de payement")
                                                        }
                                                    }
                                                    throw new Error("Erreur lors de la création de la session de payement")
                                                }}>Choisir ce plan</button>
                                            </form>
                                        }
                                        {!session &&
                                            <p className="text-gray-400 mt-4 italic text-center">
                                                Vous devez être connecté pour procéder au payement
                                            </p>
                                        }
                                    </div>
                                )
                            )
                        })()
                    }
                </div>
            ))}
        </div>
    </div>
}