"use client";
import { getTeamPlayers } from "@/lib/action/team/team.action";
import { useAction } from "next-safe-action/hooks";
import { useEffect } from "react";
import DashboardPageTitle from "../atoms/Titles/DashboardPageTitle";
import Loader from "../atoms/Loader";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../ui/accordion";
import PlayerProfileForm from "../organisms/PlayerProfileForm";
import { Toaster } from "../ui/sonner";

interface PlayerDisplayComponentProps {
	teamId: string;
}

export default function PlayerDisplayComponent({
	teamId,
}: PlayerDisplayComponentProps) {
	const { execute, result, status } = useAction(getTeamPlayers);

	useEffect(() => {
		if (teamId) {
			execute({ teamId });
		}
	}, [teamId]);

	return (
		<div className="w-full h-full p-4 overflow-y-scroll">
			{status == "executing" && !result.data ? (
				<Loader />
			) : (
				<>
					<DashboardPageTitle title="Gestion des joueurs" />
					<div>
						<Accordion type="single" collapsible className="w-full">
							{result?.data?.map((player, idx) => (
								<AccordionItem value={idx.toString()} key={idx}>
									<AccordionTrigger className="hover:cursor-pointer">
										{player.user.name}
									</AccordionTrigger>
									<AccordionContent>
										{player.playerProfile && (
											<PlayerProfileForm
												{...player.playerProfile}
												key={idx}
											/>
										)}
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
						<Toaster className="bg-foreground" />
					</div>
				</>
			)}
		</div>
	);
}
