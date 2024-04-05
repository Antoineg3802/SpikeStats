// DarkModeBtn.tsx
import { css } from "@emotion/css";
import { useTheme } from "../../context/ThemeContext";
import { Theme } from "../../theme/theme";
import { useState } from "react";
import { IoMdMoon, IoMdSunny } from "react-icons/io";

export const DarkModeBtn = () => {
	const { theme, themeName, toggleTheme } = useTheme();
	const [darkMode,setDarkMode] = useState(themeName === 'dark' ? true : false);

	function handleClick(){
        setDarkMode(!darkMode)
        toggleTheme();
    }

	return (
		<div className={style.container(theme)} onClick={handleClick}>
			<div className={style.btnIcon(theme, darkMode)}>
				{!darkMode ? (
					<IoMdSunny color={theme.colors.black} />
				) : (
					<IoMdMoon color={theme.colors.black} />
				)}
			</div>
		</div>
	);
};

const style = {
	container: (theme: Theme)=>css`
		display: block;
		position: relative;
		width: 50px;
		height: 30px;
		border-radius: 15px;
		background-color: ${theme.colors.white};
		user-select: none;
		&:hover{
			cursor: pointer;
		}
	`,
	btnIcon: (theme: Theme, isDarkMode: boolean)=>css`
		display: block;
		position: absolute;
		height: 20px;
		left: ${isDarkMode ? '22.5px;' : '2.5px;'};
		top: 2.5px;
		transition: all 0.3s;
		border-radius: 50%;
		padding: 2.5px;
		&:hover{
			background-color: ${theme.colors.lightOrange};
		}
	`

}

export default DarkModeBtn;