// DarkModeBtn.tsx
import { css } from "@emotion/css";
import { useTheme } from "../../../context/ThemeContext";
import { Theme } from "../../../theme/theme";

export const DarkModeBtn = () => {
	const { theme, themeName, toggleTheme } = useTheme();
	return <button className={style(theme)} onClick={toggleTheme}>{themeName === 'light' ? 'DarkTheme' : 'LightTheme'}</button>;
};

const style = (theme: Theme) => css`
	background-color: ${theme.colors.lightOrange};
	color: ${theme.colors.white};
	border: 1px solid ${theme.colors.lightOrange};
	padding	: 5px;
	transition: all 0.2s;
	border-radius: 5px;

	&:hover{
		border-color: ${theme.colors.lightOrange};
		background-color: ${theme.colors.white};
		color: ${theme.colors.lightOrange};
		cursor: pointer;
	}
`

export default DarkModeBtn;