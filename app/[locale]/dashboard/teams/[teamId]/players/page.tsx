import PlayerDisplayComponent from "@/components/pages/PlayerDisplayComponent";

export default async function Page({ params }: { params: Promise<{ teamId: string }> }) {
	const { teamId } = await params;

	return <PlayerDisplayComponent teamId={teamId} />
}
