"use client"

import { I18nProviderClient } from "../../locales/client";
import { PropsWithChildren } from "react";

export const LocaleProvider = ({ children, locale }: PropsWithChildren<{locale:string}>) => {
    return <I18nProviderClient locale={locale}>{children}</I18nProviderClient>;
}