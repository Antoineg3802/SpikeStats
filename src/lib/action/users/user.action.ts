"use server";

import { actionClient, authActionClient } from "@/lib/action/action";
import { auth } from "@/lib/auth/auth";
import { stripe } from "@/lib/stripe/stripe";
import { Session } from "@/datas/session";
import Stripe from "stripe";
import prisma from "@/lib/prisma/prisma";
import { z } from "zod";
import { Position } from "@/lib/prisma/client";

export const getFullProfil = actionClient.action(async () => {
	const session = (await auth()) as Session;
	if (session?.user?.stripeCustomerId) {
		let customer = await stripe.customers.retrieve(
			session?.user?.stripeCustomerId
		);
		let invoices = await stripe.invoices.list({
			customer: session.user.stripeCustomerId,
		});
		customer = JSON.parse(JSON.stringify(customer));
		let arrayInvoices: Stripe.Invoice[] = JSON.parse(
			JSON.stringify(invoices.data)
		);

		return {
			customer,
			invoices: arrayInvoices,
		};
	} else {
		return null;
	}
});

export const getUserConnected = authActionClient.action(
	async ({ ctx: { user } }) => {
		if (!user) {
			return null;
		}

		return user;
	}
);

export const updatePlayerProfile = authActionClient
	.schema(
		z.object({
			playerProfileId: z.string().min(1, "Player Profile ID is required"),
			license: z
				.string()
				.min(8, "License must be at least 8 characters")
				.optional(),
			position: z.string().optional(),
            jerseyNumber: z.string().optional(),
		})
	)
	.action(
		async ({
			ctx: { user },
			parsedInput: { playerProfileId, license, position, jerseyNumber },
		}) => {
			if (!user) {
				return {success: false, data: "User not authenticated"};
			}
			if (!playerProfileId || playerProfileId.trim() === "") {
				return {success: false, data: "Player Profile ID is required"};
			}

			const playerProfile = await prisma.playerProfile.findFirst({
				where: {
					id: playerProfileId,
				},
			});

			if (!playerProfile) {
				return {success: false, data: "Player profile not found"};
			}

			const team = await prisma.team.findFirst({
				where: {
					id: playerProfile.teamId,
					ownerId: user.id,
				},
			});

			if (!team) {
				return {success: false, data: "User not authorized to update this profile"}
			}

			let validPosition = [
				"OUTSIDEHITTER",
				"MIDDLEBLOCKER",
				"OPPOSITEHITTER",
				"LIBERO",
				"SETTER",
			];
			let parsedPosition: Position | undefined = undefined;
			if (position && !validPosition.includes(position)) {
				return {success: false, data: "Invalid position value"};
			} else {
				parsedPosition = position as Position;
			}

            if (!jerseyNumber || isNaN(parseInt(jerseyNumber))) {
                return {success: false, data: "Jersey number must be a valid number"};
            }

            const jerseyNumberNum = parseInt(jerseyNumber); 

			if (
				position &&
				![
					"OUTSIDEHITTER",
					"MIDDLEBLOCKER",
					"OPPOSITEHITTER",
					"LIBERO",
					"SETTER",
				].includes(position)
			) {
				return {success: false, data: "Invalid position value"};
			}

			if (license && license.trim().length < 8) {
				return {success: false, data: "License must be at least 8 characters"};
			}

            const existingJerseyNumber = await prisma.playerProfile.findFirst({
                where: {
                    jerseyNumber: jerseyNumberNum,
                    teamId: playerProfile.teamId,
                    id: { not: playerProfileId },
                },
            });

            if (existingJerseyNumber) {
                return {success: false, data: "Jersey number already in use"};
            }

			const updatedProfile = await prisma.playerProfile.update({
				where: {
					id: playerProfileId,
				},
				data: {
					license: license,
					position: parsedPosition,
                    jerseyNumber: jerseyNumberNum,
				},
			});

			if (!updatedProfile) {
				return {success: false, data: "Failed to update profile"};
			}

			return {success: true, data: updatedProfile};
		}
	);
