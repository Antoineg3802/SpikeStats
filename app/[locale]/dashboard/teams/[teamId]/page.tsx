import Loader from "@/components/atoms/Loader";
import DashboardPage from "@/components/pages/DashboardPage";
import TeamDisplayComponent from "@/components/pages/TeamDisplayComponent";
import { Session } from "@/datas/session";
import { TeamDashboardExtended } from "@/datas/Teams/team";
import { getTeamById } from "@/lib/action/team/team.action";
import { auth } from "@/lib/auth/auth";

export default async function Page({
    params,
}: {
    params: Promise<{ teamId: string }>
}) {
    const session = await auth() as Session | null;
    const { teamId } = await params;

    return (
        <DashboardPage session={session}>
            {!session || !session?.user || (!session?.user?.subscription && session?.user?.subscription?.active) ? (
                <p className="text-red-500">Vous devez être connecté pour accéder à cette page.</p>
            ) : (
                <TeamDisplayComponent teamId={teamId} session={session} />
            )}
        </DashboardPage>
    )
}