import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe/stripe";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (req: NextRequest) => {
	const body = (await req.json()) as Stripe.Event;
	let error: string | null = null;
	let code: number = 0;

	switch (body.type) {
		case "customer.subscription.created":
			const session = body.data.object;

			// Récupérer les informations du client et les métadonnées
			const stripeCustomerId = session.customer as string;

			// Vérifier si l'utilisateur existe
			const user = await findUserFromCustomerId(stripeCustomerId);

			if (user === null) {
				error = "User not found";
				code = 404;
				break;
			}

			const product = await stripe.products.retrieve(
				session.items.data[0].price.product as string
			);

			if (product === null) {
				error = "Product not found";
				code = 404;
				break;
			}

			// Mettre à jour le plan de l'utilisateur
			let subscription = await prisma.subscription.create({
				data: {
					productId: session.items.data[0].price.product as string,
					active: true,
					userId: user.id,
					subscriptionStripeId: session.id as string,
					startedAt: new Date(session.start_date * 1000),
					endedAt: session.ended_at ? new Date(session.ended_at * 1000) : null,
				},
			})

			if (subscription){
				code = 200;
			}else{
				error = "Error creating subscription";
				code = 500;
			}

			break;
		case "customer.subscription.updated":
			//TODO: Traiter l'abonnement mis à jour
			error = "Not implemented";
			code = 501;
			break;
		case "customer.subscription.deleted":
			//TODO: Traiter l'abonnement résilié
			error = "Not implemented";
			code = 501;
			break;
		default:
			error = "Event not supported";
			code = 400;
			break;
	}

	if (error !== null) {
		return NextResponse.json(
			{ error: "Erreur lors de la mise à jour de l'utilisateur" },
			{ status: code }
		);
	} else {
		return NextResponse.json({ received: true, status: code });
	}
};

const findUserFromCustomerId = async (stripeCustomerId: unknown) => {
	if (typeof stripeCustomerId !== "string") {
		return null;
	}
	return prisma.user.findFirst({
		where: {
			stripeCustomerId,
		},
	});
};
