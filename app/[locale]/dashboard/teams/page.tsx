import DashboardPageTitle from "@/components/atoms/Titles/DashboardPageTitle";
import NavbarDashboard from "@/components/organisms/NavbarDashboard";
import DashboardPage from "@/components/pages/DashboardPage";
import { Session } from "@/datas/session";
import { auth } from "@/lib/auth/auth";
import { useSession } from "next-auth/react";

export default async function Page() {
    const session = await auth();
    return <DashboardPage session={session}>
        <DashboardPageTitle title="tutu" />
        <p>
            This page is under construction. <br />
        </p>
    </DashboardPage>
}