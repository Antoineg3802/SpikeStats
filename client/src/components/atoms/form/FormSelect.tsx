import { css } from '@emotion/css';
import React from 'react';

interface FormSelectProps {
    children: React.ReactNode;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    widthPourcentage: number
};

const FormSelect = ({ children, onChange, widthPourcentage } : FormSelectProps) => {
    return <select className={style(widthPourcentage)} onChange={onChange}>{children}</select>;
};

const style = (widthPourcentage: number)=>css`
    width: ${widthPourcentage? widthPourcentage : 75}%;
    padding: 10px;
    font-size: 1rem;
    border-radius: 10px;
    margin-bottom: 20px;
`

export default FormSelect;