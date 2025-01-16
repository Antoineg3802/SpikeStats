// types/next-pwa.d.ts
declare module "next-pwa" {
	import { NextConfig } from "next";

	interface NextPWAOptions {
		dest?: string;
		disable?: boolean;
		register?: boolean;
		skipWaiting?: boolean;
		buildExcludes?: string[];
		// etc. Cf. https://github.com/shadowwalker/next-pwa#available-options
	}

	function nextPWA(
		options?: NextPWAOptions
	): (nextConfig: NextConfig) => NextConfig;
	export default nextPWA;
}
