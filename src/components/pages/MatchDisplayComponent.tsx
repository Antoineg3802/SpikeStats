"use client";

import { useEffect, useState } from "react";
import { getMatchById } from "@/lib/action/match/match.action";
import Loader from "../atoms/Loader";
import { Button } from "../ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Play, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DashboardPageTitle from "../atoms/Titles/DashboardPageTitle";
import { useAction } from "next-safe-action/hooks";
import { Modale } from "../organisms/Modale";
import PlayerSelection from "../organisms/SelectPlayers";

interface MatchDisplayProps {
	matchId: string;
}

export default function MatchDisplayComponent({ matchId }: MatchDisplayProps) {
	const { execute, result, status } = useAction(getMatchById);
	const [isModaleSelectedPlayerOpen, setIsModaleSelectedPlayerOpen] =
		useState<boolean>(false);

	useEffect(() => {
		execute({ matchId });
	}, [execute, matchId]);

	if (status === "executing" || status === "idle") {
		return <Loader />;
	}

	if (status === "hasErrored" || !result.data) {
		return <div className="p-4">⚠️ Match introuvable</div>;
	}

	const match = result.data;

	const playerSelected : string[] = []

	match.playerSelected.map((player)=>{
		playerSelected.push(player.id) 
	})

	return (
		<div className="h-full grid grid-cols-6 grid-rows-[10%_repeat(4,_1fr)] gap-4 relative">
			<div className="row-start-1 row-end-2 col-start-1 col-end-7">
				<DashboardPageTitle
					title={match.team.name + " 🆚 " + match.oponentName}
				/>
				<p className=" text-gray-500">
					{new Date(match.matchDate).toLocaleDateString("fr-FR", {
						weekday: "long",
						day: "numeric",
						month: "long",
						year: "numeric",
					})}{" "}
					à{" "}
					{new Date(match.matchDate).toLocaleTimeString("fr-FR", {
						hour: "2-digit",
						minute: "2-digit",
					})}
				</p>
			</div>

			<Card className="row-start-2 row-end-4 col-start-1 col-end-3">
				<CardHeader>
					<CardTitle>Informations</CardTitle>
					<CardDescription>Détails du match</CardDescription>
				</CardHeader>
				<CardContent className="space-y-2">
					<p>
						<span className="font-semibold">Lieu :</span>{" "}
						{match.location ?? "Non défini"}
					</p>
					{match.result && match.result !== "" && (
						<p>
							<span className="font-semibold">Résultat :</span>{" "}
							{match.result}
						</p>
					)}
				</CardContent>
			</Card>

			<Card className="row-start-2 row-end-4 col-start-3 col-end-7">
				<CardHeader>
					<CardTitle>Joueurs sélectionnés</CardTitle>
				</CardHeader>
				<CardContent className="space-y-2">
					{match.playerSelected && match.playerSelected.length > 0 ? (
						<ul className="list-disc list-inside">
							{match.playerSelected.map((p) => (
								<li key={p.id}>
									{p.user?.name ?? "Joueur inconnu"}
								</li>
							))}
						</ul>
					) : (
						<p>Aucun joueur sélectionné</p>
					)}
				</CardContent>
				<CardFooter>
					<Button onClick={()=>{
						setIsModaleSelectedPlayerOpen(true)
					}}>
						Modifier la selection
					</Button>
				</CardFooter>
			</Card>

			<Card className="row-start-4 row-end-6 col-start-1 col-end-5">
				<CardHeader>
					<CardTitle>Statistiques du match</CardTitle>
				</CardHeader>
				<CardContent>
					<p>
						Les statistiques détaillées de ce match apparaîtront
						ici.
					</p>
				</CardContent>
				<CardFooter>
					<Button asChild>
						<Link href={`/dashboard/matches/${match.id}/stats`}>
							Voir toutes les stats
						</Link>
					</Button>
				</CardFooter>
			</Card>

			<Card className="row-start-4 row-end-6 col-start-5 col-end-7">
				<CardHeader>
					<CardTitle>Joueur du match</CardTitle>
					<div className="flex gap-2 text-sm text-muted-foreground whitespace-nowrap">
						<Star className="text-amber-300 fill-amber-300" />
						Performance exceptionnelle lors du dernier match !
					</div>
				</CardHeader>
				<CardContent className="flex items-center gap-4">
					<div className="relative w-16 h-16 rounded-full overflow-hidden border">
						<Image
							src="/images/mvp.jpg"
							alt="MVP"
							fill
							className="object-cover"
						/>
					</div>
					<div>
						<p className="font-semibold">Antoine Guerin</p>
						<p className="text-sm text-muted-foreground">
							18 points - 4 blocs - 2 aces
						</p>
						<p className="text-sm text-muted-foreground">
							vs Amiens - 16 avril 2025
						</p>
					</div>
				</CardContent>
			</Card>
			<Button
				asChild
				className="absolute top-0 right-0 rounded-full h-[60px] w-[60px]"
			>
				<Play size={40} />
			</Button>
			<Modale
				open={isModaleSelectedPlayerOpen}
				onClose={() => {
					setIsModaleSelectedPlayerOpen(false);
				}}
			>
				<PlayerSelection teamId={match.teamId} matchId={matchId} players={match.team.teamMembers} idsSelectedPlayers={playerSelected} />
			</Modale>
		</div>
	);
}
