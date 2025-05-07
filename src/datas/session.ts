export interface User {
	id: string;
	name: string;
	username: string;
	email: string;
	emailVerified: string;
	image: string | null;
	createdAt: string;
	updatedAt: string;
	subscription?: Subscription;
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

export interface Subscription {
	id: string;
	subscriptionStripeId: string;
	productId: string;
	active: boolean;
	userId: string;
	startedAt: string;
	endedAt: string | null;
}
