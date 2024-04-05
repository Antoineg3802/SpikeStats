import React from 'react'
import { Theme } from '../../theme/theme'
import { Match } from '../../data/Match'
import ThirdTitle from '../atoms/titles/ThirdTitle';
import { css } from '@emotion/css';
import { useTheme } from '../../context/ThemeContext';
import CardContent from '../atoms/CardContent';
import ContentText from '../atoms/content/ContentText';

interface SingleMatchCardProps {
    match: Match;
    isPassed?: boolean;
}

export default function SingleMatchCard({ match, isPassed }: SingleMatchCardProps) {
    const { theme } = useTheme();

    let date = new Date(match.date).toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    date = date.charAt(0).toUpperCase() + date.slice(1);

    function handleClick() {
        if (isPassed) {
            window.location.href = `/match/${match.id}`;
        }
    }

    return (
        <div onClick={handleClick} className={style(theme, isPassed)} key={match.id}>
            <ThirdTitle text={"Match contre " + match.opponent} />
            <CardContent>{date}</CardContent>
            <ContentText>{match.location}</ContentText>
        </div>
    )
}

const style = (theme: Theme, isPassed?: boolean) => css`
    padding: 20px;
    border: 2px solid ${theme.colors.orange};
    width: fit-content;
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    &:after{
        content: "${isPassed ? 'Voir le détail du match' : 'Match pas encore joué'}";
        position: absolute;
        text-align: center;
        top: 100%;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 5px;
        padding-top: 50%;
        color: ${theme.colors.white};
        background-color: ${theme.colors.orange};
        transition: top 1s;
    }
    &:hover{
        cursor: pointer;
        &:after{
            top: 0;
        }
    }
`;