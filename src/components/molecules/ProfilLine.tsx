import SubmitButton from "../atoms/Buttons/SubmitButton";
import ProfilSeparator from "../atoms/ProfilSeparator";
import DashboardSubtitle from "../atoms/Titles/DashboardSubtitle";

interface ProfilLineProps {
    subtitle: string;
    children: React.ReactNode;
    isModifiable?: boolean;
}

export default function ProfilLine({ subtitle, children, isModifiable }: ProfilLineProps) {
    return (
        <div>
            <DashboardSubtitle subtitle={subtitle} />
            <div className="flex gap-4 items-center">
                {children}
                {isModifiable && 
                    <SubmitButton text="Modifier" onClick={(e) => {
                        e.preventDefault();
                        // TODO : Add the logic to modify the profil
                    }} />
                }
            </div>
            <ProfilSeparator />
        </div>
    );
}