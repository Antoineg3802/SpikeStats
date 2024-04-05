import React from 'react'
import { Theme } from '../../theme/theme'
import { Match } from '../../data/Match'
import ThirdTitle from '../atoms/titles/ThirdTitle';
import { css } from '@emotion/css';
import { useTheme } from '../../context/ThemeContext';
import CardContent from '../atoms/CardContent';

interface SingleMatchCardProps {
    match: Match;
}

export default function SingleMatchCard({match}: SingleMatchCardProps) {
    const { theme } = useTheme();
    return (
        <div className={style(theme)} key={match.id}>
            <ThirdTitle text={"Match contre " + match.opponent} />
            <CardContent>{match.date}</CardContent>
            <p>{match.location}</p>
        </div>
    )
}

const style = (theme: Theme)=>css`
    padding: 20px;
`