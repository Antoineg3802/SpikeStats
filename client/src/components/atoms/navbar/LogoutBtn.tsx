import { css } from '@emotion/css';
import { useTheme } from "../../../context/ThemeContext";

interface LogoutBtnProps{
    text: string;
    onClick: ()=> void;
}

const LogoutBtn = ({onClick, text}: LogoutBtnProps)=>{
    const { theme }= useTheme();
    return (
        <button className={style(theme)} onClick={onClick}>{text}</button>
    )
}

const style = (theme: any)=>css`
    color: ${theme.colors.lightOrange};
    background-color: ${theme.colors.white};
    text-decoration: none;
    margin: 0 10px;
    padding: 5px;
    transition: all 0.2s;
    border: 1px solid ${theme.colors.white};
    border-radius: 5px;
    font-family: inherit;
	font-size: 1.2rem;

    &:hover{
        cursor: pointer;
        background-color: ${theme.colors.lightOrange};
        color: ${theme.colors.white};
        border-color: ${theme.colors.white};
    }
`

export default LogoutBtn;