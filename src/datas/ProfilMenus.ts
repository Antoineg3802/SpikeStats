import { Icon, IconUsers , IconLayoutDashboard, IconUser, IconFileDollar, IconSettings, IconBallVolleyball } from '@tabler/icons-react';

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
			name: "pricing",
			link: "/pricing",
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
		icon: IconLayoutDashboard,
	},
	{
		name: "profile",
		link: "/dashboard/profil",
		icon: IconUser
	},
	{
		name: "biling",
		link: "/dashboard/biling",
		icon: IconFileDollar
	},
	{
		name: "settings",
		link: "/dashboard/settings",
		icon: IconSettings
	},
	{
		name: "matches",
		link: "/dashboard/matches",
		icon: IconBallVolleyball
	},
	{
		name: "teams",
		link: "/dashboard/teams",
		icon: IconUsers
	}
]

interface DashboardMenus {
	name: string;
	link: string;
	icon: Icon;
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
