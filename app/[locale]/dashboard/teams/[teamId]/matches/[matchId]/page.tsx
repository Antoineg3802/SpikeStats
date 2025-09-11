import DashboardPageTitle from "@/components/atoms/Titles/DashboardPageTitle";
import MatchDisplayComponent from "@/components/pages/MatchDisplayComponent";
import { getMatchById } from "@/lib/action/match/match.action";

export default async function Page({
	params,
}: {
	params: Promise<{ matchId: string }>;
}) {
	const { matchId } = await params;

	return (
		<MatchDisplayComponent matchId={matchId} />
	);
}