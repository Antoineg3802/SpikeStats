export default {
	hello: "Bonjour",
	"hello.world": "Bienvenue au monde!",
	welcome: "Bienvenue {name}!",
	auth: {
		signIn: "Se connecter",
		signOut: "Se déconnecter",
	},
	menus: {
		dashboard: "Tableau de bord",
		profile: "Profil",
		settings: "Paramètres",
		darkmode: "Mode sombre",
		language: "Langue",
		about: "À propos",
		services: "Services",
		contact: "Contact",
		solutions: "Solutions",
		aboutUs: "À propos",
		biling: "Facturation",
		matches: "Matches",
		teams: "Équipes",
	},
	pages: {
		home: {
			title: "Spikestats : Outil de gestion et planification pour Volleyball",
			description:
				"Optimisez la performance de votre équipe de volleyball grâce à Spikestats, votre solution complète pour la gestion des statistiques, l'organisation d'équipe et la planification stratégique des matchs.",
			cta: "Découvrez nos solutions",
			sections: {
				warningDev: {
					title: "Ce site est en cours de développement",
					description:
						"Restez à l'écoute pour découvrir nos solutions innovantes pour le volleyball.",
					cta: "Abonnez-vous à notre newsletter !",
				},
				stats: {
					title: "Gestion des statistiques : Analyse de performance",
					data: "Collecte de données",
					points: {
						1: "Identifiez les statistiques clés du volleyball (points marqués, réceptions, passes décisives, blocs, services efficaces).",
						2: "Utilisez Spikestats pour collecter et suivre les données lors des matchs et des entraînements.",
						3: "Impliquez joueurs et staff pour une collecte de données exhaustive.",
					},
					analysis: "Analyse et interprétation",
					analysisPoints: {
						1: "Transformez les données brutes en indicateurs de performance (taux de réussite, tendances de jeu, points forts et axes d'amélioration).",
						2: "Utilisez des graphiques et des tableaux pour visualiser et comprendre les statistiques.",
						3: "Identifiez les domaines à améliorer, individuellement et collectivement.",
					},
					decision: "Prise de décision",
					decisionPoints: {
						1: "Ajustez stratégies et tactiques en fonction des analyses.",
						2: "Personnalisez les entraînements pour corriger les faiblesses identifiées.",
						3: "Évaluez la performance des joueurs pour optimiser la composition de l’équipe.",
					},
				},
				team: {
					title: "Organisation de l'équipe : Cohésion et efficacité",
					communication: "Communication efficace",
					communicationPoints: {
						1: "Utilisez des applications de messagerie et organisez des réunions régulières pour une communication fluide.",
						2: "Diffusez les informations importantes (horaires, lieux, changements) à l'ensemble de l'équipe.",
						3: "Encouragez un dialogue ouvert et le feedback constructif.",
					},
					roles: "Définition des rôles",
					rolesPoints: {
						1: "Attribuez clairement les rôles et responsabilités (joueurs, entraîneurs, staff technique).",
						2: "Favorisez la collaboration et le soutien mutuel pour renforcer la cohésion.",
					},
					spirit: "Esprit d'équipe",
					spiritPoints: {
						1: "Organisez des activités de team building pour renforcer les liens.",
						2: "Célébrez les succès et apprenez des défis rencontrés en équipe.",
					},
				},
				planning: {
					title: "Planification des matchs : Préparation et stratégie",
					strategy: "Stratégie de match",
					strategyPoints: {
						1: "Analysez les forces et faiblesses de l'équipe pour adapter votre stratégie.",
						2: "Développez des tactiques spécifiques et organisez des séances d'entraînement ciblées.",
					},
					live: "Suivi en match",
					livePoints: {
						1: "Surveillez la performance des joueurs en temps réel et ajustez la stratégie.",
						2: "Communiquez clairement les consignes pendant le match.",
						3: "Analysez les performances post-match pour identifier les axes d'amélioration.",
					},
				},
			},
		},
		comingSoon: {
			title: "Bientôt disponible",
			description:
				"Notre site est en cours de construction. Restez à l'écoute pour découvrir nos solutions innovantes pour le volleyball.",
			cta: "Inscrivez-vous pour être informé",
			sections: {
				subscribe: {
					title: "Inscrivez-vous pour être informé",
					description:
						"Soyez parmis les premiers à découvrir nos fonctionnalités et à recevoir des mises à jour sur notre lancement.",
					emailPlaceholder: "Entrez votre adresse e-mail",
					submitButton: "S'inscrire",
				},
			},
		}
	},
} as const;
