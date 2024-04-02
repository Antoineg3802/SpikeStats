import { css } from '@emotion/css';
import { useTheme } from '../../../context/ThemeContext';
import { Theme } from '../../../theme/theme';

interface SendFormProps {
    onClick: () => void;
    text: string;
    disabled: boolean;
};

const SendFormBtn = ({onClick, text, disabled} : SendFormProps) => {
    const { theme } = useTheme();
    return <button className={style(theme, disabled)} onClick={onClick} disabled={disabled}>{text}</button>;
};

const style = (theme : Theme, disabled: boolean)=>css`
    background-color: ${disabled? theme.colors.lightOrange: theme.colors.orange};
    padding: 10px;
    border-radius: 10px;
    border: 1px solid ${theme.colors.orange};
    color: ${theme.colors.white};
    font-size: 1rem;
    font-weight: 500;
    transition: 0.1s ease-in-out all;
    &:hover{
        ${disabled ? "": "background-color: "+ theme.colors.white +"; color: "+ theme.colors.orange +";cursor: pointer;"}
    }
`

export default SendFormBtn;
