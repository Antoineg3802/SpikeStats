import { css } from "@emotion/css";
import { Theme } from "../../theme/theme";
import { useTheme } from "../../context/ThemeContext";

interface PricingContentGroupProps{
    children: React.ReactNode;
}

const PricingContentGroup = ({children} : PricingContentGroupProps)=>{
    const { theme } = useTheme();
    return (
        <div className={style(theme)}>{children}</div>
    )
}

const style = (theme: Theme)=>css`
    height: fit-content;
    margin-top: auto;
    margin-bottom: auto;
`

export default PricingContentGroup;