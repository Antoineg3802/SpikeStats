import type { Metadata } from "next";
import "./globals.css";

import { auth } from "@/lib/auth/auth";
import { ReactElement } from "react";
import { QueryClient } from "react-query";
import Providers from "./providers";
import { GeistSans } from "geist/font/sans";

export const metadata: Metadata = {
	title: "SpikeStats",
	description: "SpikeStats est un outil de statistiques et de plannification pour les matchs de volley-ball.",
	title: "SpikeStats",
	description: "SpikeStats est un outil de statistiques et de plannification pour les matchs de volley-ball.",
};

export default async function Layout({ children, params }: { children: ReactElement, params: Promise<{ locale: string }> }) {
	const { locale } = await params
	const session = await auth()

	return (
		<html lang={locale}>
			<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
			<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
			<link rel="shortcut icon" href="/favicon.ico" />
			<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
			<meta name="apple-mobile-web-app-title" content="SpikeStats" />
			<link rel="manifest" href="/site.webmanifest" />
			<body className={`${GeistSans.className} text-black antialiased min-h-screen min-w-screen bg-background dark:bg-foreground dark:text-white`}>
				<Providers locale={locale} session={session}>
					{children}
				</Providers>
			</body>
		</html>
	);
}
