"use server";

import { Team, TeamMember } from "@prisma/client";
import { authActionClient } from "../action";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { TeamDashboardExtended } from "@/datas/Teams/team";

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

			const team = await prisma.team.create({
				data: {
					name: teamName,
					description,
					ownerId: user.id,
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
				owner: {
					select: {
						id: true,
					},
				},
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
					{ teamMembers: { some: { id: user.id } } },
					{ owner: { id: user.id } },
				],
				active: true,
			},
		});

		return teams as TeamDashboardExtended[];
	}
);

