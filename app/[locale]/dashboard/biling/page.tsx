import NavbarDashboard from "@/components/organisms/NavbarDashboard";
import { auth } from "@/lib/auth/auth";

export default async function Page() {
    const session = await auth()
    return <div className="h-screen w-screen">
        <NavbarDashboard session={session} />
    </div>
}