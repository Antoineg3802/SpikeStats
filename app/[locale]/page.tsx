import ThemeSwitcher from "@/components/atoms/ThemeSwitcher";
import { signIn, signOut } from "next-auth/react";
import LocaleSelector from "@/components/atoms/LocaleSelector";
import Navbar from "@/components/organisms/Navbar";
import { auth } from "@/lib/auth/auth";
import { getI18n } from "../../locales/server";

export default async function Home() {
	const session = await auth()
	const t = await getI18n();

	return (
		<div>
			<Navbar session={session} />
			<LocaleSelector />
			{/* <ThemeSwitcher /> */}
		</div>
	);
}
