"use client"

import ThemeSwitcher from "@/components/ThemeSwitcher";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Home() {
	const { data: session, status } = useSession();

	if (status === "loading") {
		return <p>Chargement...</p>;
	}else{
		return (
			<div>
				<ThemeSwitcher />
				{session != null && session.user &&
					<>
						Signed in as {session.user.email} <br />
						<button onClick={() => signOut()}>Sign out</button>
					</>
				}
	
				{session == null &&
					<>
						Not signed in <br />
						<button onClick={() => signIn()}>Sign in</button>
					</>
				}
			</div>
		);
	}

}
