import ThemeSwitcher from "@/components/atoms/ThemeSwitcher";
import { signIn, signOut } from "next-auth/react";
import LocaleSelector from "@/components/atoms/LocaleSelector";
import Navbar from "@/components/organisms/Navbar";
import { auth } from "@/lib/auth/auth";
import Image from "next/image";

export default async function Home() {
	const session = await auth()

	return (
		<div>
			<Navbar session={session} />
			<LocaleSelector />
			<Image src={"/img/defaultProfilePicture.png"} alt={""} width={32} height={32}/>
		</div>
	);
}
