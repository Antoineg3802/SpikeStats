import DashboardPage from "@/components/pages/DashboardPage";
import { ReactElement } from "react";

export default function DashboardLayout({
	children,
}: {
	children: ReactElement;
}) {
	return <DashboardPage>{children}</DashboardPage>;
}
