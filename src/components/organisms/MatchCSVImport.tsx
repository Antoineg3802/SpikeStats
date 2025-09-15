"use client";

import Papa from "papaparse";
import { useAction } from "next-safe-action/hooks";
import { addMatchFromCSV } from "@/lib/action/match/match.action";
import { toast, Toaster } from "sonner";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function MatchCSVImport({ teamId }: { teamId: string }) {
	const { execute } = useAction(addMatchFromCSV, {
		onSuccess: (data) => {
			console.log(data)
		},
		onError: () => toast.error("Erreur lors de l'import"),
	});

	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		Papa.parse(file, {
			header: true,
			skipEmptyLines: true,
			complete: (results) => {
				const rows = (results.data as any[])
					.map((row) => ({
						Date: row["Date"],
						Heure: row["Heure"],
						EQA_nom: row["EQA_nom"],
						EQB_nom: row["EQB_nom"],
						Salle: row["Salle"],
						Score: row["Score"],
					}))
					.filter((r) => r.Date && r.EQA_nom && r.EQB_nom);

				if (rows.length === 0) {
					toast.error("CSV invalide ou vide");
					return;
				}

				console.log("Rows à envoyer:", rows);

				execute({ rows, teamId });
			},
		});
	};

	return (
		<div className="space-y-2">
			<Label htmlFor="matchCsv">Importer un CSV</Label>
			<Input
				id="matchCsv"
				className="w-fit"
				type="file"
				accept=".csv"
				onChange={handleFileUpload}
			/>
			<Toaster position="top-right" richColors />
		</div>
	);
}
