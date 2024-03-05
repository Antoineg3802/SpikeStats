import React from 'react';
import { css } from '@emotion/css';

type Props = {
    type: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    widthPourcentage?: number;
};

const FormInput = ({type, placeholder, onChange, widthPourcentage} : Props) => {
    return <input className={style(widthPourcentage)} type={type} onChange={onChange} placeholder={placeholder}></input>;
};

const style = (widthPourcentage?: number)=>css`
    font-family: 'Nexa';
    margin: 0;
    padding: 0;
    margin-bottom: 20px;
    width: ${widthPourcentage? widthPourcentage : 50}%;
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