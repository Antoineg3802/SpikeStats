import Navbar from '@/components/organisms/Navbar';
import { auth } from '@/lib/auth/auth';
import { stripe } from '@/lib/stripe/stripe';
import React from 'react';
import Stripe from 'stripe';

export default async function Page() {
    const session = await auth();
    const products = await stripe.products.list({
        active: true,
        expand: ['data.default_price'],
    });

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
                                            <a href='/dashboard/biling'
                                                className="ml-auto mt-auto inline-block bg-lightOrange text-white py-2 px-4 rounded hover:bg-lightOrange/80 hover:shadow-md"
                                            >
                                                Choisir ce plan
                                            </a>
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