import { css } from '@emotion/css';
import { ThemeContext } from '@emotion/react';
import React, { useContext } from 'react'

interface NavItemProps{
    href: string;
    text: string;
}

const NavItem = ({href, text}: NavItemProps)=>{
    const theme = useContext(ThemeContext)
    return (
        <a className={style(theme)} href={href}>{text}</a>
    )
}

const style = (theme: any)=>css`
    color: ${theme.colors.black};
    text-decoration: none;
    margin: 0 10px;
    &:hover{
        color: ${theme.colors.primary};
    }
`

export default NavItem;