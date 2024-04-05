import { css } from '@emotion/css';
import React from 'react'
import { Theme } from '../../theme/theme';
import { useTheme } from '../../context/ThemeContext';

interface TeamInfoContainerProps {
    children: React.ReactNode;
}

export default function TeamInfoContainer({children}: TeamInfoContainerProps) {
    const {theme} = useTheme();
    return (
        <div className={style(theme)}>{children}</div>
    )
}

const style = (theme: Theme)=>css`

`