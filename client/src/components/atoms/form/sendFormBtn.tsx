import { css } from '@emotion/css';
import React from 'react';

type Props = {
    onClick: () => void;
    text: string;
};

const SendFormBtn = ({onClick, text} : Props) => {
    return <button className={style} onClick={onClick}>{text}</button>;
};
const style = css`
    background-color: var(--orange);
    color: var(--dark-blue);
`

export default SendFormBtn;