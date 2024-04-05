import { css } from '@emotion/css'
import React from 'react'
import { Theme } from '../../theme/theme'
import { useTheme } from '../../context/ThemeContext';

interface MatchContainerProps {
    children: React.ReactNode;
}

export default function MatchContainer({ children }: MatchContainerProps) {
    const { theme } = useTheme();
    return (
        <div className={style(theme)}>{children}</div>
    )
}

const style = (theme: Theme) => css`
    margin: 20px auto;
`