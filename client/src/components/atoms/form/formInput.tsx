import React from 'react';
import { css } from '@emotion/css';

type Props = {
    type: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const FormInput = ({type, placeholder, onChange} : Props) => {
    return <input className={style} type={type} onChange={onChange} placeholder={placeholder}></input>;
};

const style = css`
    font-family: 'Nexa';
    margin-bottom: 20px;
    width: 50%;
    font-size: 1rem;
    height: 2rem;
    text-align: center;
    border-radius: 10px;
    border: 1px solid var(--black);
    &:focus{
        border: 1px solid var(--orange);
    }
`

export default FormInput;