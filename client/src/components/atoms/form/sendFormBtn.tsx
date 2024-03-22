import { css } from '@emotion/css';

interface SendFormProps {
    onClick: () => void;
    text: string;
    disabled: boolean;
};

const SendFormBtn = ({onClick, text, disabled} : SendFormProps) => {
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
    transition: 0.1s ease-in-out all;
    &:hover{
        ${disabled ? "": "background-color: var(--white); color: var(--orange);cursor: pointer;"}
    }
`

export default SendFormBtn;