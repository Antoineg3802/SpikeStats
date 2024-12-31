import { Stripe } from 'stripe';

export interface UserFullProfil {
    customer: Stripe.Customer | null,
    invoices: Stripe.Invoice[]
}