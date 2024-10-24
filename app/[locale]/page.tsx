"use client"

import ThemeSwitcher from "@/components/ThemeSwitcher";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useI18n } from "../../locales/client";
import LocaleSelector from "@/components/LocaleSelector";

export default function Home() {
	const { data: session, status } = useSession();
	const t = useI18n();

	const handleSignOutClick = () => {
		if (confirm("Voulez vous vraiment vous déconnecter ?")){
			signOut();
		}
	}

	if (status === "loading") {
		return <p>Chargement...</p>;
	}else{
		return (
			<div>
				<LocaleSelector/>
				<ThemeSwitcher />
				{session != null && session.user &&
					<>
						{t('signed', { email: session.user.email })} <br />
						<button className={'dark:bg-black dark:text-white bg-lightOrange p-2 rounded hover:bg-black hover:text-lightOrange transition-all duration-300'} onClick={() => handleSignOutClick()}>Sign out</button>
					</>
				}

				{session == null &&
					<>
						{t('notSigned')} <br />
						<button className={'dark:bg-black dark:text-white bg-lightOrange p-2 rounded hover:bg-black hover:text-lightOrange transition-all duration-300 dark:'} onClick={() => signIn()}>Sign in</button>
					</>
				}
			</div>
		);
	}
}
