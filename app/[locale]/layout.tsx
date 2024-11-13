import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { SessionProvider } from "next-auth/react"
import { NextAuthProvider } from "@/lib/providers/NextAuthProvider";
import { LocaleProvider } from "@/lib/providers/LocaleProvider";
import { auth } from "@/lib/auth/auth";
import { ReactElement } from "react";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "SpikeStats",
	description: "SpikeStats est un outil de statistiques et de plannification pour les matchs de volley-ball.",
};

export default async function Layout({ children, params }: { children: ReactElement, params: Promise<{ locale: string }> }) {
	const { locale } = await params

	const session = await auth()
	return (
		<html lang="en">
			<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
			<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
			<link rel="shortcut icon" href="/favicon.ico" />
			<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
			<meta name="apple-mobile-web-app-title" content="SpikeStats" />
			<link rel="manifest" href="/site.webmanifest" />
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen min-w-screen bg-background dark:bg-foreground dark:text-white`}>
				<NextAuthProvider session={session}>
					<LocaleProvider locale={locale}>
						{children}
					</LocaleProvider>
				</NextAuthProvider>
			</body>
		</html>
	);
}
