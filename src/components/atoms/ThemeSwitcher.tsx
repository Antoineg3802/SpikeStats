"use client"

import { Moon, Sun } from 'lucide-react';

interface ThemeSwitcherProps {
    handleThemeChange: () => void;
    theme: string | undefined;
}

export default function ThemeSwitcher({ handleThemeChange, theme }: ThemeSwitcherProps) {
    return (
        <div className="flex w-fit h-fit p-1 rounded-full bg-foreground cursor-pointer select-none" onClick={handleThemeChange}>
            <div className="flex h-fit rounded-full m-auto">
                <Sun className={`stroke-background ${theme && theme === "light" ? 'hidden' : ''}`} />
                <Moon className={`stroke-background ${theme && theme !== "light" ? 'hidden' : ''}`} />
            </div>
        </div>
    );
}