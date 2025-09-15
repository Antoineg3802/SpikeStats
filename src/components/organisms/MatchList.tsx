"use client";
import { getMatchsByTeamId } from "@/lib/action/match/match.action";
import { useAction } from "next-safe-action/hooks";
import { useEffect } from "react";
import Loader from "../atoms/Loader";
import Link from "next/link";
import { Card, CardDescription, CardTitle } from "../ui/card";
import { ArrowRight } from "lucide-react";

export interface MatchListProps {
	teamId: string;
}

export default function MatchList({ teamId }: MatchListProps) {
	const { execute, result, status } = useAction(getMatchsByTeamId);

	useEffect(() => {
		execute({ teamId });
	}, [execute]);

	return (
		<div className="flex-1 overflow-y-auto">
			{status === "executing" || status === "idle" ? (
				<Loader />
			) : status === "hasSucceeded" ? (
				result.data?.error ? (
					<p>
						{typeof result.data?.data === "string"
							? result.data.data
							: "Une erreur est survenue."}
					</p>
				) : result.data?.data && result.data?.data.length > 0 ? (
					<div className="mb-4 flex gap-2 flex-col w-full items-center justify-between">
						{Array.isArray(result.data?.data) &&
							result.data?.data.map((match) => {
								let matchDate = new Date(match.matchDate);
								let className = matchDate < new Date() ? "opacity-50" : "";
								return (
									<Link
										href={{
											pathname: `/dashboard/teams/${teamId}/matches/${match.id}`,
										}}
                                        key={match.id}
                                        className="w-full"
										prefetch={true}
									>
										<Card
											className={
												"group gap-2 p-3 hover:border-primary hover:bg-primary/5 duration-200 relative overflow-hidden " +
												className
											}
										>
											<CardTitle className="group-hover:text-primary duration-200 text-xl">
												Match contre {match.oponentName}
											</CardTitle>
											<CardDescription className="flex flex-col gap-2">
												<p>Lieu : {match.location}</p>
												<small>
													prévu le{" "}
													{matchDate.getDate() +
														"/" +
														(matchDate.getMonth() +
															1) +
														"/" +
														matchDate.getFullYear()}{" "}
													à{" "}
													{matchDate.getHours() +
														"h" +
														(matchDate.getMinutes() <
														10
															? "0" +
															  matchDate.getMinutes()
															: matchDate.getMinutes())}
												</small>
											</CardDescription>
											<ArrowRight
												height={36}
												width={36}
												className="absolute stroke-2 text-primary top-1/2 right-[-50px] group-hover:right-4 duration-150 translate-y-[-50%]"
											/>
										</Card>
									</Link>
								);
							})}
					</div>
				) : (
					<p>No matches found.</p>
				)
			) : (
				<p>Error loading matches.</p>
			)}
		</div>
	);
}
