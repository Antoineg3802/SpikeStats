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
