import React from 'react';
import { css } from '@emotion/css';
import { Theme } from '../../../theme/theme';
import { useTheme } from '../../../context/ThemeContext';

type Props = {
    type: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    widthPourcentage?: number;
};

const FormInput = ({type, placeholder, onChange, widthPourcentage} : Props) => {
    const { theme } = useTheme();
    return <input className={style(theme, widthPourcentage)} type={type} onChange={onChange} placeholder={placeholder}></input>;
};

const style = (theme: Theme ,widthPourcentage?: number)=>css`
    font-family: 'Nexa';
    margin: 0;
    padding: 0;
    margin-bottom: 20px;
    width: ${widthPourcentage? widthPourcentage : 50}%;
    font-size: 1rem;
    height: 2rem;
    text-align: center;
    border-radius: 10px;
    border: 1px solid ${theme.colors.black};
    transition: 0.1s ease-in-out all;
    &:hover{
        &::placeholder{
            color: ${theme.colors.orange};
        }
        border: 1px solid ${theme.colors.orange};
    }
`

export default FormInput;
