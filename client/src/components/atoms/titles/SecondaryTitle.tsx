import { css } from "@emotion/css";

interface SecondaryTitleProps {
    text: string;
}

const SecondaryTitle = ({text}: SecondaryTitleProps) => {
    return <h2 className={style}>{text}</h2>;
};

const style = css`
    margin-bottom: 20px;
    color: var(--orange);
`

export default SecondaryTitle;