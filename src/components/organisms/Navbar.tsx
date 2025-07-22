import { Volleyball } from "lucide-react";
import { getI18n } from "@/locales/server";
import ProfilMenus from "@/datas/ProfilMenus"
import Link from "next/link";
import { NavbarSessionPart } from "../molecules/NavbarSessionPart";

export default async function Navbar() {
    const t = await getI18n();
    return (
        <header className="bg-background shadow-sm">
            <div className="mx-auto flex h-16 max-w-(--breakpoint-xl) items-center gap-8 px-4 sm:px-6 lg:px-8">
                <Link className="block text-primary hover:text-darkbackground" href="/">
                    <span className="sr-only">Home</span>
                    <Volleyball width={32} height={32} className="animate-spin transition-duration: 75ms;" />
                </Link>

                <div className="flex flex-1 items-center justify-end md:justify-between">
                    <nav aria-label="Global" className="hidden md:block text-foreground-600">
                        <ul className="flex items-center gap-6 text-sm">
                            {ProfilMenus.mainMenus.map((menu: { link: string, name: string }, index) => {
                                return (
                                    <li key={index}>
                                        <Link
                                            prefetch={true}
                                            className="text-foreground transition hover:text-primary/75"
                                            href={menu.link}
                                        >
                                            {/* @ts-ignore */}
                                            {t(`menus.${menu.name}`)}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>

                    <div className="flex items-center gap-4">
                        <div className="sm:flex sm:gap-4">
                            <NavbarSessionPart />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}