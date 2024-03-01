import { css } from "@emotion/css";

interface SpanProps {
    text: string;
    textHref: string;
    href: string;
};

const SpanWithLink = ({text, textHref, href} : SpanProps) => {
    return <span className={style.span}>{text} <a className={style.a} href={href}>{textHref}</a></span>;
};

const style = {
    span: css`
        display: inline-block;
        text-align: center;
        width: 100%;
    `,
    a: css`
        color: var(--orange);
        text-decoration: none;
        &:hover{
            text-decoration: underline;
        }
    `
}

export default SpanWithLink;