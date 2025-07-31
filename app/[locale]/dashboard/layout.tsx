import "../globals.css";

import { auth } from "@/lib/auth/auth";
import { ReactElement } from "react";
import Providers from "../providers";
import { GeistSans } from "geist/font/sans";
import DevVisualizer from "@/components/atoms/DevVisualizer";
import Navbar from "@/components/organisms/Navbar";

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
					<div className="h-screen flex flex-col bg-background">
						{children}
					</div>
				</Providers>
			</body>
		</html>
	);
}
