import { prisma } from "@/lib/prisma";
import { UserPlan } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (req: NextRequest) => {
	const body = (await req.json()) as Stripe.Event;

	if (body.type === "checkout.session.completed") {
		const session = body.data.object as Stripe.Checkout.Session;

		// Récupérer les informations du client et les métadonnées
		const stripeCustomerId = session.customer as string;

		// Vérifier si l'utilisateur existe
		const user = await findUserFromCustomerId(stripeCustomerId);
		if (!user) {
			console.error("Utilisateur introuvable");
			return NextResponse.json(
				{ error: "Utilisateur introuvable" },
				{ status: 400 }
			);
		}

		const userPlan = session.metadata?.userPlan as UserPlan;

		if (!userPlan) {
			console.error("Plan utilisateur introuvable");
			return NextResponse.json(
				{ error: "Plan utilisateur introuvable" },
				{ status: 400 }
			);
		}

		// Mettre à jour l'utilisateur dans la base de données
		await prisma.user.update({
			where: {
				id: user.id,
			},
			data: {
				userPlan,
			},
		});

		return NextResponse.json(
			{ message: "Utilisateur mis à jour" },
			{ status: 200 }
		);
	}

	return NextResponse.json(
		{ error: "Invalid session type" },
		{ status: 400 }
	);
};

export const findUserFromCustomerId = async (stripeCustomerId: unknown) => {
	if (typeof stripeCustomerId !== "string") {
		return null;
	}
	return prisma.user.findFirst({
		where: {
			stripeCustomerId,
		},
	});
};
