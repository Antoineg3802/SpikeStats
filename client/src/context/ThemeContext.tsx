import React, { createContext, useContext, useState, ReactNode } from "react";
import { lightTheme, darkTheme, Theme } from "../theme/theme";
import { setDarkModeCookie, isDarkMode } from "../service/global/verifications";

type ThemeContextType = {
	theme: Theme;
    themeName: string;
	toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<Theme>(isDarkMode() ? darkTheme : lightTheme);
    const [themeName, setThemeName] = useState<string>(isDarkMode() ? 'dark' : 'light');

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === lightTheme ? darkTheme : lightTheme));
        setThemeName(theme === lightTheme ? 'dark' : 'light');
        setDarkModeCookie(theme === lightTheme ? true : false)
    };

    return (
        <ThemeContext.Provider value={{ theme, themeName, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
};
