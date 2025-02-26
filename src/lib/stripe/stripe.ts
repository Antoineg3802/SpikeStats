import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
    typescript: true,
    appInfo: {
        name: "SpikeStats",
        version: "0.1.0",
    },
})