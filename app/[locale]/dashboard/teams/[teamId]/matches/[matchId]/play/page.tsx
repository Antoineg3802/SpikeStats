"use client";

import { use, useEffect, useState } from "react";
import {
	useMatchStore,
	PointType,
	faultTypes,
} from "@/lib/stores/useMatchStore";
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

const pointTypes: PointType[] = ["POINT", "ACE", "BLOCK", "SERVICE"];

export default function MatchPage({ params }: { params: Promise<{ matchId: string }> }) {
	const {
		starting,
		selectStarter,
		setPlayers,
		score,
		addPoint,
		addTimeout,
		substitutePlayer,
	} = useMatchStore();

    const { matchId } = use(params);

	const [open, setOpen] = useState(false);

	// modal événement
	const [eventOpen, setEventOpen] = useState(false);
	const [currentTeam, setCurrentTeam] = useState<string | null>(null);
	const [selectedType, setSelectedType] = useState<PointType>("POINT");

	// modal remplacement
	const [subOpen, setSubOpen] = useState(false);
	const [outId, setOutId] = useState("");
	const [inId, setInId] = useState("");

	// Hook next-safe-action
	const { execute, result, status } = useAction(getMatchById);

	useEffect(() => {
		execute({ matchId: matchId });
	}, [matchId, execute]);

	useEffect(() => {
		if (status === "hasSucceeded" && result.data) {
			const match = result.data;

			const players = match.team.teamMembers.map((tm) => ({
				id: tm.id,
				name: tm.user?.name || "Joueur",
				position: tm.playerProfile?.position || "UNKNOWN",
			}));

			setPlayers(players);

			match.playerSelected.forEach((tm) => {
				if (tm.playerProfile?.position) {
					selectStarter(tm.playerProfile.position, {
						id: tm.id,
						name: tm.user?.name || "Joueur",
						position: tm.playerProfile.position,
					});
				}
			});

			// auto-open si pas assez de joueurs
			if (match.playerSelected.length < 6) {
				setOpen(true);
			}
		}
	}, [status, result, setPlayers, selectStarter]);

	useEffect(() => {
		const onCourtCount = useMatchStore
			.getState()
			.players.filter((p) => p.onCourt).length;

		if (onCourtCount < 6) {
			setOpen(true);
		} else {
			setOpen(false);
		}
	}, [useMatchStore((s) => s.players.map((p) => p.onCourt).join(","))]);

	const teamName = result.data?.team?.name || "Équipe";
	const opponent = result.data?.oponentName || "Adversaire";

	return (
		<div className="p-4 grid gap-4">
			{/* Modal sélection joueurs */}
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							Choisir les joueurs sur le terrain
						</DialogTitle>
					</DialogHeader>

					{status === "executing" ? (
						<p>Chargement des joueurs...</p>
					) : (
						<div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto">
							{useMatchStore.getState().players.map((p) => {
								const onCourt = p.onCourt;

								return (
									<Button
										key={p.id}
										variant={
											onCourt ? "default" : "outline"
										}
										onClick={() => {
											const newOnCourt = useMatchStore
												.getState()
												.players.filter(
													(pl) => pl.onCourt
												)
												.map((pl) => pl.id);

											if (onCourt) {
												// remove
												useMatchStore
													.getState()
													.setOnCourt(
														newOnCourt.filter(
															(id) => id !== p.id
														)
													);
											} else {
												if (newOnCourt.length < 6) {
													useMatchStore
														.getState()
														.setOnCourt([
															...newOnCourt,
															p.id,
														]);
												} else {
													alert(
														"Tu ne peux pas mettre plus de 6 joueurs sur le terrain !"
													);
												}
											}
										}}
									>
										{p.name} ({p.position})
									</Button>
								);
							})}
						</div>
					)}

					<Button
						onClick={() => setOpen(false)}
						disabled={
							useMatchStore
								.getState()
								.players.filter((p) => p.onCourt).length !== 6
						}
						className="mt-4 w-full"
					>
						Valider
					</Button>
				</DialogContent>
			</Dialog>

			{/* Modal ajout événement */}
			<Dialog open={eventOpen} onOpenChange={setEventOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Nouvel événement</DialogTitle>
					</DialogHeader>

					{currentTeam === result.data?.team?.id ? (
						<>
							{/* Mon équipe marque */}
							<p className="mb-2 font-medium">Type d’action</p>
							<div className="grid grid-cols-2 gap-2 mb-4">
								{pointTypes.map((type) => (
									<Button
										key={type}
										variant={
											selectedType === type
												? "default"
												: "outline"
										}
										onClick={() => setSelectedType(type)}
									>
										{type}
									</Button>
								))}
							</div>

							<p className="mb-2 font-medium">Qui a marqué ?</p>
							<div className="grid grid-cols-2 gap-2">
								{useMatchStore
									.getState()
									.players.filter((p) => p.onCourt)
									.map((p) => (
										<Button
											key={p.id}
											onClick={() => {
												addPoint(
													currentTeam!,
													p.id,
													selectedType
												);
												setEventOpen(false);
												setSelectedType("POINT");
											}}
										>
											{p.name} ({p.position})
										</Button>
									))}
							</div>
						</>
					) : (
						<>
							{/* Adversaire marque */}
							{!selectedType.startsWith("FAULT") ? (
								<>
									<p className="mb-2 font-medium">
										Cause du point adverse
									</p>
									<div className="grid grid-cols-1 gap-2 mb-4">
										{faultTypes.map((f) => (
											<Button
												key={f.key}
												variant="outline"
												onClick={() => {
													if (!f.needsPlayer) {
														addPoint(
															currentTeam!,
															undefined,
															f.key
														);
														setEventOpen(false);
														setSelectedType(
															"POINT"
														);
													} else {
														setSelectedType(f.key);
													}
												}}
											>
												{f.label}
											</Button>
										))}
										<Button
											variant="outline"
											onClick={() => {
												addPoint(
													currentTeam!,
													undefined,
													"POINT"
												);
												setEventOpen(false);
												setSelectedType("POINT");
											}}
										>
											Point direct adverse
										</Button>
									</div>
								</>
							) : (
								<>
									{/* Faute nécessitant un joueur */}
									{faultTypes.find(
										(f) => f.key === selectedType
									)?.needsPlayer && (
										<>
											<p className="mb-2 font-medium">
												Quel joueur a commis la faute ?
											</p>
											<div className="grid grid-cols-2 gap-2">
												{useMatchStore
													.getState()
													.players.filter(
														(p) => p.onCourt
													)
													.map((p) => (
														<Button
															key={p.id}
															onClick={() => {
																addPoint(
																	currentTeam!,
																	p.id,
																	selectedType
																);
																setEventOpen(
																	false
																);
																setSelectedType(
																	"POINT"
																);
															}}
														>
															{p.name} (
															{p.position})
														</Button>
													))}
											</div>
										</>
									)}
								</>
							)}
						</>
					)}
				</DialogContent>
			</Dialog>

			{/* Modal remplacement */}
			<Dialog open={subOpen} onOpenChange={setSubOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Remplacement</DialogTitle>
					</DialogHeader>

					<p className="mb-2 font-medium">Qui sort ?</p>
					<div className="grid grid-cols-2 gap-2 mb-4">
						{useMatchStore
							.getState()
							.players.filter((p) => p.onCourt)
							.map((p) => (
								<Button
									key={p.id}
									variant={
										outId === p.id ? "default" : "outline"
									}
									onClick={() => setOutId(p.id)}
								>
									{p.name} ({p.position})
								</Button>
							))}
					</div>

					<p className="mb-2 font-medium">Qui entre ?</p>
					<div className="grid grid-cols-2 gap-2 mb-4">
						{useMatchStore
							.getState()
							.players.filter((p) => !p.onCourt)
							.map((p) => (
								<Button
									key={p.id}
									variant={
										inId === p.id ? "default" : "outline"
									}
									onClick={() => setInId(p.id)}
								>
									{p.name} ({p.position})
								</Button>
							))}
					</div>

					<Button
						className="w-full"
						disabled={!outId || !inId}
						onClick={() => {
							substitutePlayer(
								result.data?.team?.id || "team",
								outId,
								inId
							);
							setSubOpen(false);
							setOutId("");
							setInId("");
						}}
					>
						Valider le remplacement
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
						<span className="text-primary">
							{score[result.data?.team?.id || "team"] || 0}
						</span>
						<p className="text-sm">
							Sets gagnés :{" "}
							{useMatchStore(
								(s) =>
									s.setsWon[
										result.data?.team?.id || "team"
									] || 0
							)}
						</p>
						<p className="text-sm text-gray-500">
							Temps morts :{" "}
							{useMatchStore(
								(s) =>
									s.timeouts[
										result.data?.team?.id || "team"
									] || 0
							)}{" "}
							/ 2
						</p>
						<p className="text-sm text-gray-500">
							Changements :{" "}
							{useMatchStore(
								(s) =>
									s.substitutions[
										result.data?.team?.id || "team"
									] || 0
							)}{" "}
							/ 6
						</p>
					</div>
					<div>
						{opponent}:{" "}
						<span className="text-primary">
							{score["opponent"] || 0}
						</span>
						<p className="text-sm">
							Sets gagnés :{" "}
							{useMatchStore((s) => s.setsWon["opponent"] || 0)}
						</p>
						<p className="text-sm text-gray-500">
							Temps morts :{" "}
							{useMatchStore((s) => s.timeouts["opponent"] || 0)}{" "}
							/ 2
						</p>
						<p className="text-sm text-gray-500">
							Changements :{" "}
							{useMatchStore(
								(s) => s.substitutions["opponent"] || 0
							)}{" "}
							/ 6
						</p>
					</div>
				</CardContent>
			</Card>

			{/* Actions */}
			<Card>
				<CardHeader>
					<CardTitle>Actions rapides</CardTitle>
				</CardHeader>
				<CardContent className="flex gap-4 flex-wrap">
					<Button
						onClick={() => {
							setCurrentTeam(result.data?.team?.id || "team");
							setEventOpen(true);
						}}
					>
						+1 {teamName}
					</Button>
					<Button
						onClick={() => {
							setCurrentTeam("opponent");
							setEventOpen(true);
						}}
					>
						+1 {opponent}
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
					<Button onClick={() => setSubOpen(true)}>
						Remplacement
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
