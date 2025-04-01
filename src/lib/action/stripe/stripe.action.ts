"use server";

import { stripe } from "../../stripe/stripe";
import { authActionClient } from "../action";
import { z } from "zod";
import { redirect } from "next/navigation";

export const stripeProductsClient = authActionClient.action(async () => {
	const products = await stripe.products.list({
		active: true,
		expand: ["data.default_price"],
	});

	if (!products) {
		return null;
	}

	return { products: products.data };
});

export const getStripeProfil = authActionClient.action(
	async ({ ctx: { user } }) => {
		return { user };
	}
);

export const cancelSubscription = authActionClient
	.schema(
		z.object({
			subscriptionId: z.string(),
		})
	)
	.action(async ({ parsedInput: { subscriptionId } }) => {
		const subscription = await stripe.subscriptions.retrieve(
			subscriptionId
		);

		if (!subscription) {
			return { error: true, message: "Subscription not found" };
		} else {
			const subscriptionUpdate = await stripe.subscriptions.update(
				subscriptionId,
				{
					cancel_at_period_end: true,
				}
			);

			if (subscriptionUpdate) {
				return { success: true };
			} else {
				return {
					error: true,
					message: "Error while cancelling the subscription",
				};
			}
		}
	});

export const updateSubscription = authActionClient
	.schema(
		z.object({
			priceId: z.string(),
			userPlan: z.string(),
		})
	)
	.action(async ({ parsedInput: { priceId, userPlan }, ctx: { user } }) => {
		if (!user) {
			return { error: true, message: "User not found" };
		}

		if (!user.stripeCustomerId) {
			return { error: true, message: "User not found" };
		}

		const sessionStripe = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			line_items: [
				{
					price: priceId,
					quantity: 1,
				},
			],
			mode: "subscription",
			success_url: `${process.env.NEXTAUTH_URL}/dashboard/biling`,
			cancel_url: `${process.env.NEXTAUTH_URL}/dashboard/biling`,
			customer: user.stripeCustomerId,
			metadata: {
				userPlan,
			},
		});

		if (sessionStripe.url != null) {
			redirect(sessionStripe.url);
		} else {
			throw new Error(
				"Erreur lors de la création de la session de payement"
			);
		}
	});
