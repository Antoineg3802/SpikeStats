interface DashboardPageTitleProps {
    title: string;
}

export default function DashboardPageTitle({title}: DashboardPageTitleProps) {
    return (
        <h1 className="text-4xl font-bold">{title}</h1>
    );
}