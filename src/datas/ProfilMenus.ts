import { LayoutDashboard, LucideProps, Receipt, Settings, User, Users, Volleyball } from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';


const ProfilMenus: ProfilMenus = {
	mainMenus: [
		{
			name: "services",
			link: "/services",
		},
		{
			name: "contact",
			link: "/contact",
		},
		{
			name: "solutions",
			link: "/solutions",
		},
        {
			name: "about",
			link: "/more",
		},
	],
	personalMenus: [
		{
			name: "dashboard",
			link: "/dashboard",
		},
        {
			name: "settings",
			link: "settings",
		},
		{
			name: "profile",
			link: "/dashboard/profil",
		},
	],
};

export const DashboardMenus: DashboardMenus[] = [
	{
		name: "dashboard",
		link: "/dashboard",
		icon: LayoutDashboard,
	},
	{
		name: "profile",
		link: "/dashboard/profil",
		icon: User
	},
	{
		name: "biling",
		link: "/dashboard/biling",
		icon: Receipt
	},
	{
		name: "settings",
		link: "/dashboard/settings",
		icon: Settings
	},
	{
		name: "matches",
		link: "/dashboard/matches",
		icon: Volleyball
	},
	{
		name: "teams",
		link: "/dashboard/teams",
		icon: Users
	}
]

interface DashboardMenus {
	name: string;
	link: string;
	icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
}

interface ProfilMenus {
	mainMenus: {
		name: string;
		link: string;
	}[];
	personalMenus: {
		name: string;
		link: string;
	}[];
}

export default ProfilMenus;
