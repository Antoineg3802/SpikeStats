import React from 'react'
import { Theme } from '../../theme/theme'
import { useTheme } from '../../context/ThemeContext';
import { css } from '@emotion/css';

interface CardContentProps {
    children: React.ReactNode;
}

export default function CardContent({children}: CardContentProps) {
    const { theme } = useTheme();
    return (
        <p className={style(theme)}>{children}</p>
    )
}

const style = (theme : Theme)=>css`
    color: ${theme.colors.black};
`
