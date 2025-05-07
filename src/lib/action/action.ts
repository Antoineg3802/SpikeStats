import { createSafeActionClient } from 'next-safe-action';

export const actionClient = createSafeActionClient();

export const authActionClient = actionClient.use(async ({ next }) => {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		throw new Error("User not authenticated");
	}

	return next({ ctx: { user: currentUser } });
});
