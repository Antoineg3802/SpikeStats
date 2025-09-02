import DashboardPage from "@/components/pages/DashboardPage";
import PlayerDisplayComponent from "@/components/pages/PlayerDisplayComponent";
import { Session } from "@/datas/session";
import { auth } from "@/lib/auth/auth";

export default async function Page({
	params,
}: {
	params: {teamId: string };
}) {
	const session = (await auth()) as Session | null;
	const { teamId } = await params;

	return (
		<DashboardPage session={session}>
			{!session ||
			!session?.user ||
			(!session?.user?.subscription &&
				session?.user?.subscription?.active) ? (
				<p className="text-red-500">
					Vous devez être connecté pour accéder à cette page.
				</p>
			) : (
				<PlayerDisplayComponent teamId={teamId} />
			)}
		</DashboardPage>
	);
}
