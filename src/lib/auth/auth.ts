import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { env } from "@/lib/server/server";
import {sendVerificationRequest} from "@/lib/auth/mailer";

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		EmailProvider({
			server: process.env.EMAIL_SERVER,
			from: process.env.EMAIL_FROM,
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
	},
	session: {
		maxAge: 12 * 60 * 60, // (12 hours)
		updateAge: 24 * 60 * 60, // Increase Session if active (User making requests)
	},
})
