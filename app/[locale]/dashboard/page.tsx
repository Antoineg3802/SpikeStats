import DashboardPageTitle from "@/components/atoms/Titles/DashboardPageTitle";
import NavbarDashboard from "@/components/organisms/NavbarDashboard";
import DashboardPage from "@/components/pages/DashboardPage";
import { Session } from "@/datas/session";
import { auth } from "@/lib/auth/auth";

export default async function Page() {
    const session = await auth() as Session | null;
    return <DashboardPage session={session}>
        <DashboardPageTitle title={"Bienvenue " + session?.user.name + " !"}/>
    </DashboardPage>
}