"use client"

import { IconChevronDown, IconLogout } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useI18n } from "../../../locales/client";
import Switch from "../atoms/Switch";

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

    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(theme === 'dark' ? 'light' : 'dark');
        root.classList.add(theme);
    }, [theme]);

    function handleThemeSwitcherClick() {
        setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
    }

    return (
        <div className="relative">
            <div onClick={() => handleOpen()} className="inline-flex items-center overflow-hidden shadow-inner rounded-md border border-gray-300 overflow-hidden p-1 hover:bg-gray-50 hover:text-gray-700 hover:cursor-pointer">
                <span className="sr-only">Toggle dashboard menu</span>

                <img
                    src={image ? image : "/img/defaultProfilePicture.png"}
                    width={32}
                    height={32}
                    alt=""
                    className="object-cover rounded-full"
                />

                <IconChevronDown width={18} height={18} className={isOpen ? "rotate-180" : "rotate-0" + 'transition-all duration-200 ease-in-out'} />
            </div>

            {isOpen && (
                <div
                    className="absolute right-0 z-10 mt-2 w-56 rounded-md border border-gray-100 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900"
                    role="menu"
                >
                    <div className="p-2">
                        {personalMenus.map((menu: {link: string, name: string}, index) => {
                            return (
                                <a
                                    key={index}
                                    href={menu.link}
                                    className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                                    role="menuitem"
                                >
                                    {/* @ts-ignore */}
                                    {t(`menus.${menu.name}`)}
                                </a>
                            )
                        })}

                        <div className="select-none text-sm flex items-center gap-4 rounded-lg px-4 py-2 text-sm text-gray-500 dark:text-gray-300">
                            {t("menus.darkmode")}
                            <Switch onClick={handleThemeSwitcherClick} />
                        </div>

                        <button
                            type="submit"
                            className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                            role="menuitem"
                            onClick={signOut}
                        >
                            <IconLogout />
                            Se déconnecter
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
