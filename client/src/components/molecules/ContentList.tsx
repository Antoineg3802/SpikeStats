import { css } from "@emotion/css";
import { useTheme } from "../../context/ThemeContext";
import { Theme } from "../../theme/theme";

interface ContentListProps{
    children: React.ReactNode;
}

const ContentList = ({children}: ContentListProps)=>{
    const {theme} = useTheme();
    return (
        <ul className={style(theme)}>{children}</ul>
    )
}

const style = (theme: Theme)=>css`
    color: ${theme.colors.black}
`

export default ContentList;