import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
		}),
	],
    secret: process.env.NEXTAUTH_SECRET,
	// callbacks: {
	// 	async signIn({ user, account, profile }) {
	// 		try {
	// 			if (!account) {
	// 				return true;
	// 			}

	// 			const existingUser = await prisma.user.findUnique({
	// 				where: {
	// 					email: user.email as string,
	// 				},
	// 			});

	// 			if (existingUser) {
	// 				await prisma.account.upsert({
	// 					where: {
	// 						provider_providerAccountId: {
	// 							provider: account.provider,
	// 							providerAccountId: account.providerAccountId,
	// 						},
	// 					},
	// 					update: {
	// 						userId: existingUser.id,
	// 					},
	// 					create: {
	// 						type: "account",
	// 						userId: existingUser.id,
	// 						provider: account.provider,
	// 						providerAccountId: account.providerAccountId,
	// 					},
	// 				});

	// 				return true;
	// 			}

	// 			return true;
	// 		} catch (error) {
	// 			console.error("Erreur lors de la liaison des comptes :", error);
	// 			return false;
	// 		}
	// 	},
	// },
	session: {
		maxAge: 12 * 60 * 60, // Set max session age to 12 hours
		updateAge: 24 * 60 * 60, // Increase Session if active (User making requests)
	},
};

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
