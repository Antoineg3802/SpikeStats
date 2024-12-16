import NavbarDashboard from "@/components/organisms/NavbarDashboard";
import DashboardPage from "@/components/pages/DashboardPage";
import { auth } from "@/lib/auth/auth";

export default async function Page() {
    const session = await auth();
    return <DashboardPage session={session}>
        <div>tutu</div>
    </DashboardPage>
}