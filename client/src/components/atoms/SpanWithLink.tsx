import { css } from "@emotion/css";
import { useTheme } from "../../context/ThemeContext";
import { Theme } from "../../theme/theme";

interface SpanProps {
    text: string;
    textHref: string;
    href: string;
};

const SpanWithLink = ({text, textHref, href} : SpanProps) => {
    const { theme } = useTheme();
    return <span className={style.span}>{text} <a className={style.a(theme)} href={href}>{textHref}</a></span>;
};

const style = {
    span: css`
        display: inline-block;
        text-align: center;
        width: 100%;
    `,
    a:(theme: Theme)=>css`
        color: ${theme.colors.orange};
        text-decoration: none;
        &:hover{
            text-decoration: underline;
        }
    `
}

export default SpanWithLink;