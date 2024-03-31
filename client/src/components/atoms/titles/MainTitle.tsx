import { css } from "@emotion/css";
import { useTheme } from "../../../context/ThemeContext";

interface MainTitleProps {
	text: string;
}

const MainTitle = ({ text }: MainTitleProps) => {
    const { theme }= useTheme();
	return <h1 className={style(theme)}>{text}</h1>;
};

const style = (theme: any) => css`
    color: ${theme.colors.white};
`;

export default MainTitle;