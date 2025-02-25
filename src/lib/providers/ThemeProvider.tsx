"use client"

import * as React from "react"
import dynamic from "next/dynamic"


const NextThemesProvider = dynamic(
    () => import('next-themes').then((e) => e.ThemeProvider),
    {
        ssr: false,
    }
)

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
