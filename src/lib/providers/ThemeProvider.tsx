"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    return <NextThemesProvider
        storageKey="theme"
        defaultTheme="light"
        enableSystem={true}
        enableColorScheme={true}
        disableTransitionOnChange={false}
        themes={['light', 'dark']}
        attribute="class"
        {...props}
    >{children}</NextThemesProvider>
}
