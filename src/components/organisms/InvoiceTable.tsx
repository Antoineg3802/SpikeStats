import Stripe from "stripe";
import DashboardSubtitle from "../atoms/Titles/DashboardSubtitle";
import { Download, Eye, ChevronUp, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { InvoiceFilters } from "@/datas/Dashboard/filters";

interface InvoiceTableProps {
    invoices: Stripe.Invoice[];
}

export default function InvoiceTable({ invoices }: InvoiceTableProps) {
    const [orderedInvoices, setOrderedInvoices] = useState<Stripe.Invoice[]>([]);
    const [selectedFilter, setSelectedFilter] = useState<InvoiceFilters>(
        InvoiceFilters.STARTDATEDESC
    );

    const sortInvoices = (invoicesToSort: Stripe.Invoice[]): Stripe.Invoice[] => {
        const sortedInvoices = [...invoicesToSort];

        switch (selectedFilter) {
            case InvoiceFilters.STARTDATEASC:
                sortedInvoices.sort(
                    (a, b) => a.lines.data[0].period.start - b.lines.data[0].period.start
                );
                break;
            case InvoiceFilters.STARTDATEDESC:
                sortedInvoices.sort(
                    (a, b) => b.lines.data[0].period.start - a.lines.data[0].period.start
                );
                break;

            case InvoiceFilters.ENDDATEASC:
                sortedInvoices.sort(
                    (a, b) => a.lines.data[0].period.end - b.lines.data[0].period.end
                );
                break;
            case InvoiceFilters.ENDDATEDESC:
                sortedInvoices.sort(
                    (a, b) => b.lines.data[0].period.end - a.lines.data[0].period.end
                );
                break;

            case InvoiceFilters.AMOUNTASC:
                sortedInvoices.sort((a, b) => (a.total ?? 0) - (b.total ?? 0));
                break;
            case InvoiceFilters.AMOUNTDESC:
                sortedInvoices.sort((a, b) => (b.total ?? 0) - (a.total ?? 0));
                break;

            case InvoiceFilters.NAMEASC:
                sortedInvoices.sort((a, b) =>
                    (a.lines.data[0].description || "").localeCompare(
                        b.lines.data[0].description || ""
                    )
                );
                break;
            case InvoiceFilters.NAMEDESC:
                sortedInvoices.sort((a, b) =>
                    (b.lines.data[0].description || "").localeCompare(
                        a.lines.data[0].description || ""
                    )
                );
                break;

            default:
                sortedInvoices.sort((a, b) => b.created - a.created);
        }

        return sortedInvoices;
    };

    useEffect(() => {
        const sorted = sortInvoices(invoices);
        setOrderedInvoices(sorted);
    }, [invoices, selectedFilter]);

    // Bascule entre ASC et DESC selon la colonne
    const handleSortChange = (
        column: "NAME" | "STARTDATE" | "ENDDATE" | "AMOUNT"
    ) => {
        switch (column) {
            case "NAME":
                setSelectedFilter((prev) =>
                    prev === InvoiceFilters.NAMEASC
                        ? InvoiceFilters.NAMEDESC
                        : InvoiceFilters.NAMEASC
                );
                break;
            case "STARTDATE":
                setSelectedFilter((prev) =>
                    prev === InvoiceFilters.STARTDATEASC
                        ? InvoiceFilters.STARTDATEDESC
                        : InvoiceFilters.STARTDATEASC
                );
                break;
            case "ENDDATE":
                setSelectedFilter((prev) =>
                    prev === InvoiceFilters.ENDDATEASC
                        ? InvoiceFilters.ENDDATEDESC
                        : InvoiceFilters.ENDDATEASC
                );
                break;
            case "AMOUNT":
                setSelectedFilter((prev) =>
                    prev === InvoiceFilters.AMOUNTASC
                        ? InvoiceFilters.AMOUNTDESC
                        : InvoiceFilters.AMOUNTASC
                );
                break;
        }
    };

    // Retourne l'icône (Chevron) correspondant à la colonne/ordre
    const getSortIcon = (
        column: "NAME" | "STARTDATE" | "ENDDATE" | "AMOUNT"
    ) => {
        const isName = column === "NAME";
        const isStartDate = column === "STARTDATE";
        const isEndDate = column === "ENDDATE";
        const isAmount = column === "AMOUNT";

        if (isName) {
            if (selectedFilter === InvoiceFilters.NAMEDESC) {
                return <ChevronDown className="inline-block ml-1" size={16} />;
            } else if (selectedFilter === InvoiceFilters.NAMEASC) {
                return <ChevronUp className="inline-block ml-1" size={16} />;
            }
        }

        if (isStartDate) {
            if (selectedFilter === InvoiceFilters.STARTDATEDESC) {
                return <ChevronDown className="inline-block ml-1" size={16} />;
            } else if (selectedFilter === InvoiceFilters.STARTDATEASC) {
                return <ChevronUp className="inline-block ml-1" size={16} />;
            }
        }

        if (isEndDate) {
            if (selectedFilter === InvoiceFilters.ENDDATEDESC) {
                return <ChevronDown className="inline-block ml-1" size={16} />;
            } else if (selectedFilter === InvoiceFilters.ENDDATEASC) {
                return <ChevronUp className="inline-block ml-1" size={16} />;
            }
        }

        if (isAmount) {
            if (selectedFilter === InvoiceFilters.AMOUNTDESC) {
                return <ChevronDown className="inline-block ml-1" size={16} />;
            } else if (selectedFilter === InvoiceFilters.AMOUNTASC) {
                return <ChevronUp className="inline-block ml-1" size={16} />;
            }
        }

        return null;
    };

    return (
        <div className="w-full flex flex-col">
            <DashboardSubtitle subtitle="Facturation" />

            <div className="w-full flex justify-between bg-primary/20 rounded-tr-lg rounded-tl-lg border border-primary">
                <p
                    className="w-1/3 text-center px-4 py-2 hover:cursor-pointer hover:bg-primary/40 select-none"
                    onClick={() => handleSortChange("NAME")}
                >
                    Nom de l'abonnement
                    {getSortIcon("NAME")}
                </p>

                <p
                    className="w-1/3 text-center px-4 py-2 hover:cursor-pointer hover:bg-primary/40 select-none"
                    onClick={() => handleSortChange("STARTDATE")}
                >
                    Début de période
                    {getSortIcon("STARTDATE")}
                </p>

                <p
                    className="w-1/3 text-center px-4 py-2 hover:cursor-pointer hover:bg-primary/40 select-none"
                    onClick={() => handleSortChange("ENDDATE")}
                >
                    Fin de période
                    {getSortIcon("ENDDATE")}
                </p>

                <p
                    className="w-3/12 text-center px-4 py-2 hover:cursor-pointer hover:bg-primary/40 select-none"
                    onClick={() => handleSortChange("AMOUNT")}
                >
                    Montant
                    {getSortIcon("AMOUNT")}
                </p>
                <p className="w-1/12"></p>
            </div>

            <div className="w-full flex flex-col">
                {orderedInvoices.map((invoice, index) => {
                    const line = invoice.lines.data[0];
                    return (
                        <div
                            key={index}
                            className="w-full flex justify-between items-center px-4 py-2 border-b border-l border-r hover:text-primary"
                        >
                            <p className="w-1/3 h-fit align-middle text-center">
                                {line.description}
                            </p>
                            <p className="w-1/3 h-fit align-middle text-center">
                                {new Date(line.period.start * 1000).toLocaleDateString()}
                            </p>
                            <p className="w-1/3 h-fit align-middle text-center">
                                {new Date(line.period.end * 1000).toLocaleDateString()}
                            </p>
                            <p className="w-3/12 h-fit align-middle text-center">
                                {invoice.total && invoice.total / 100} €
                            </p>
                            <div className="w-1/12 h-8 flex justify-around">
                                <a
                                    href={invoice.hosted_invoice_url ?? ""}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <Eye className="text-primary rounded-full h-full w-auto bg-primary/20 p-1 hover:cursor-pointer" />
                                </a>
                                <a href={invoice.invoice_pdf ?? ""}>
                                    <Download className="text-primary rounded-full h-full w-auto bg-primary/20 p-1 hover:cursor-pointer" />
                                </a>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
