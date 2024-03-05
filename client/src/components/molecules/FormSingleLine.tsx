import { css } from "@emotion/css";

interface FormSingleLineProps{
    children: React.ReactNode;
    gap?: number;
}

const FormSingleLine = ({ children,gap }: FormSingleLineProps) => {
    return <div className={style(gap)}>{children}</div>
}

const style = (gap?: number)=>css`
    display: flex;
    gap: ${gap? gap : 0}%;
`

export default FormSingleLine;