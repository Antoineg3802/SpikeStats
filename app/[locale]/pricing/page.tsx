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

    return <div>
        <Navbar session={session} />
        <div className="w-full h-full flex gap-12 justify-center">
            {products.data.map((product, index) => (
                <div className="block rounded-lg p-4 w-1/4 shadow-sm shadow-indigo-100" key={product.id}>
                    <h1 className='font-semibold mb-4'>{product.name}</h1>
                    {product.description && <p>{product.description}</p>}
                    {product.default_price != null &&
                        (() => {
                            const price = product.default_price as Stripe.Price;
                            return (
                                price.unit_amount != null && (
                                    <div>
                                        <span className="text-4xl font-bold">{price.unit_amount / 100} €</span>
                                        <span className='flex-col'>
                                            par {price.recurring?.interval === "month" ? "mois" : "an"}
                                        </span>
                                    </div>
                                )
                            );
                        })()
                    }
                    <button className='p-2 mt-4 bg-lightOrange rounded-lg hover:bg-lightOrange/80'>Démarrer l'essai</button>
                    <p className='mt-3'>Fonctionnnalités :</p>
                    <ul className='list-disc list-inside'>
                        {product.marketing_features.map((feature, index) => (
                            <li key={index}>{feature.name}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    </div>
}