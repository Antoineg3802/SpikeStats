import TeamDisplayComponent from "@/components/pages/TeamDisplayComponent";
import { Session } from "@/datas/session";
import { auth } from "@/lib/auth/auth";

export default async function Page({
	params,
}: {
	params: Promise<{ teamId: string }>;
}) {
	const session = (await auth()) as Session | null;
	const { teamId } = await params;

	return <TeamDisplayComponent teamId={teamId} session={session} />;
}
