import { css } from '@emotion/css';

type Props = {
    onClick: () => void;
    text: string;
    disabled: boolean;
};

const SendFormBtn = ({onClick, text, disabled} : Props) => {
    return <button className={style(disabled)} onClick={onClick} disabled={disabled}>{text}</button>;
};

const style = (disabled: boolean)=>css`
    background-color: ${disabled? 'var(--light-orange)': 'var(--orange)'};
    padding: 10px;
    border-radius: 10px;
    border: 1px solid var(--orange);
    color: var(--white);
    font-size: 1rem;
    font-weight: 500;
    &:hover{
        ${disabled ? "": "background-color: var(--white); color: var(--orange);cursor: pointer;"}
    }
`

export default SendFormBtn;