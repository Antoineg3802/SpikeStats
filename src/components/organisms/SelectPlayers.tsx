"use client";

import { useEffect, useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { assignPlayersToMatch } from "@/lib/action/match/match.action";
import { Prisma } from "@/lib/prisma/client";
import { Toaster } from "../ui/sonner";
import { toast } from "sonner";

interface PlayerSelectionProps {
	teamId: string;
	matchId: string;
	players: TeamMemberWithUserAndProfile[];
	idsSelectedPlayers: string[];
}

type TeamMemberWithUserAndProfile = Prisma.TeamMemberGetPayload<{
	include: { user: true; playerProfile: true };
}>;

export default function PlayerSelection({
	teamId,
	matchId,
	players,
	idsSelectedPlayers
}: PlayerSelectionProps) {
	const [selectedPlayers, setSelectedPlayers] = useState<string[]>(idsSelectedPlayers);
	const { execute, status, result } = useAction(assignPlayersToMatch);

	const togglePlayer = (playerId: string) => {
		setSelectedPlayers((prev) =>
			prev.includes(playerId)
				? prev.filter((id) => id !== playerId)
				: [...prev, playerId]
		);
	};

	const handleSubmit = () => {
		if (selectedPlayers.length < 6 || selectedPlayers.length > 12) {
			toast.error("Le nombre de joueurs selectionnés doit être compris entre 6 et 12")
			return
		}
		execute({
			teamId,
			matchId,
			playerIds: selectedPlayers,
		});
	};

	useEffect(()=>{
		console.log(selectedPlayers)
	}, [selectedPlayers])

	return (
		<Card className="w-full max-w-md mx-auto">
			<CardHeader>
				<CardTitle>Sélection des joueurs</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				{players.length === 0 ? (
					<p>Aucun joueur dans cette équipe.</p>
				) : (
					<div className="space-y-2">
						{players.map((player) => (
							<div
								key={player.id}
								className="flex items-center space-x-2 border-b py-2"
							>
								<Checkbox
									checked={selectedPlayers.includes(
										player.id
									)}
									onCheckedChange={() =>
										togglePlayer(player.id)
									}
								/>
								<span>
									#{player.playerProfile?.jerseyNumber ?? "-"} {player.user.name}{" "}
									({player.playerProfile?.position})
								</span>
							</div>
						))}
					</div>
				)}

				<Button
					onClick={handleSubmit}
					disabled={
						status === "executing" || selectedPlayers.length < 6 || selectedPlayers.length > 14
					}
					className="w-full"
				>
					{status === "executing"
						? "Enregistrement..."
						: "Enregistrer la sélection"}
				</Button>
			</CardContent>
			<Toaster />
		</Card>
	);
}
