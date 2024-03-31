// DarkModeBtn.tsx
import { useTheme } from "../../../context/ThemeContext";

export const DarkModeBtn = () => {
	const { theme, toggleTheme } = useTheme();
	return <button onClick={toggleTheme}>Toggle theme</button>;
};

export default DarkModeBtn;