import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { SessionProvider } from "next-auth/react"
import { NextAuthProvider } from "@/lib/providers/NextAuthProvider";
import { LocaleProvider } from "@/lib/providers/LocaleProvider";
import { auth } from "@/lib/auth/auth";
import { ReactElement } from "react";
import { QueryClient } from "react-query";
import Providers from "./providers";
import { GeistSans } from "geist/font/sans";

export default async function Layout({ children, params }: { children: ReactElement, params: Promise<{ locale: string }> }) {
	const { locale } = await params

	const session = await auth()
	return (
		<html lang={locale} suppressHydrationWarning>
			<body className={`${GeistSans.className} text-foreground antialiased min-h-screen min-w-screen bg-background`}>
				<Providers locale={locale} session={session}>
					{children}
				</Providers>
			</body>
		</html>
	);
}
