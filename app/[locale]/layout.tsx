import "./globals.css";

import { auth } from "@/lib/auth/auth";
import { ReactElement } from "react";
import Providers from "./providers";
import { GeistSans } from "geist/font/sans";

export default async function Layout({
	children,
	params,
}: {
	children: ReactElement;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const session = await auth();

	return (
		<html lang={locale} suppressHydrationWarning>
			<body
				className={`${GeistSans.className} text-foreground antialiased min-h-screen w-dvw bg-background`}
			>
				<Providers locale={locale} session={session}>
					{children}
				</Providers>
			</body>
		</html>
	);
}
