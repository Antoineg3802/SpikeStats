import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	darkMode: "selector",
	theme: {
		extend: {
			colors: {
				white: "#fff",
				black: "#000000",
				darkBlue: "#0B2647",
				lightOrange: "#feb272",
				orange: "#ff7f32",
				lightRed: "#f8d7da",
				transparent: "rgba(0,0,0,0.5)",
				background: "#ffffff",
				foreground: "#171717",
			},
			listStyleImage: {
				checkmark: 'url("/img/checkmark.svg")',
			},
			keyframes: {
				l3: {
					"20%": {
						backgroundPosition: "0% 0%, 50% 50%, 100% 50%",
					},
					"40%": {
						backgroundPosition: "0% 100%, 50% 0%, 100% 50%",
					},
					"60%": {
						backgroundPosition: "0% 50%, 50% 100%, 100% 0%",
					},
					"80%": {
						backgroundPosition: "0% 50%, 50% 50%, 100% 100%",
					},
				},
			},
			animation: {
				l3: "l3 1s infinite linear",
			},
		},
	},
	plugins: [],
};
export default config;
