import PlayerDisplayComponent from "@/components/pages/PlayerDisplayComponent";

export default async function Page({ params }: { params: { teamId: string } }) {
	const { teamId } = await params;

	return <PlayerDisplayComponent teamId={teamId} />
}
