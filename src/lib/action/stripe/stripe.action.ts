import { stripe } from "../../stripe/stripe";
import { authActionClient } from "../action";

export const stripeProductsClient = authActionClient
	.action(async () => {
        const products = await stripe.products.list({
            active: true,
            expand: ["data.default_price"],
        });

        return { products };
	});
