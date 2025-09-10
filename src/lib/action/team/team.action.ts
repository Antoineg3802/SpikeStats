"use server";

import { authActionClient } from "../action";
import { z } from "zod";
import prisma from "@/lib/prisma/prisma";
import { TeamDashboardExtended, TeamMemberAdd } from "@/datas/Teams/team";
import { PlayerProfile, TeamMember, User } from "@/lib/prisma/client";

export const createTeam = authActionClient
	.schema(
		z.object({
			teamName: z.string(),
			description: z.string(),
		})
	)
	.action(
		async ({ parsedInput: { teamName, description }, ctx: { user } }) => {
			if (!user || !teamName || !description) {
				return null;
			}

			const existingTeam = await prisma.team.findFirst({
				where: {
					name: teamName,
				},
			});

			if (existingTeam) {
				return null;
			}

			let joinCode = await generateCode();

			const team = await prisma.team.create({
				data: {
					name: teamName,
					description,
					ownerId: user.id,
					joinCode,
				},
				select: {
					id: true,
					name: true,
					createdAt: true,
					description: true,
					ownerId: true,
					logo: true,
					teamMembers: {
						select: {
							id: true,
							user: {
								select: {
									id: true,
									name: true,
								},
							},
						},
					},
				},
			});

			if (!team) {
				return null;
			}

			return team as TeamDashboardExtended;
		}
	);

export const getUserTeams = authActionClient.action(
	async ({ ctx: { user } }) => {
		if (!user) {
			return null;
		}

		const teams = await prisma.team.findMany({
			select: {
				id: true,
				name: true,
				description: true,
				createdAt: true,
				logo: true,
				ownerId: true,
				teamMembers: {
					select: {
						id: true,
						user: {
							select: {
								id: true,
								name: true,
							},
						},
					},
				},
			},
			where: {
				OR: [
					{ ownerId: user.id },
					{ teamMembers: { some: { userId: user.id } } },
				],
				active: true,
			},
		});

		return teams as TeamDashboardExtended[];
	}
);

export const joinTeam = authActionClient
	.schema(
		z.object({
			joinCode: z.string(),
		})
	)
	.action(async ({ parsedInput: { joinCode }, ctx: { user } }) => {
		if (!user || !joinCode) {
			return null;
		}

		const team = await prisma.team.findFirst({
			select: {
				id: true,
				name: true,
				description: true,
				createdAt: true,
				logo: true,
				joinCode: true,
				ownerId: true,
				teamMembers: {
					select: {
						id: true,
						userId: true,
						role: true,
						active: true,
						user: {
							select: {
								id: true,
								name: true,
							},
						},
					},
				},
			},
			where: {
				joinCode,
			},
		});

		if (!team) {
			return null;
		}

		const existingMember = await prisma.teamMember.findFirst({
			where: {
				userId: user.id,
				teamId: team.id,
			},
		});

		if (existingMember) {
			return null;
		}

		const teamMember = await prisma.teamMember.create({
			data: {
				userId: user.id,
				role: "MEMBER",
				active: true,
				teamId: team.id,
			},
			select: {
				id: true,
				userId: true,
				role: true,
				active: true,
				user: {
					select: {
						id: true,
						name: true,
						image: true,
						email: true,
					},
				},
			},
		});

		if (!teamMember) {
			return null;
		}

		return team as TeamDashboardExtended;
	});

export const getTeamById = authActionClient
	.schema(
		z.object({
			teamId: z.string(),
		})
	)
	.action(async ({ parsedInput: { teamId }, ctx: { user } }) => {
		if (!user || !teamId) {
			return null;
		}
		const team = await prisma.team.findFirst({
			select: {
				id: true,
				name: true,
				description: true,
				createdAt: true,
				logo: true,
				joinCode: true,
				ownerId: true,
				teamMembers: {
					select: {
						id: true,
						userId: true,
						role: true,
						active: true,
						user: {
							select: {
								id: true,
								name: true,
								email: true,
								image: true,
							},
						},
					},
				},
				owner: {
					select: {
						id: true,
						name: true,
						image: true,
						email: true,
					},
				},
			},
			where: {
				AND: [
					{ id: teamId },
					{
						OR: [
							{ ownerId: user.id },
							{ teamMembers: { some: { userId: user.id } } },
						],
					},
				],
			},
		});

		if (!team) return null;

		return team as TeamDashboardExtended;
	});

export const getTeamPlayers = authActionClient
	.schema(
		z.object({
			teamId: z.string(),
		})
	)
	.action(async ({ parsedInput: { teamId }, ctx: { user } }) => {
		if (!user || !teamId) {
			return null;
		}

		const team = await prisma.team.findFirst({
			where: {
				ownerId: user.id,
			},
		});

		if (!team || team.ownerId != user.id) return null;
		const teamMembers = await prisma.teamMember.findMany({
			where: {
				teamId,
			},
			include: {
				user: true,
				playerProfile: true,
			},
		});

		return teamMembers;
	});

export const getPlayersSelected = authActionClient
	.schema(
		z.object({
			matchId: z.string(),
		})
	)
	.action(async ({ parsedInput: { matchId }, ctx: { user } }) => {
		if (!user || !matchId) {
			return null;
		}

		const match = await prisma.match.findFirst({
			where: {
				id: matchId,
			},
			select:{
				playerSelected: true
			}
		});

		if (!match) return []

		const ids: string[] = []
		match.playerSelected.forEach((player)=>{
			ids.push(player.id)
		})

		return ids;
	});

async function generateCode() {
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	let code = "";
	for (let i = 0; i < 9; i++) {
		code += characters.charAt(
			Math.floor(Math.random() * characters.length)
		);
	}
	let existingCode = await prisma.team.findFirst({
		where: {
			joinCode: code,
		},
	});
	if (existingCode) {
		return generateCode();
	}

	return code;
}
