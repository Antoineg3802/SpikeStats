"use server";
import { authActionClient } from "../action";
import { z } from "zod";
import prisma from "@/lib/prisma/prisma";

export const getMatchsByTeamId = authActionClient
	.schema(
		z.object({
			teamId: z.string(),
		})
	)
	.action(async ({ parsedInput: { teamId }, ctx: { user } }) => {
		if (!user || !teamId) {
			return { error: true, data: "Unauthorized" };
		}

		const team = await prisma.team.findMany({
			where: {
				id: teamId,
			},
			include: {
				teamMembers: true,
				Match: true,
			},
		});

		team[0].Match.sort(
			(a, b) => a.matchDate.getTime() - b.matchDate.getTime()
		);

		if (
			user.id !== team[0]?.ownerId &&
			!team[0]?.teamMembers?.some((member) => member.userId === user.id)
		)
			return { error: true, data: "Unauthorized" };

		if (!team || team.length === 0) {
			return { error: true, data: "Team not found" };
		}

		return { error: false, data: team[0].Match };
	});

export const addMatchFromCSV = authActionClient
	.schema(
		z.object({
			rows: z.array(
				z.object({
					Date: z.string(),
					Heure: z.string().optional(),
					EQA_nom: z.string(),
					EQB_nom: z.string(),
					Salle: z.string().optional(),
					Score: z.string().optional(),
				})
			),
			teamId: z.string(),
		})
	)
	.action(async ({ parsedInput: { rows, teamId }, ctx: { user } }) => {
		if (!user) return { error: "Unauthorized" };

		const requiredFields = ["Date", "EQA_nom", "EQB_nom"];
		const missingFields = requiredFields.filter((f) => !(f in rows[0]!));
		if (missingFields.length > 0) {
			return {
				error: `Colonnes manquantes: ${missingFields.join(", ")}`,
			};
		}

		// Déterminer l'équipe principale (cell qui a le plus de match)
		const counts: Record<string, number> = {};
		rows.forEach((row) => {
			[row.EQA_nom, row.EQB_nom].forEach((team) => {
				if (!team) return;
				counts[team] = (counts[team] ?? 0) + 1;
			});
		});
		const mainTeam = Object.entries(counts).sort(
			(a, b) => b[1] - a[1]
		)[0][0];

		const created = await Promise.all(
			rows.map((row) => {
				if (row.EQA_nom !== "xxxxx" && row.EQB_nom !== "xxxxx") {
					return prisma.match.create({
						data: {
							teamId,
							oponentName:
								row.EQA_nom === mainTeam
									? row.EQB_nom
									: row.EQA_nom,
							matchDate: new Date(
								`${row.Date} ${row.Heure ?? "00:00"}`
							),
							location: row.Salle ?? undefined,
							result: row.Score ?? undefined,
						},
					});
				}
			})
		);

		return { data: created };
	});

export const addMatch = authActionClient
	.schema(
		z.object({
			teamId: z.string(),
			oponentName: z
				.string()
				.min(1, "Le nom de l'équipe adverse est requis"),
			matchDate: z.string().min(1, "La date du match est requise"),
			location: z.string().optional(),
			result: z.string().optional(),
		})
	)
	.action(
		async ({
			parsedInput: { teamId, oponentName, matchDate, location, result },
			ctx: { user },
		}) => {
			if (!user) return { error: "Unauthorized" };

			const team = await prisma.team.findUnique({
				where: { id: teamId },
				include: { teamMembers: true },
			});

			if (!team) {
				return { error: "Team not found" };
			}

			if (
				user.id !== team.ownerId &&
				!team.teamMembers.some((member) => member.userId === user.id)
			) {
				return { error: "Unauthorized" };
			}

			const newMatch = await prisma.match.create({
				data: {
					teamId,
					oponentName,
					matchDate: new Date(matchDate),
					location: location || undefined,
					result: result || undefined,
				},
			});

			if (!newMatch) {
				return { error: "Error creating match" };
			}

			return { error: false, data: newMatch };
		}
	);

export const assignPlayersToMatch = authActionClient
	.schema(
		z.object({
			teamId: z.string(),
			matchId: z.string(),
			playerIds: z.array(z.string()),
		})
	)
	.action(
		async ({
			parsedInput: { teamId, matchId, playerIds },
			ctx: { user },
		}) => {
			if (!user) {
				throw new Error("Utilisateur non authentifié.");
			}

			// Vérifie que le match existe et appartient bien à l'équipe
			const match = await prisma.match.findFirst({
				where: {
					id: matchId,
					teamId,
				},
			});

			if (!match) {
				throw new Error("Match introuvable ou non associé à l'équipe.");
			}

			// Vérifie que les joueurs appartiennent bien à l'équipe
			const validPlayers = await prisma.teamMember.findMany({
				where: {
					id: { in: playerIds },
					teamId,
				},
				select: { id: true },
			});

			if (validPlayers.length !== playerIds.length) {
				throw new Error(
					"Certains joueurs ne sont pas valides pour cette équipe."
				);
			}

			// Met à jour la relation playersSelected du match
			await prisma.match.update({
				where: { id: matchId },
				data: {
					playerSelected: {
						set: [],
						connect: validPlayers.map((p) => ({ id: p.id })),
					},
				},
			});

			return {
				success: true,
				message: "Sélection des joueurs enregistrée avec succès.",
			};
		}
	);
