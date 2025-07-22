"use client"

import { useChangeLocale, useCurrentLocale } from "../../locales/client";

export default function LocaleSelector() {
    const locale = useCurrentLocale();
    const changeLocale = useChangeLocale();
    return (
        <select value={locale}
            onChange={(e) => changeLocale(e.target.value as "fr" | "en")}
            className="mt-1.5 1/2 rounded-lg bg-background border-foreground-300 text-foreground sm:text-sm"
        >
            <option value="en">English</option>
            <option value="fr">Français</option>
        </select>
    );
}