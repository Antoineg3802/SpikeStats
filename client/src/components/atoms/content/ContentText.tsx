import { css } from "@emotion/css";
import { useTheme } from "../../../context/ThemeContext";
import { Theme } from "../../../theme/theme";

interface ContentTextProps{
    children: React.ReactNode;
}

const ContentText = ({children}: ContentTextProps)=>{
    const { theme } = useTheme();
    return (
        <p className={style(theme)}>{children}</p>
    )
}

const style = (theme: Theme)=> css`
    color: ${theme.colors.black};
`

export default ContentText;