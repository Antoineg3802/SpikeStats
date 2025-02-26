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
		</div>
	);
}
