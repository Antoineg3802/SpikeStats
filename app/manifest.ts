import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "SpikeStats",
		short_name: "SStats",
		icons: [
			{
				src: "/icon-96x96.png",
				sizes: "96x96",
				type: "image/png",
				purpose: "maskable",
			},
			{
				src: "/icon-192x192.png",
				sizes: "192x192",
				type: "image/png",
				purpose: "any",
			},
			{
				src: "/icon-512x512.png",
				sizes: "512x512",
				type: "image/png",
				purpose: "maskable",
			},
		],
		start_url: `/fr/dashboard`,
		theme_color: "#feb272",
		background_color: "#ffffff",
		display: "standalone",
	};
}
