// Packages import
import { css } from '@emotion/css'
import { useEffect, useState } from 'react'

// Datas import
import { useTheme } from '../../context/ThemeContext';
import { Theme } from '../../theme/theme';
import { isAuthenticated } from '../../service/global/verifications';
import { getMatch } from '../../service/api/matchService';
import { MatchDetails } from '../../data/Match';

// Components import
import SecondaryTitle from '../atoms/titles/SecondaryTitle';
import ContentText from '../atoms/content/ContentText';
import ThirdTitle from '../atoms/titles/ThirdTitle';
import SwitchfaultsPoints from '../molecules/SwitchfaultsPoints';
import Content from '../organisms/Content';
import Navbar from '../organisms/Navbar';

export default function Match() {
    const { theme } = useTheme();
    const [match, setMatch] = useState<MatchDetails>();
    const [error, setError] = useState<string>();
    const [faults, setFaults] = useState<boolean>(false);
    const [teamScore, setTeamScore] = useState<number>(0);
    const [oponentScore, setOponentScore] = useState<number>(0);

    const id = parseInt(window.location.pathname.split('/').pop() as string);
    useEffect(() => {
        getMatch(id)
        .then((data) => {
            if ('success' in data && data.success) {
                setError(data.message);
            } else if (!('success' in data)) {
                setMatch(data);
                analyzeMatch(data);
            }else{
                setError("Une erreur est survenue")
            }
            
        })
    }, [id])

    function analyzeMatch(match?: MatchDetails){
        if(!match) return;
        let teamMatchScore = 0;
        let opponentMatchScore = 0;
        match.sets.forEach(set => {
            if (set.winner){
                teamMatchScore++;
            }else{
                opponentMatchScore++;
            }
        })
        setTeamScore(teamMatchScore);
        setOponentScore(opponentMatchScore);
    };

    return (
        <div className={style(theme)}>
            <Navbar />
            <Content>
                <SwitchfaultsPoints faults={faults} setFaults={setFaults} />
                <SecondaryTitle text="Match" />
                {error && <p>{error}</p>}
                {match && (
                    <>
                        <ThirdTitle text={match.opponent+ " ("+ match.location + ")"} />
                        <ContentText>Match joué le <strong>{new Date(match.date).toLocaleDateString('fr-FR', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}</strong></ContentText>
                        <ContentText>Score: <strong>{teamScore} - {oponentScore}</strong></ContentText>
                    </>
                )}
            </Content>
        </div>
    )
}

const style = (theme : Theme) => css`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    grid-template-areas:
    "navbar content content content content"
    "navbar content content content content"
    "navbar content content content content"
    "navbar content content content content"
    "navbar content content content content";
    overflow: hidden;
    height: 100vh;
    font-family: "Nexa";
    background-color: ${theme.colors.white};
    ${!isAuthenticated() ? 'filter: blur(5px);': ''}
`