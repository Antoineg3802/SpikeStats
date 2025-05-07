"use server";

import { actionClient, authActionClient } from "@/lib/action/action";
import { auth } from "@/lib/auth/auth";
import { stripe } from "@/lib/stripe/stripe";
import { Session } from "@/datas/session";
import Stripe from "stripe";

export const getFullProfil = actionClient
.action(async () => {
    const session = await auth() as Session;
    if (session?.user?.stripeCustomerId){
        let customer = await stripe.customers.retrieve(session?.user?.stripeCustomerId);
        let invoices = await stripe.invoices.list({'customer': session.user.stripeCustomerId});
        customer = JSON.parse(JSON.stringify(customer));
        let arrayInvoices: Stripe.Invoice[] = JSON.parse(JSON.stringify(invoices.data));

        return {
            customer,
            invoices: arrayInvoices
        }
    }else {
        return null;
    }
})

export const getUserConnected = authActionClient
.action(async ({ctx: { user } }) => {
    if (!user) {
        return null;
    }

    return user
})