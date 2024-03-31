import { css } from '@emotion/css';
import { useTheme } from "../../context/ThemeContext";
import React from 'react'

interface HomepageContentProps {
    children: React.ReactNode;
}

const HomepageContent = ({children} : HomepageContentProps)=>{
    const { theme }= useTheme();
    return (
        <div className={style(theme)}>
            {children}
        </div>
    )
}

const style = (theme: any)=>css`
    grid-area: content;
    background-color: ${theme.colors.white};
    padding: 10px;
`

export default HomepageContent;
