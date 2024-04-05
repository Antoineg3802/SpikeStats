import { css } from "@emotion/css";
import { useTheme } from "../../../context/ThemeContext";
import { Theme } from "../../../theme/theme";
import React from "react";

interface SeeMembersBtnProps{
    onClick: ()=>void
    children: React.ReactNode
}

const SeeMembersBtn = ({children, onClick} : SeeMembersBtnProps)=>{
    const { theme } = useTheme();
    return (
        <button onClick={onClick} className={style(theme)}>{children}</button>
    )
}

const style = (theme: Theme) => css`
    border: 2px solid ${theme.colors.orange};
    border-radius: 5px;
    background-color: ${theme.colors.white};
    color: ${theme.colors.orange};
    font-family: inherit;
    padding: 10px;
    position: relative;
    transition: all 0.3s;
    font-size: 1rem;
    font-weight: 600;

    &:hover{
        background-color: ${theme.colors.orange};
        color: ${theme.colors.white};
        cursor: pointer;
    }
`

export default SeeMembersBtn