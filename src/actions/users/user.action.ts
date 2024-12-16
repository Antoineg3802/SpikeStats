"use server";

import { actionClient } from "@/lib/action/action";
import { z } from "zod";
import { auth } from "@/lib/auth/auth";
import { stripe } from "@/lib/stripe/stripe";
import { Session } from "@/datas/session";

export const getFullProfil = actionClient
.action(async () => {
    const session = await auth() as Session;
    if (session?.user?.stripeCustomerId){
        let customer = await stripe.customers.retrieve(session?.user?.stripeCustomerId);
        return customer
    }else {
        return null;
    }
})
