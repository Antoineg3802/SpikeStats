export interface User {
	id: string;
	name: string;
	username: string;
	email: string;
	emailVerified: string;
	image: string | null;
	stripeCustomerId: string | null;
	createdAt: string;
	updatedAt: string;
	userPlan: string | null;
}

export interface Session {
	id: string;
	sessionToken: string;
	userId: string;
	expires: string;
	createdAt: string;
	updatedAt: string;
    user: User;
}
