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
					endedAt: session.ended_at
						? new Date(session.ended_at * 1000)
						: null,
				},
			});

			if (subscription) {
				code = 201;
			} else {
				error = "Error creating subscription";
				code = 500;
			}

			break;
		case "customer.subscription.updated":
			const updatedSession = body.data.object;

			const updatedStripeCustomerId = updatedSession.customer as string;
			const updatedUser = await findUserFromCustomerId(
				updatedStripeCustomerId
			);

			if (updatedUser === null) {
				error = "User not found";
				code = 404;
				break;
			}

			const updatedProduct = await stripe.products.retrieve(
				updatedSession.items.data[0].price.product as string
			);

			if (updatedProduct === null) {
				error = "Product not found";
				code = 404;
				break;
			}

			// Mettre à jour le plan de l'utilisateur
			let updatedSubscription = await prisma.subscription.update({
				where: {
					userId: updatedUser.id,
				},
				data: {
					productId: updatedSession.items.data[0].price
						.product as string,
					active: updatedSession.status == "active",
					subscriptionStripeId: updatedSession.id as string,
					startedAt: new Date(updatedSession.start_date * 1000),
					endedAt: updatedSession.ended_at
						? new Date(updatedSession.ended_at * 1000)
						: null,
				},
			});

			if (updatedSubscription) {
				code = 202;
			} else {
				error = "Error updating subscription";
				code = 500;
			}

			break;
		case "customer.subscription.deleted":
			const deletedSession = body.data.object;
			const deletedStripeCustomerId = deletedSession.customer as string;
			const deletedUser = await findUserFromCustomerId(
				deletedStripeCustomerId
			);
			if (deletedUser === null) {
				error = "User not found";
				code = 404;
				break;
			}
			// Mettre à jour le plan de l'utilisateur
			let deletedSubscription = await prisma.subscription.update({
				where: {
					userId: deletedUser.id,
				},
				data: {
					active: false,
					subscriptionStripeId: deletedSession.id as string,
					endedAt: deletedSession.ended_at
						? new Date(deletedSession.ended_at * 1000)
						: new Date(),
				},
			});
			if (deletedSubscription) {
				code = 204;
			} else {
				error = "Error deleting subscription";
				code = 500;
			}
			break;
		default:
			error = "Event not supported";
			code = 200;
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
