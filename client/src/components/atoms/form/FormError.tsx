import { css } from '@emotion/css';

type Props = {
    text : string;
};

const FormError = ({text} : Props) => {
    return <p className={style}>{text}</p>;
};

const style = css`
color: var(--red);
background-color: var(--light-red);
padding : 10px;
border-radius: 10px;
border: 1px solid var(--red);
font-weight: bold;
`

export default FormError;