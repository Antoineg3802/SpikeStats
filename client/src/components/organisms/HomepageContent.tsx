import { css } from '@emotion/css';
import React, { useContext } from 'react'
import { ThemeContext } from "@emotion/react";

interface HomepageContentProps {
    children: React.ReactNode;
}

const HomepageContent = ({children} : HomepageContentProps)=>{
    const theme : any = useContext(ThemeContext);
    return (
        <div className={style(theme)}>
            {children}
        </div>
    )
}

const style = (theme: any)=>css`
    grid-area: content;
    background-color: ${theme.colors.white};
`

export default HomepageContent;
