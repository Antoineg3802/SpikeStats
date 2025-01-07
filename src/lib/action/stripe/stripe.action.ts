"use server"

import { stripe } from "../../stripe/stripe";
import { authActionClient } from "../action";
import { z } from "zod";

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

export const getStripeProfil = authActionClient
.action(async ({ ctx: { user } }) => {
	return { user };
})

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
