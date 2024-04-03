import { css } from "@emotion/css";
import { useTheme } from "../../../context/ThemeContext";
import { Theme } from "../../../theme/theme";

interface ContentLinkProps{
    href: string;
    text: string;
}

const ContentLink = ({href, text} : ContentLinkProps) => {
    const { theme } = useTheme();
    return (
        <a className={style(theme)} href={href}>{text}</a>
    )
}

const style = (theme: Theme) => css`
    color: ${theme.colors.orange};
    text-decoration: none;
    &:hover{
        text-decoration: underline;
    }
`

export default ContentLink;
