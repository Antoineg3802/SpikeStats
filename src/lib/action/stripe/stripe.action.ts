"use server";

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

export const getPreviewSubscription = authActionClient
	.schema(
		z.object({
			priceId: z.string(),
		})
	)
	.action(async ({ parsedInput: { priceId }, ctx: { user } }) => {
		if (!user) {
			return { error: true, message: "User not found" };
		}

		if (!user.stripeCustomerId) {
			return { error: true, message: "User not found" };
		}

		const subscriptionSearch = await stripe.subscriptions.list({
			customer: user.stripeCustomerId,
			status: "active",
			limit: 1,
		});

		const subscription = await stripe.subscriptions.retrieve(
			subscriptionSearch.data[0].id as string
		);

		if (!subscription) {
			return { error: true, message: "No subscription in progress" };
		}

		const items = [
			{
				id: subscription.items.data[0].id,
				price: priceId,
			},
		];

		const invoice = await stripe.invoices.createPreview({
			subscription: subscription.id,
			subscription_details: {
				items: items,
				proration_date: Math.floor(Date.now() / 1000),
			},
		});

		const invoicePlain = JSON.parse(JSON.stringify(invoice));

		return invoicePlain;
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

		const subscriptionSearch = await stripe.subscriptions.list({
			customer: user.stripeCustomerId,
			status: "active",
			limit: 1,
		});

		const subscription = await stripe.subscriptions.retrieve(
			subscriptionSearch.data[0].id as string
		);

		if (!subscription) {
			return { error: true, message: "No subscription in progress" };
		}

		const newSubscription = await stripe.subscriptions.update(
			subscription.id,
			{
				items: [
					{
						id: subscription.items.data[0].id,
						price: priceId,
					},
				],
				proration_behavior: "create_prorations",
				proration_date: Math.floor(Date.now() / 1000),
			}
		);

		if (!newSubscription) {
			return {
				error: true,
				message: "Error while updating the subscription",
			};
		} else {
			return { success: true };
		}
	});
