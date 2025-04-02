import Stripe from "stripe";
import DashboardSubtitle from "../atoms/Titles/DashboardSubtitle";
import { ChevronRight, Ellipsis } from "lucide-react";
import Link from "next/link";

interface InvoiceExcerptProps {
    invoices: Stripe.Invoice[]
}

export default function InvoiceExcerpt({ invoices }: InvoiceExcerptProps) {
    if (invoices.length === 0) {
        return (
            <p>Aucune factures ...</p>
        );
    } else {
        // reverse and get the 2 firsts invoices
        invoices = invoices.reverse();
        invoices = invoices.slice(0, 2);

        return (
            <div>
                <DashboardSubtitle subtitle="Vos dernières factures" />
                <div className="flex gap-4">
                    {invoices.map((invoice: Stripe.Invoice) => {
                        return (
                            <a href={invoice.hosted_invoice_url? invoice.hosted_invoice_url : ""} key={invoice.id} target="_blank" className="flex text-foreground shadow-inner justify-between p-2 border-[1px] border-foreground-300 rounded-lg w-1/3 hover:shadow-none hover:border-primary hover:text-primary">
                                <div className="text-foreground">
                                    <p>Facture n°{invoice.number}</p>
                                    <p>Montant : {invoice.amount_due / 100}€</p>
                                    <p>Date : {new Date(invoice.created * 1000).toLocaleDateString()}</p>
                                </div>
                                <ChevronRight height={32} width={32} className="hover:text-primary my-auto"/>
                            </a>
                        );
                    })}
                    <Link href='/dashboard/biling' className="flex flex-col text-center justify-center p-2 bg-primary border-[1px] border-primary rounded-lg w-1/3 text-foreground hover:cursor-pointer hover:shadow-inner hover:text-primary hover:bg-foreground transition">
                        <Ellipsis className="m-auto my-0" stroke="3" height={32} width={32} />
                        <p className="text-lg font-bold">Voir toutes les factures</p>
                    </Link>
                </div>
            </div>
        );
    }
}