import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
    apiVersion: "2024-10-28.acacia",
    typescript: true,
    appInfo: {
        name: "Next.js Typescript Stripe Example",
        version: "0.1.0",
    },
})