"use client";
import { TeamDashboardExtended } from "@/datas/Teams/team";
import Loader from "../atoms/Loader";
import { useEffect, useState } from "react";
import { getTeamById } from "@/lib/action/team/team.action";
import DashboardPageTitle from "../atoms/Titles/DashboardPageTitle";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Session } from "@/datas/session";
import { Button } from "../ui/button";
import Image from "next/image";
import { Star } from "lucide-react";
import Link from "next/link";

interface TeamDisplayComponentProps {
	teamId: string;
	session: Session | null;
}

export default function TeamDisplayComponent({
	teamId,
	session,
}: TeamDisplayComponentProps) {
	const [team, setTeam] = useState<TeamDashboardExtended | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		if (isMounted) return;
		setIsMounted(true);
		const fetchData = async () => {
			const response = await getTeamById({ teamId });
			if (response?.data) {
				setTeam(response.data);
			} else {
				setTeam(null);
			}
			setIsLoading(false);
		};
		fetchData();
	}, []);

	if (isLoading) {
		return <Loader />;
	} else {
		if (!team) {
			return (
				<div className="flex flex-col gap-4">
					<h1 className="text-2xl font-bold">Erreur</h1>
					<p>
						Une erreur est survenue lors de la récupération de
						l'équipe.
					</p>
				</div>
			);
		} else {
			return (
				<div className="h-full grid grid-cols-6 grid-rows-[10%_repeat(4,_1fr)] gap-4 p-4">
					<div className="row-start-1 row-end-2 col-start-1 col-end-7">
						<DashboardPageTitle title={team.name} />
						<p className="text-gray-500">{team.description}</p>
					</div>
					<Card className="row-start-2 row-end-4 col-start-1 col-end-3">
						<CardHeader>
							<CardTitle>Membres de l'équipe</CardTitle>
							<CardDescription>
								Vous pouvez gérer les membres de votre équipe
								ici.
							</CardDescription>
						</CardHeader>
						<CardContent className="grid gap-3 overflow-hidden relative">
							<div
								className="flex items-center justify-between space-x-4 sticky top-0"
								key={session?.user.id}
							>
								<div className="flex items-center space-x-4">
									<Avatar className="h-8 w-8">
										{team.owner?.image ? (
											<AvatarImage
												src={team.owner?.image}
												alt="Image"
											/>
										) : (
											<span className="h-8 w-8 flex justify-center items-center">
												{team.owner?.name
													.split(" ")
													.map((name) =>
														name
															.charAt(0)
															.toUpperCase()
													)
													.join("")
													.slice(0, 2)}
											</span>
										)}
									</Avatar>
									<div>
										<p className="text-sm font-medium leading-none">
											{team.owner?.name}{" "}
											{team.owner?.id ==
											session?.user.id ? (
												<span className="text-sm font-medium text-muted-foreground">
													(Toi)
												</span>
											) : (
												""
											)}
											<span className="ml-2 text-sm font-medium text-primary">
												Gérant
											</span>
										</p>
										<p className="text-sm text-muted-foreground">
											{team.owner?.email}
										</p>
									</div>
								</div>
							</div>
							<div className="border-t py-3 grid gap-3 overflow-y-scroll">
								{team.teamMembers.map((member) => {
									const initials = member.user.name
										.split(" ")
										.map((name) =>
											name.charAt(0).toUpperCase()
										)
										.join("")
										.slice(0, 2);
									return (
										<div
											className="flex items-center justify-between space-x-4"
											key={member.id}
										>
											<div className="flex items-center space-x-4">
												<Avatar className="h-8 w-8">
													<AvatarImage
														src={member.user.image}
														alt="Image"
													/>
													{member.user.image ? (
														<AvatarImage
															src={
																member.user
																	.image
															}
															alt="Image"
														/>
													) : (
														<span className="h-8 w-8 flex justify-center items-center">
															{initials}
														</span>
													)}
												</Avatar>
												<div>
													<p className="text-sm font-medium leading-none">
														{member.user.name}
													</p>
													<p className="text-sm text-muted-foreground">
														{member.user.email}
													</p>
												</div>
											</div>
										</div>
									);
								})}
							</div>
						</CardContent>
					</Card>
					<Card className="row-start-2 row-end-4 col-start-3 col-end-7">
						<CardHeader>
							<CardTitle>Statistiques</CardTitle>
						</CardHeader>
						<CardContent>
							Vous retrouverez ici les statistiques de votre
							équipe.
						</CardContent>
						<CardFooter>
							<Button variant="default">
								Voir toutes les statistiques
							</Button>
						</CardFooter>
					</Card>
					<Card className="row-start-4 row-end-6 col-start-1 col-end-5 gap-2">
						<CardHeader>
							<CardTitle>Prochains matchs</CardTitle>
						</CardHeader>
						<CardContent className="flex flex-col gap-2">
							{team.Match &&
								team.Match.filter(
									(match) =>
										new Date(match.matchDate) >= new Date()
								)
									.sort(
										(a, b) =>
											new Date(a.matchDate).getTime() -
											new Date(b.matchDate).getTime()
									)
									.slice(0, 3)
									.map((match) => (
										<Link
											key={match.id}
											className="flex flex-col border rounded-lg p-2 min-w-[150px] hover:bg-primary/10 hover:border-primary"
											href={
												"/dashboard/teams/" +
												teamId +
												"/matches/" +
												match.id
											}
										>
											<div className="flex align-bottom gap-1 font-medium">
												<p className="h-fit">
													{match.oponentName}
												</p>
												<p className="text-sm self-end text-muted-foreground h-fit">
													{match.location}
												</p>
											</div>
											<p className="text-sm">
												{new Date(
													match.matchDate
												).toLocaleDateString("fr-FR", {
													weekday: "long",
													day: "numeric",
													month: "long",
												})}
											</p>
										</Link>
									))}
						</CardContent>
						<CardFooter>
							<Button asChild>
								<Link
									href={
										"/dashboard/teams/" +
										teamId +
										"/matches"
									}
									prefetch
								>
									Voir tous les matchs
								</Link>
							</Button>
						</CardFooter>
					</Card>
					<Card className="row-start-4 row-end-6 col-start-5 col-end-7">
						<CardHeader>
							<CardTitle>Joueur du match</CardTitle>
							<div className="flex gap-2 text-sm text-muted-foreground whitespace-nowrap">
								<Star className="text-amber-300 fill-amber-300" />{" "}
								Performance exceptionnelle lors du dernier match
								!
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
				</div>
			);
		}
	}
}
