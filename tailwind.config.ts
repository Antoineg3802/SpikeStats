import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	darkMode: 'selector',
	theme: {
		extend: {
			colors: {
				white: "#fff",
				black: "#000000",
				darkBlue: "#0B2647",
				lightOrange: "#feb272",
				orange: "#ff7f32",
				red: "#dc3545",
				lightRed: "#f8d7da",
				transparent: "rgba(0,0,0,0.5)",
			},
		},
	},
	plugins: [],
};
export default config;
