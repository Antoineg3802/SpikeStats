import { css } from "@emotion/css";
import { Theme } from "../../../theme/theme";
import { useTheme } from "../../../context/ThemeContext";

const BackgroundContentBlur = () => {
    const { theme } = useTheme();
    return (
        <div className={style(theme)}></div>
    )
}

const style = (theme: Theme) => css`
    position : absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${theme.colors.transparent};
    filter: grayscale(0.5) opacity(0.5);
`

export default BackgroundContentBlur;