import { css } from '@emotion/css'
import React from 'react'

interface NavGroupsProps{
    children: React.ReactNode;
}

const NavGroups = ({children} : NavGroupsProps)=>{
    return (
        <div className={style}>
            {children}
        </div>
    )
}

const style = css`
    display: flex;
    flex-direction: column;
    align-items: baseline;
    height: 50%;
    padding: 0 20px;
    font-size: 1.2rem;
    font-weight: 500;
    gap: 5px;
`

export default NavGroups