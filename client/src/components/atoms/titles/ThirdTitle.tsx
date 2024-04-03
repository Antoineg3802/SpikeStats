import { css } from "@emotion/css";
import { useTheme } from "../../../context/ThemeContext";
import { Theme } from "../../../theme/theme";

interface ThirdTitleProps {
    text: string;
}

const ThirdTitle = ({text}: ThirdTitleProps) => {
    const {theme} = useTheme();
    return (
        <h3 className={style(theme)}>{text}</h3>
    )
}

const style = (theme: Theme) => css`
    color: ${theme.colors.orange};
`

export default ThirdTitle;