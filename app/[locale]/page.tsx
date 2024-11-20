import ThemeSwitcher from "@/components/atoms/ThemeSwitcher";
import { signIn, signOut } from "next-auth/react";
import LocaleSelector from "@/components/atoms/LocaleSelector";
import Navbar from "@/components/organisms/Navbar";
import { auth } from "@/lib/auth/auth";

export default async function Home() {
	const session = await auth()

	return (
		<div>
			<Navbar session={session} />
			<LocaleSelector />
		</div>
	);
}
