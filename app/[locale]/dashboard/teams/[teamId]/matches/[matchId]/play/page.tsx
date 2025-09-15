"use client";

import { useEffect, useState } from "react";
import { useMatchStore } from "@/lib/stores/useMatchStore";
import { useAction } from "next-safe-action/hooks";
import { getMatchById } from "@/lib/action/match/match.action";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MatchPage({ params }: { params: { matchId: string } }) {
	const { starting, selectStarter, setPlayers, score, addPoint, addTimeout } =
		useMatchStore();

	const [open, setOpen] = useState(false);

	// Hook next-safe-action
	const { execute, result, status } = useAction(getMatchById);

	useEffect(() => {
		execute({ matchId: params.matchId });
	}, [params.matchId, execute]);

	useEffect(() => {
		if (status === "hasSucceeded" && result.data) {
			const match = result.data;

			// Hydrater Zustand avec tous les joueurs de l’équipe
			const players = match.team.teamMembers.map((tm) => ({
				id: tm.id,
				name: tm.user?.name || "Joueur",
				position: tm.playerProfile?.position || "UNKNOWN",
			}));

			setPlayers(players);

			// S’il y a déjà des joueurs sélectionnés -> pré-remplir le store
			match.playerSelected.forEach((tm) => {
				if (tm.playerProfile?.position) {
					selectStarter(tm.playerProfile.position, {
						id: tm.id,
						name: tm.user?.name || "Joueur",
						position: tm.playerProfile.position,
					});
				}
			});

			// Ouvrir la modal uniquement si aucune sélection encore
			if (match.playerSelected.length === 0) {
				setOpen(true);
			}
		}
	}, [status, result, setPlayers, selectStarter]);

	const teamName = result.data?.team?.name || "Équipe";
	const opponent = result.data?.oponentName || "Adversaire";

	function allSelected() {
		return Object.values(starting).every((p) => p !== null);
	}

	return (
		<div className="p-4 grid gap-4">
			{/* Modal sélection joueurs */}
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Sélection des titulaires</DialogTitle>
					</DialogHeader>
					{status === "executing" ? (
						<p>Chargement des joueurs...</p>
					) : (
						<div className="space-y-4">
							{Object.keys(starting).map((pos) => (
								<div
									key={pos}
									className="flex gap-2 items-center"
								>
									<span className="w-40">{pos}</span>
									<select
										className="border rounded p-1"
										onChange={(e) => {
											const playerId = e.target.value;
											const player = useMatchStore
												.getState()
												.players.find(
													(p) => p.id === playerId
												);
											if (player)
												selectStarter(pos, player);
										}}
										value={starting[pos]?.id || ""}
									>
										<option value="">-- Choisir --</option>
										{useMatchStore
											.getState()
											.players.filter(
												(p) => p.position === pos
											)
											.map((p) => (
												<option key={p.id} value={p.id}>
													{p.name}
												</option>
											))}
									</select>
								</div>
							))}
						</div>
					)}
					<Button
						onClick={() => setOpen(false)}
						disabled={!allSelected()}
						className="mt-4"
					>
						Valider
					</Button>
				</DialogContent>
			</Dialog>

			{/* Infos Match */}
			<Card>
				<CardHeader>
					<CardTitle>
						{teamName} vs {opponent}
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p>
						Date :{" "}
						{result.data?.matchDate &&
							new Date(result.data.matchDate).toLocaleString()}
					</p>
					<p>Lieu : {result.data?.location || "NC"}</p>
				</CardContent>
			</Card>

			{/* Score */}
			<Card>
				<CardHeader>
					<CardTitle>Score en direct</CardTitle>
				</CardHeader>
				<CardContent className="flex justify-around text-3xl">
					<div>
						{teamName}:{" "}
                        <span className="text-primary">{score[result.data?.team?.id || "team"] || 0}</span>
					</div>
					<div>
						{opponent}: <span className="text-primary">{score["opponent"] || 0}</span>
					</div>
				</CardContent>
			</Card>

			{/* Actions */}
			<Card>
				<CardHeader>
					<CardTitle>Actions rapides</CardTitle>
				</CardHeader>
				<CardContent className="flex gap-4">
					<Button
						onClick={() =>
							addPoint(result.data?.team?.id || "team")
						}
					>
						+1 Point {teamName}
					</Button>
					<Button onClick={() => addPoint("opponent")}>
						+1 Point {opponent}
					</Button>
					<Button
						onClick={() =>
							addTimeout(result.data?.team?.id || "team")
						}
					>
						Temps mort {teamName}
					</Button>
					<Button onClick={() => addTimeout("opponent")}>
						Temps mort {opponent}
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
