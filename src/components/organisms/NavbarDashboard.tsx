"use client";
import { Volleyball } from "lucide-react";
import { Session } from "next-auth";
import { DashboardMenus } from "@/datas/ProfilMenus";
import { usePathname } from "next/navigation";
import { useI18n } from "../../locales/client";
import React from "react";
import Link from "next/link";

interface NavbarDashboardProps {
	session: Session | null;
}

export default function NavbarDashboard({}: NavbarDashboardProps) {
	const t = useI18n();
	const pathname = usePathname();

	// enlever le /fr/ ou /en/ de l'url
	const url = "/" + pathname.split("/").slice(2).join("/");

	return (
		<header className="w-1/6 h-full bg-primary flex flex-col justify-center">
			<Link
				className="block text-foreground w-fit mx-auto hover:text-background"
				href="/"
			>
				<span className="sr-only">Home</span>
				<Volleyball
					width={46}
					height={46}
					className="animate-spin transition-duration: 75ms;"
				/>
			</Link>
			<div className="flex flex-col items-start w-3/4 mx-auto mt-8 gap-3">
				{DashboardMenus.map((menu, index) => {
					const IconComponent = menu.icon;
					let textColor =
						url === menu.link ? "text-darkbackground" : "text-foreground";

					return (
						<div className="flex" key={index}>
							<Link 
								prefetch={true}
								className={
									textColor +
									" text-xl transition hover:text-foreground flex gap-2"
								}
								href={menu.link}
							>
								<IconComponent />
								{/* @ts-ignore */}
								{t(`menus.${menu.name}`)}
							</Link>
						</div>
					);
				})}
			</div>
		</header>
	);
}
