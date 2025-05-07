"use client"

import { useEffect, useState } from "react";
import { useI18n } from "../../../locales/client";
import Image from "next/image";
import { useTheme } from "next-themes";
import ThemeSwitcher from "../atoms/ThemeSwitcher";
import { ChevronDown, LogOut } from "lucide-react";
import Link from "next/link";

interface DropdownMenuProps {
    image: string;
    personalMenus: {name: string, link: string}[];
    signOut: () => void;
}

export const DropdownMenu = ({ image, signOut, personalMenus }: DropdownMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const t = useI18n();

    const handleOpen = () => {
        setIsOpen(!isOpen);
    };

    const { theme, setTheme } = useTheme();

    useEffect(() => {
    }, [theme]);

    function handleThemeSwitcherClick() {
        setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
    }

    return (
        <div className="relative">
            <div onClick={() => handleOpen()} className="inline-flex items-center shadow-inner rounded-md border border-foreground-300 overflow-hidden p-1 hover:bg-foreground-50 hover:text-foreground-700 hover:cursor-pointer">
                <span className="sr-only">Toggle dashboard menu</span>

                {image ? (
                    <Image
                        src={image}
                        width={32}
                        height={32}
                        alt=""
                        className="object-cover rounded-full"
                        quality={100}
                    />
                ) : (
                    <Image
                        src={"/img/defaultProfilePicture.png"}
                        width={32}
                        height={32}
                        alt=""
                        className="object-cover rounded-full"
                        quality={100}
                    />
                )}
                <ChevronDown width={18} height={18} className={isOpen ? "rotate-180" : "rotate-0" + ' transition-all duration-200 ease-in-out stroke-foreground'} />
            </div>

            {isOpen && (
                <div
                    className="absolute right-0 z-10 mt-2 w-56 rounded-md border border-foreground-100 text-foreground bg-background shadow-lg"
                    role="menu"
                >
                    <div className="p-2">
                        {personalMenus.map((menu: {link: string, name: string}, index) => {
                            return (
                                <Link
                                    key={index}
                                    href={menu.link}
                                    className="block rounded-lg px-4 py-2 text-sm text-foreground-500 hover:bg-foreground-50 hover:text-foreground-700"
                                    role="menuitem"
                                >
                                    {/* @ts-ignore */}
                                    {t(`menus.${menu.name}`)}
                                </Link>
                            )
                        })}

                        <div className="select-none flex items-center gap-4 rounded-lg px-4 py-2 text-sm text-foreground-500">
                            {t("menus.darkmode")}
                            <ThemeSwitcher handleThemeChange={handleThemeSwitcherClick} theme={theme} />
                        </div>

                        <button
                            type="submit"
                            className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:cursor-pointer hover:bg-red-50"
                            role="menuitem"
                            onClick={signOut}
                        >
                            <LogOut />
                            Se déconnecter
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
