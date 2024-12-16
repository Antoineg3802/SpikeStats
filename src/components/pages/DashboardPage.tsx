import { Session } from "next-auth";
import NavbarDashboard from "../organisms/NavbarDashboard";

interface DashboardPageProps {
    session : Session | null
    children: React.ReactNode
}

export default function DashboardPage({session, children}: DashboardPageProps) {
    return (
        <div className="h-screen w-screen flex">
            <NavbarDashboard session={session} />
            <div>
                {children}
            </div>
        </div>
    );
}