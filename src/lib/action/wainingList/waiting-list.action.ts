"use server";

import { z } from "zod";
import { actionClient } from "../action";
import prisma from "@/lib/prisma/prisma";
import WaintingListInscriptionType from "@/datas/WaintingList/WaintingList";
import WaintingListConfirm from "@/components/emailTemplates/WaintingListConfirm";
import { sendEmail } from "@/lib/mailService/emailService";

export const registerWaintingList = actionClient
	.schema(
		z.object({
			email: z.string().email("Adresse e-mail invalide"),
			name: z.string().min(1, "Le nom est requis"),
		})
	)
	.action(async ({ parsedInput: { email, name } }) => {
		let parsedEmail = email.trim().toLowerCase();
		prisma.waitingList
			.findFirst({
				where: {
					email: parsedEmail,
				},
			})
			.then(async (existingEntry) => {
				if (existingEntry) {
					return {
						success: false,
						message: "Vous êtes déjà inscrit à la liste d'attente.",
					};
				}

				const confirmationToken = Math.random().toString(36);
				const tokenExpiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes

				const sendEmailResponse = sendEmail({
					to: parsedEmail,
					subject: "Confirmation d'inscription à la liste d'attente",
					react: WaintingListConfirm({
						confirmationUrl: `${
							process.env.NEXTAUTH_URL
						}confirm/waiting-list?token=${confirmationToken}&email=${encodeURIComponent(
							parsedEmail
						)}`,
					}),
					text: `Bonjour ${name},\n\nMerci de vous être inscrit à notre liste d'attente. Veuillez confirmer votre inscription en cliquant sur le lien suivant :\n\n${
						process.env.NEXT_PUBLIC_BASE_URL
					}/confirm-waiting-list?email=${encodeURIComponent(
						email
					)}\n\nCordialement,\nL'équipe`,
				});

				if (!sendEmailResponse) {
					return {
						success: false,
						message:
							"Erreur lors de l'envoi de l'e-mail de confirmation.",
					};
				}

				await prisma.waitingList.create({
					data: {
						email: parsedEmail,
						name: name,
						createdAt: new Date(),
						confirmToken: confirmationToken,
						tokenExpiresAt: tokenExpiresAt,
					},
				});

				return {
					success: true,
					message: "Inscription réussie à la liste d'attente.",
				} as WaintingListInscriptionType;
			});
	});

export const confirmWaintingList = actionClient
	.schema(
		z.object({
			token: z.string().min(1, "Le token est requis"),
			email: z.string().email("Adresse e-mail invalide"),
		})
	)
	.action(async ({ parsedInput: { token, email } }) => {
		const parsedEmail = email.trim().toLowerCase();

		const entry = await prisma.waitingList.findFirst({
			where: {
				email: parsedEmail,
				confirmToken: token,
				tokenExpiresAt: {
					gte: new Date(),
				},
			},
		});

		if (!entry) {
			return {
				success: false,
				message: "Lien de confirmation invalide ou expiré.",
			};
		}

		await prisma.waitingList.update({
			where: { id: entry.id },
			data: { confirmed: true, confirmToken: null, tokenExpiresAt: null },
		});

		return {
			success: true,
			message: "Inscription confirmée avec succès.",
		} as WaintingListInscriptionType;
	});
