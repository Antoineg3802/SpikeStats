import { ReactElement } from "react";

export default async function Layout({
	children,
}: {
	children: ReactElement;
}) {
	return (
		<div className="h-screen flex flex-col bg-background">{children}</div>
	);
}
