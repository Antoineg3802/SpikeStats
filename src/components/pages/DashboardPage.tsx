
import { Session } from "@/datas/session";
import NavbarDashboard from "../organisms/NavbarDashboard";
import { auth } from "@/lib/auth/auth";

interface DashboardPageProps {
    children: React.ReactNode
}

export default async function DashboardPage({children}: DashboardPageProps) {
    const session = await auth() as Session | null;

    return (
        <div className="h-screen w-screen flex overflow-hidden">
            <NavbarDashboard session={session} />
            <main className="flex-1 relative">
                {!session || !session.user.subscription ? (<p>Vous n'etes pas connecté</p>) : (children)}
            </main>
        </div>
    );
}