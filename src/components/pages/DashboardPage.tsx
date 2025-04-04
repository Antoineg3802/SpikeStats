import { Session } from "@/datas/session";
import NavbarDashboard from "../organisms/NavbarDashboard";

interface DashboardPageProps {
    session : Session | null
    children: React.ReactNode
}

export default function DashboardPage({session, children}: DashboardPageProps) {
    return (
        <div className="h-screen w-screen flex overflow-hidden">
            <NavbarDashboard session={session} />
            <main className="flex-1 p-4 overflow-y-auto relative">
                {!session || !session.user.subscription ? (<p>Vous n'etes pas connecté</p>) : (children)}
            </main>
        </div>
    );
}