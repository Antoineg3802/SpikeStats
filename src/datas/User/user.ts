import { Stripe } from 'stripe';

export interface UserFullProfil {
    customer: Stripe.Customer | Stripe.DeletedCustomer | null,
    invoices: Stripe.Invoice[]
}