"use client"

import ThemeSwitcher from "@/components/ThemeSwitcher";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Home() {
	const { data: session, status } = useSession();

	const handleSignOutClick = () => {
		// Alert user before signing out
		if (confirm("Voulez vous vraiment vous déconnecter ?")){
			signOut();
		}
	}

	if (status === "loading") {
		return <p>Chargement...</p>;
	}else{
		return (
			<div>
				<ThemeSwitcher />
				{session != null && session.user &&
					<>
						Signed in as {session.user.email} <br />
						<button className={'dark:bg-black dark:text-white bg-lightOrange p-2 rounded hover:bg-black hover:text-lightOrange transition-all duration-300'} onClick={() => handleSignOutClick()}>Sign out</button>
					</>
				}

				{session == null &&
					<>
						Not signed in <br />
						<button className={'dark:bg-black dark:text-white bg-lightOrange p-2 rounded hover:bg-black hover:text-lightOrange transition-all duration-300 dark:'} onClick={() => signIn()}>Sign in</button>
					</>
				}
			</div>
		);
	}
}
