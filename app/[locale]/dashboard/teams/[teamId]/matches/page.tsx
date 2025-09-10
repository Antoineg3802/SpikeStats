import DashboardPageTitle from "@/components/atoms/Titles/DashboardPageTitle";
import FormAddMatch from "@/components/organisms/FormAddMatch";
import MatchList from "@/components/organisms/MatchList";

export default async function Page({ params }: { params: Promise<{teamId: string}> }) {
	const { teamId } = await params;

	return (
		<>
			<DashboardPageTitle title="Nos Matchs" />
			<div className="mb-4">
				<p className="text-sm text-gray-500">
					Cette page vous permet de gérer les équipes de votre
					organisation.
				</p>
				<p className="text-sm text-gray-500">
					Vous pouvez ajouter, modifier ou supprimer des équipes.
				</p>
			</div>
			<MatchList teamId={teamId} />
			<FormAddMatch teamId={teamId} />
		</>
	);
}
