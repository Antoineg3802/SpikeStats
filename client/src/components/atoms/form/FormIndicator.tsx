import { css } from '@emotion/css';

type Props = {
    text : string;
    color: string;
    backgroundColor: string;
};

const FormIndicator = ({text, color, backgroundColor} : Props) => {
    return <p className={style(color, backgroundColor)}>{text}</p>;
};

const style = (color: string, backgroundColor : string)=>css`
    color: ${color};
    background-color: ${backgroundColor};
    padding : 10px;
    border-radius: 10px;
    border: 1px solid ${color};
    font-weight: bold;
`

export default FormIndicator;