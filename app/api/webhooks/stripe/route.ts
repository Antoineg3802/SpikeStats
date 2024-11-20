import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe/stripe";
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

		// Lister les produits commandés
		const lineItems = await stripe.checkout.sessions.listLineItems(
			session.id
		);

		// Exemple de traitement des produits commandés
		const productOrdered = lineItems.data[0];

		const stripeProduct = await stripe.products.retrieve(
			productOrdered.price?.product as string
		);

		try {
			const userPlan = stripeProduct.metadata.userPlan as UserPlan;

			// Récupérer un champ personnalisé depuis les métadonnées
			// const userPlan = session.metadata?.userPlan as UserPlan;

			if (!userPlan || !(userPlan in UserPlan)) {
				console.error("Invalid User Plan");
				return NextResponse.json(
					{ error: "Invalid User Plan" },
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
		} catch (e) {
			return NextResponse.json(
				{ message: "Une erreur s'est produite" },
				{ status: 500 }
			);
		}
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
