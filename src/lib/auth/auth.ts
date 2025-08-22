import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma/prisma";
import GoogleProvider from "next-auth/providers/google";
import { env } from "@/lib/server/server";
import { sendVerificationRequest } from "@/lib/auth/mailer";
import Nodemailer from "next-auth/providers/nodemailer";
import { stripe } from "../stripe/stripe";
import { PrismaClient } from "@prisma/client";
import Resend from "next-auth/providers/resend";

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(prisma as PrismaClient),
	providers: [
		Resend({
			apiKey: env.RESEND_API_KEY,
			sendVerificationRequest
		}),
		GoogleProvider({
			clientId: env.GOOGLE_CLIENT_ID || "",
			clientSecret: env.GOOGLE_CLIENT_SECRET || "",
		}),
	],
	secret: env.NEXTAUTH_SECRET,
	callbacks: {
		async signIn({ user, account, profile }: any) {
			try {
				if (!account) {
					return true;
				}

				const existingUser = await prisma.user.findUnique({
					where: {
						email: user.email as string,
					},
				});

				if (existingUser) {
					await prisma.account.upsert({
						where: {
							provider_providerAccountId: {
								provider: account.provider,
								providerAccountId: account.providerAccountId,
							},
						},
						update: {
							userId: existingUser.id,
						},
						create: {
							type: "account",
							userId: existingUser.id,
							provider: account.provider,
							providerAccountId: account.providerAccountId,
						},
					});

					return true;
				}

				return true;
			} catch (error) {
				console.error("Erreur lors de la liaison des comptes :", error);
				return false;
			}
		},
		async session({ session }: any) {
			let subscription = await prisma.subscription.findFirst({
				where: {
					userId: session.user.id,
					active: true,
				},
			});
			if (subscription) {
				session.user.subscription = subscription;
			}
			return session;
		},
	},
	events: {
		createUser: async (message) => {
			const user = message.user;
			const { id, email, name } = user;

			if (!id || !email) {
				return;
			}

			// Search if a stripe customer already exists for this user to avoid stripe duplicates (DEV and eventually PROD)
			const existingStripeCustomerSearch = await stripe.customers.search({
				query: `email:"${email}"`,
			});

			if (existingStripeCustomerSearch.data.length > 0) {
				prisma.user.update({
					where: {
						id,
					},
					data: {
						stripeCustomerId:
							existingStripeCustomerSearch.data[0].id,
					},
				});
				const existingStripeCustomer = await stripe.customers.retrieve(
					existingStripeCustomerSearch.data[0].id as string
				);

				if (existingStripeCustomer) {
					const subscriptionSearch = await stripe.subscriptions.list({
						customer: existingStripeCustomer.id,
						limit: 1,
					});

					const subscription = await stripe.subscriptions.retrieve(
						subscriptionSearch.data[0].id as string
					);

					if (subscription) {
						const product = await stripe.products.retrieve(
							subscription.items.data[0].price.product as string
						);

						await prisma.subscription.create({
							data: {
								subscriptionStripeId: subscription.id,
								productId: product.id,
								userId: user.id as string,
								active: subscription.status == "active",
								startedAt: new Date(
									subscription.created * 1000
								),
								endedAt:
									subscription.ended_at == null
										? null
										: new Date(
												subscription.ended_at * 1000
										  ),
							},
						});
					}
				}
			} else {
				const stripeCustomer = await stripe.customers.create({
					email,
					name: name ?? undefined,
				});

				await prisma?.user.update({
					where: {
						id,
					},
					data: {
						stripeCustomerId: stripeCustomer.id,
					},
				});
			}
		},
	},
	session: {
		maxAge: 12 * 60 * 60, // (12 hours)
		updateAge: 24 * 60 * 60, // Increase Session if active (User making requests)
	},
});

export const getCurrentUser = async () => {
	const session = await auth();

	if (!session) {
		return null;
	}

	const user = await prisma.user.findUnique({
		where: {
			id: session.user?.id,
		},
	});

	return user;
};
