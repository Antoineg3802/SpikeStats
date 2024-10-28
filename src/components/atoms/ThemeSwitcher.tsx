"use client"

import { useState, useEffect } from 'react';
import { IconSun, IconMoon } from '@tabler/icons-react';

export default function ThemeSwitcher() {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(theme === 'dark' ? 'light' : 'dark');
        root.classList.add(theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <div className="flex w-fit h-fit p-1 rounded-full bg-gray-700 cursor-pointer select-none" onClick={toggleTheme}>
            <div className="h-auto flex h-fit rounded-full m-auto">
                <IconSun className={`stroke-white ${theme === "light" ? 'hidden' : ''}`} />
                <IconMoon className={`stroke-white ${theme !== "light" ? 'hidden' : ''}`} />
            </div>
        </div>
    );
}