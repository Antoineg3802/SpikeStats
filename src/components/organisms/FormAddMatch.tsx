"use client";

import { useState } from "react";
import { addMatch } from "@/lib/action/match/match.action";
import { Button } from "@/components/ui/button";
import { FilePlus2, Plus } from "lucide-react";
import { Modale } from "./Modale";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../ui/accordion";
import MatchCSVImport from "./MatchCSVImport";
import { Field } from "@/datas/form";
import { DynamicForm } from "../molecules/DynamicForm";
import { toast } from "sonner";
import { Toaster } from "../ui/sonner";


export interface FormAddMatchProps {
	teamId: string;
}

export default function FormAddMatch({ teamId }: FormAddMatchProps) {
	const [isShowingFormAddMatch, setIsShowingFormAddMatch] = useState(false);
	const [isShowingFormAddMatchCSV, setIsShowingFormAddMatchCSV] =
		useState(false);
    const fieldsAddMatch: Field[] = [
        {
            name: "oponentName",
            type: "text",
            label: "Nom de l'adversaire",
            required: true
        }, 
        {
            name: "matchDate",
            type: "datetime-local",
            label: "Date et heure du match",
            required: true
        },
        {
            name: "location",
            type: "text",
            label: "Nom du gymnase",
            required: true
        }
    ];

    const handleMatchAdd = (values: { oponentName: string, matchDate: string, location: string })=>{
        const datas = {
            teamId,
            oponentName : values.oponentName,
            matchDate : values.matchDate,
            location : values.location
        }
        addMatch(datas).then((res)=>{
            console.log(res)
            if (res?.data && res.data !== null && !res.data.error){
                setIsShowingFormAddMatch(false)
                toast.success("Match ajouté !");
            }else {
                toast.error(res?.data?.error)
            }
        })
    }

	return (
		<div>
			<div className="absolute top-4 right-4 flex flex-col gap-2 items-stretch">
				<Button
					variant="default"
					className=""
					onClick={() => setIsShowingFormAddMatch(true)}
				>
					<Plus />
					Ajouter une match
				</Button>
				<Button
					variant="outline"
					className="border-2"
					onClick={() => setIsShowingFormAddMatchCSV(true)}
				>
					<FilePlus2 />
					Ajouter avec un CSV FFVB
				</Button>
			</div>

			<Modale
				open={isShowingFormAddMatch}
				onClose={() => setIsShowingFormAddMatch(false)}
			>
				<div className="flex flex-col gap-4">
					<h2 className="text-2xl font-bold">Ajouter un match</h2>

                    <DynamicForm fields={fieldsAddMatch} onSubmit={function (values: any): void {
                        handleMatchAdd(values);
                    } } />
				</div>
			</Modale>

			<Modale
				open={isShowingFormAddMatchCSV}
				onClose={() => setIsShowingFormAddMatchCSV(false)}
			>
				<div className="flex flex-col gap-4">
					<h2 className="text-2xl font-bold">
						Ajouter un match avec un fichier CSV
					</h2>
					<Accordion type="single" collapsible className="w-full bg-foreground/5 p-4 rounded-lg">
						<AccordionItem value="1">
							<AccordionTrigger className="hover:cursor-pointer">
								Comment obtenir le fichier CSV pour son équipe ?
							</AccordionTrigger>
							<AccordionContent>
								<ol type="1" className="list-decimal list-inside flex flex-col gap-2">
									<li>Aller sur le site de la FFVB</li>
									<li>
										Aller dans la section "Compétitions"
									</li>
									<li>
										Rendez-vous sur la page de la
										compétition
									</li>
									<li>
										Cliquez sur la loupe à côté de votre
										équipe
									</li>
                                    <li>
                                        Cliquez sur le logo excel et cela téléchargera le fichier CSV
									</li>
                                    <li>
                                        Ajoutez-le dans le formulaire ci-bas
									</li>
								</ol>
							</AccordionContent>
						</AccordionItem>
					</Accordion>

                    <MatchCSVImport teamId={teamId} />
				</div>
			</Modale>
            <Toaster />
		</div>
	);
}
