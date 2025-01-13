import { Session } from "next-auth";
import NavbarDashboard from "../organisms/NavbarDashboard";

interface DashboardPageProps {
    session : Session | null
    children: React.ReactNode
}

export default function DashboardPage({session, children}: DashboardPageProps) {
    return (
        <div className="h-screen w-screen flex overflow-hidden">
            <NavbarDashboard session={session} />
            <div className="w-5/6 p-4">
                {!session ?  (<p>Vous n'etes pas connecté</p>) : (children)}
            </div>
        </div>
    );
}