import { css } from "@emotion/css";
import { useTheme } from "../../context/ThemeContext";
import { Theme } from "../../theme/theme";

interface ContentListProps{
    children: React.ReactNode;
    isDisplayed?: boolean;
}

const ContentList = ({children, isDisplayed}: ContentListProps)=>{
    const {theme} = useTheme();
    return (
        <ul className={style(theme, isDisplayed)}>{children}</ul>
    )
}

const style = (theme: Theme, isDisplayed? : boolean)=>css`
    color: ${theme.colors.black};
    ${isDisplayed ? "" : "display: none;"}
`

export default ContentList;