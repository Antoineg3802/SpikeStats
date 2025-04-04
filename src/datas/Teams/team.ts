export interface TeamDashboardExtended {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    logo: string | null;
    ownerId?: string;
    owner?: {
        id: string;
    };
    teamMembers: {
        id: string;
        user: {
            id: string;
            name: string;
        };
    }[];
}