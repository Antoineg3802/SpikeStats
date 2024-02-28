import React from 'react';

type Props = {
    value: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const testInput = ({value, placeholder, onChange} : Props) => {
    return <input type="text" value={value} onChange={onChange} placeholder={placeholder}></input>;
};

export default testInput;