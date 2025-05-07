export interface TeamDashboardExtended {
	id: string;
	name: string;
	description: string;
	createdAt: Date;
	logo: string | null;
	joinCode: string;
	ownerId?: string;
	owner?: {
		id: string;
		name: string;
		image: string;
		email: string;
	};
	teamMembers: {
		id: string;
		userId: string;
		role: string;
		active: boolean;
		user: {
			id: string;
			name: string;
			image: string;
			email: string;
		};
	}[];
}

export interface TeamMemberAdd {
	id: string;
	userId: string;
	role: string;
	active: boolean;
	user: {
		id: string;
		name: string;
	};
}
