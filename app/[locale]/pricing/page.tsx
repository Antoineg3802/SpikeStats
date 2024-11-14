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

    console.log(products)

    // order products by price reccuring interval
    products.data = products.data.sort((a: Stripe.Product, b) => {
        // @ts-ignore
        if (a.default_price?.recurring.interval > b.default_price?.recurring.interval) {
            return 1;
        }
        // @ts-ignore
        if (a.default_price?.recurring.interval < b.default_price?.recurring.interval) {
            return -1;
        }
        return 0;
    });

    return <div className=''>
        <Navbar session={session} />
        <div className="w-full h-full flex gap-12 justify-center">
            {products.data.map((product, index) => (
                <div className="block rounded-lg p-4 w-1/4 shadow-sm shadow-indigo-100" key={product.id}>
                    <h1 className='font-semibold mb-4'>{product.name}</h1>
                    {product.description && <p>{product.description}</p>}
                    {product.default_price != null &&
                        <div>
                            {/* @ts-ignore */}
                            <span className="text-4xl font-bold">{product.default_price.unit_amount / 100} €</span> <span className='flex-col'>par {product.default_price.recurring.interval == "month" ? "mois" : "an"}</span>
                        </div>
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