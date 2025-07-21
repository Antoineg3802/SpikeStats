export default {
	hello: "Hello",
	"hello.world": "Welcome to the world!",
	welcome: "Welcome {name}!",
	auth: {
		signIn: "Sign in",
		signOut: "Sign out",
	},
	menus: {
		dashboard: "Dashboard",
		profile: "Profile",
		settings: "Settings",
		darkmode: "Dark mode",
		language: "Language",
		about: "About",
		services: "Services",
		contact: "Contact",
		solutions: "Solutions",
		aboutUs: "About us",
		biling: "Billing",
		matches: "Matches",
		teams: "Teams",
	},
	pages: {
		home: {
			title: "Spikestats: Management and Planning Tool for Volleyball",
			description:
				"Optimize your volleyball team's performance with Spikestats, your complete solution for statistics management, team organization, and strategic match planning.",
			cta: "Explore our solutions",
			sections: {
				warningDev: {
					title: "This site is under construction",
					description:
						"Stay tuned to discover our innovative solutions for volleyball.",
					cta: "Sign up to be notified",
				},
				stats: {
					title: "Statistics Management: Performance Analysis",
					data: "Data Collection",
					points: {
						1: "Identify key volleyball stats (points scored, receptions, assists, blocks, effective serves).",
						2: "Use Spikestats to collect and track data during matches and training sessions.",
						3: "Involve players and staff to ensure comprehensive data collection.",
					},
					analysis: "Analysis and Interpretation",
					analysisPoints: {
						1: "Turn raw data into performance indicators (success rate, game trends, strengths and areas for improvement).",
						2: "Use charts and tables to visualize and understand the statistics.",
						3: "Identify areas for improvement individually and collectively.",
					},
					decision: "Decision Making",
					decisionPoints: {
						1: "Adjust strategies and tactics based on the analysis.",
						2: "Personalize training sessions to address identified weaknesses.",
						3: "Evaluate player performance to optimize team composition.",
					},
				},
				team: {
					title: "Team Organization: Cohesion and Efficiency",
					communication: "Effective Communication",
					communicationPoints: {
						1: "Use messaging apps and schedule regular meetings for smooth communication.",
						2: "Share important information (schedules, locations, changes) with the entire team.",
						3: "Encourage open dialogue and constructive feedback.",
					},
					roles: "Role Definition",
					rolesPoints: {
						1: "Clearly assign roles and responsibilities (players, coaches, technical staff).",
						2: "Promote collaboration and mutual support to strengthen team cohesion.",
					},
					spirit: "Team Spirit",
					spiritPoints: {
						1: "Organize team-building activities to strengthen bonds.",
						2: "Celebrate successes and learn from challenges as a team.",
					},
				},
				planning: {
					title: "Match Planning: Preparation and Strategy",
					strategy: "Match Strategy",
					strategyPoints: {
						1: "Analyze the team’s strengths and weaknesses to tailor your strategy.",
						2: "Develop specific tactics and schedule targeted training sessions.",
					},
					live: "Live Match Monitoring",
					livePoints: {
						1: "Monitor player performance in real-time and adjust your strategy.",
						2: "Clearly communicate instructions during the match.",
						3: "Analyze post-match performance to identify areas for improvement.",
					},
				},
			},
		},
		comingSoon: {
			title: "Coming Soon",
			description:
				"Our site is under construction. Stay tuned to discover our innovative solutions for volleyball.",
			cta: "Sign up to be notified",
			sections: {
				features: {
					title: "Upcoming Features",
					points: {
						1: "Advanced performance analysis.",
						2: "Team planning tools.",
						3: "Real-time match statistics.",
					},
				},
				subscribe: {
					title: "Sign up to be notified",
					description:
						"Be the first to discover our features and receive updates about our launch.",
					emailPlaceholder: "Enter your email address",
					submitButton: "Sign up",
				},
			},
		},
	},
} as const;
