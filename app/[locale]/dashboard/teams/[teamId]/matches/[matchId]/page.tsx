export default async function Page({ params }: { params: Promise<{ matchId: string }> }) {
    const { matchId } = await params

    return <div>
        {matchId}
    </div>
}