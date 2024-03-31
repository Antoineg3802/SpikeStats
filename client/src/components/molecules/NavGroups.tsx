import { css } from '@emotion/css'
import { useTheme } from "../../context/ThemeContext";
import React from 'react'

interface NavGroupsProps{
    children: React.ReactNode;
}

const NavGroups = ({children} : NavGroupsProps)=>{
    const { theme }= useTheme();
    return (
        <div className={style(theme)}>
            {children}
        </div>
    )
}

const style = (theme: any)=>css`
    display: flex;
    flex-direction: column;
    align-items: baseline;
    height: 50%;
    padding: 0 20px;
    font-size: 1.2rem;
    font-weight: 500;
`

export default NavGroups