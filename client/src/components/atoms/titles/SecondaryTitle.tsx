import { css } from "@emotion/css";
import { useTheme } from "../../../context/ThemeContext";
import { Theme } from "../../../theme/theme";

interface SecondaryTitleProps {
    text: string;
}

const SecondaryTitle = ({text}: SecondaryTitleProps) => {
    const { theme } = useTheme();
    return <h2 className={style(theme)}>{text}</h2>;
};

const style = (theme: Theme)=>css`
    margin-bottom: 20px;
    color: ${theme.colors.orange};
`

export default SecondaryTitle;