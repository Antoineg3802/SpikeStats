"use client";
import { Icon, IconAnalyze } from "@tabler/icons-react";
import { Session } from "next-auth";
import { DashboardMenus } from "@/datas/ProfilMenus";
import { usePathname } from "next/navigation";
import { useI18n } from "../../../locales/client";
import React from "react";

interface NavbarDashboardProps {
	session: Session | null;
}

export default function NavbarDashboard({}: NavbarDashboardProps) {
	const t = useI18n();
	const pathname = usePathname();

	// enlever le /fr/ ou /en/ de l'url
	const url = "/" + pathname.split("/").slice(2).join("/");

	return (
		<header className="w-1/6 h-full bg-lightOrange flex flex-col justify-center">
			<a
				className="block text-white w-fit mx-auto hover:text-darkBlue dark:text-lightOrange"
				href="/"
			>
				<span className="sr-only">Home</span>
				<IconAnalyze
					width={46}
					height={46}
					className="animate-spin transition-duration: 75ms;"
				/>
			</a>
			<div className="flex flex-col items-start w-3/4 mx-auto mt-8 gap-3">
				{DashboardMenus.map((menu, index) => {
					const IconComponent = menu.icon;
					let textColor =
						url === menu.link ? "text-darkBlue" : "text-white";

					return (
						<div className="flex" key={index}>
							<a
								className={
									textColor +
									" text-xl transition hover:text-darkBlue dark:text-white dark:hover:text-white/75 flex gap-2"
								}
								href={menu.link}
							>
								<IconComponent />
								{/* @ts-ignore */}
								{t(`menus.${menu.name}`)}
							</a>
						</div>
					);
				})}
			</div>
		</header>
	);
}
