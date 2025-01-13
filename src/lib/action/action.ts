import { createSafeActionClient } from "next-safe-action";
import { getCurrentUser } from "../auth/auth";

export const actionClient = createSafeActionClient();

export const authActionClient = actionClient.use(async ({ next }) => {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		throw new Error("You are not allowed to create a user");
	}

	return next({ ctx: { user: currentUser } });
});
