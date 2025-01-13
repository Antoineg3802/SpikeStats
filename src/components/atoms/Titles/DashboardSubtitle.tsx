interface DashboardSubtitleProps {
    subtitle: string;
}

export default function DashboardSubtitle({subtitle}: DashboardSubtitleProps) {
    return (
        <h2 className="font-semibold text-lg mb-2">{subtitle}</h2>
    );
}