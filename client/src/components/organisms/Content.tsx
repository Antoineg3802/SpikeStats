import { css } from '@emotion/css';
import { useTheme } from "../../context/ThemeContext";
import React from 'react'
import { Theme } from '../../theme/theme';

interface ContentProps {
    children: React.ReactNode;
}

const Content = ({children} : ContentProps)=>{
    const { theme }= useTheme();
    return (
        <div className={style(theme)}>
            {children}
        </div>
    )
}

const style = (theme: Theme)=>css`
    position: relative;
    grid-area: content;
    background-color: ${theme.colors.white};
    padding: 20px;
`

export default Content;
