"use client"

import { useChangeLocale, useCurrentLocale } from "../../../locales/client";

export default function LocaleSelector() {
    const locale = useCurrentLocale();
    const changeLocale = useChangeLocale();
    return (
        <select value={locale}
        onChange={(e)=>changeLocale(e.target.value as "fr" | "en")}>
            <option value="en">English</option>
            <option value="fr">Français</option>
        </select>
    );
}