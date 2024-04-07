import { css } from '@emotion/css'
import { useEffect, useState } from 'react'
import { useTheme } from '../../context/ThemeContext';
import { Theme } from '../../theme/theme';
import Navbar from '../organisms/Navbar';
import { isAuthenticated } from '../../service/global/verifications';
import Content from '../organisms/Content';
import SecondaryTitle from '../atoms/titles/SecondaryTitle';
import { getMatch } from '../../service/api/matchService';
import { MatchDetails } from '../../data/Match';
import ContentText from '../atoms/content/ContentText';
import ThirdTitle from '../atoms/titles/ThirdTitle';
import SwitchfaultsPoints from '../molecules/SwitchfaultsPoints';

export default function Match() {
    const { theme } = useTheme();
    const [match, setMatch] = useState<MatchDetails>();
    const [error, setError] = useState<string>();
    const [faults, setFaults] = useState<boolean>(false);

    const id = parseInt(window.location.pathname.split('/').pop() as string);
    useEffect(() => {
        getMatch(id)
        .then((data) => {
            if ('success' in data && data.success) {
                setError(data.message);
            } else if (!('success' in data)) {
                setMatch(data);
            }else{
                setError("Une erreur est survenue")
            }
        })
    }, [id])

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
                        <ContentText>{new Date(match.date).toLocaleDateString('fr-FR', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}</ContentText>
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