import { css } from '@emotion/css'
import React from 'react'
import { Theme } from '../../theme/theme'
import { useTheme } from '../../context/ThemeContext';

interface MatchContainerProps {
    children: React.ReactNode;
}

export default function MatchContainer({ children }: MatchContainerProps) {
    return (
        <div className={style}>{children}</div>
    )
}

const style = css`
    margin: 20px auto;
    display : flex;
    gap: 20px;
    position: relative;
`