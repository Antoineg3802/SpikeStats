import { css } from '@emotion/css'
import React from 'react'

interface BottomNavGroupsProps{
    children: React.ReactNode;
}

const BottomNavGroups = ({children} : BottomNavGroupsProps)=>{
    return (
        <div className={style}>
            {children}
        </div>
    )
}

const style = css`
    position: absolute;
    bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: baseline;
    padding: 0 20px;
    font-size: 1.2rem;
    font-weight: 500;
    gap: 15px;
`

export default BottomNavGroups