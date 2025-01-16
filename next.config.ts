import { NextConfig } from 'next';
import nextPwa from 'next-pwa';

const nextConfig : NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
				port: "",
				pathname: "/a/**",
				search: "",
			},
		],
	},
};

const withPWA = nextPwa({
	dest: "public", // dossier où stocker le SW
	register: true, // enregistre le service worker automatiquement
	skipWaiting: true, // force la maj instantanée du service worker
});

export default withPWA(nextConfig);
