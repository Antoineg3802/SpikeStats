import { css } from '@emotion/css';
import React from 'react';

interface FormSelectProps {
    children: React.ReactNode;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const FormSelect = ({ children, onChange } : FormSelectProps) => {
    return <select className={style} onChange={onChange}>{children}</select>;
};

const style = css`
    width: 75%;
    padding: 10px;
    font-size: 1rem;
    border-radius: 10px;
    margin-bottom: 20px;
`

export default FormSelect;