import { IconAnalyze } from "@tabler/icons-react";
import { getI18n } from "../../../locales/server";
import { Session } from "next-auth";
import { SignInButton } from "../atoms/authButtons/AuthButtons";
import { signIn, signOut } from "next-auth/react";
import { DropdownMenu } from "../molecules/DropdownMenu";
import ProfilMenus from "@/datas/ProfilMenus"


interface NavbarProps {
    session: Session | null
}

export default async function Navbar({ session }: NavbarProps) {
    const t = await getI18n();
    return (
        <header className="bg-white dark:bg-gray-900">
            <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
                <a className="block text-lightOrange hover:text-darkBlue dark:text-lightOrange" href="/">
                    <span className="sr-only">Home</span>
                    <IconAnalyze width={32} height={32} className="animate-spin transition-duration: 75ms;" />
                </a>

                <div className="flex flex-1 items-center justify-end md:justify-between">
                    <nav aria-label="Global" className="hidden md:block text-gray-600">
                        <ul className="flex items-center gap-6 text-sm">
                            {ProfilMenus.mainMenus.map((menu: { link: string, name: string }, index) => {
                                return (
                                    <li>
                                        <a
                                            key={index}
                                            className="text-gray-600 transition hover:text-gray-600/75 dark:text-white dark:hover:text-white/75"
                                            href={menu.link}
                                        >
                                            {t(`menus.${menu.name}`)}
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>

                    <div className="flex items-center gap-4">
                        <div className="sm:flex sm:gap-4">
                            {session && session.user ? (
                                <DropdownMenu personalMenus={ProfilMenus.personalMenus} signOut={signOut} image={session.user.image ? session.user.image : "/static/img/defaultProfilePicture.png"} />
                            ) : (
                                <SignInButton signIn={signIn} text={t("auth.signIn")} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}