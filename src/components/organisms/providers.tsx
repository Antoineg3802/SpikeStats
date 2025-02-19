import { LocaleProvider } from "@/lib/providers/LocaleProvider";
import { NextAuthProvider } from "@/lib/providers/NextAuthProvider";
import { Session } from "next-auth";

interface ProvidersProps {
    children: React.ReactNode;
    locale: string;
    session: Session | null;
}

export default function Providers({ children, locale, session }: ProvidersProps) {
    return (
        <NextAuthProvider session={session}>
            <LocaleProvider locale={locale}>
                {children}
            </LocaleProvider>
        </NextAuthProvider>
    );
}