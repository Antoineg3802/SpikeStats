import { css } from "@emotion/css";
import { Theme } from "../../theme/theme";
import { useTheme } from "../../context/ThemeContext";
import { useEffect, useState } from "react";

// import services and dataModels
import { getMyTeam } from "../../service/api/teamService";
import { Team } from "../../data/Team";
import { isAuthenticated } from "../../service/global/verifications";
import { AllMatches } from "../../data/Match";
import { getMyMatches } from "../../service/api/matchService";

// import components
import SeeMembersBtn from "../atoms/team/SeeMembersBtn";
import SecondaryTitle from "../atoms/titles/SecondaryTitle";
import BackgroundContentBlur from "../atoms/content/BackgroundContentBlur";
import Content from "../organisms/Content";
import NotConnected from "../molecules/NotConnected";
import Navbar from "../organisms/Navbar";
import ContentList from "../molecules/ContentList";
import ContentText from "../atoms/content/ContentText";
import TeamInfoContainer from "../molecules/TeamInfoContainer";
import MatchContainer from "../organisms/MatchContainer";
import Separation from "../atoms/Separation";
import ThirdTitle from "../atoms/titles/ThirdTitle";
import SingleMatchCard from "../molecules/SingleMatchCard";
import { match } from "assert";

const Dashboard = ()=>{
    const { theme } = useTheme();
    const [team, setTeam] = useState<Team>();
    const [matches, setMatches] = useState<AllMatches>();
    const [error, setError] = useState<string>();
    const [isMemberListOpen, setIsMemberListOpen] = useState<boolean>(false);

    useEffect(() => {
        if (!isAuthenticated()) return;
        getMyTeam()
        .then((data) => {
            if ('success' in data && data.success) {
                setError(data.message);
            } else if (!('success' in data)) {
                setTeam(data);
            }else{
                setError("Une erreur est survenue")
            }
        })

        getMyMatches()
        .then((data) => {
            if ('success' in data && data.success) {
                setError(data.message);
            } else if (!('success' in data)) {
                setMatches(data);
            }else{
                setError("Une erreur est survenue")
            }
        })
    }, []);

    function handleClick(){
        setIsMemberListOpen(!isMemberListOpen);
    }

    return (
        <div className={style(theme).toString()}>
            <Navbar />
            <Content>
                {!isAuthenticated() ? (
                    <>
                        <NotConnected />
                        <BackgroundContentBlur />
                    </>
                ) : (
                    <>
                        {error && <div>{error}</div> }
                        {team && (
                            <>
                                <SecondaryTitle text={"Equipe " + team.name} />
                                <ContentText>{team.description} ({team.members.length} membre{team.members.length > 1 ? 's': ""})</ContentText>
                                <TeamInfoContainer>
                                    <ContentList isDisplayed={isMemberListOpen}>
                                        {team.members.map((member) => (
                                            <li key={member.id}>{member.name} ({member.role})</li>
                                        ))}
                                    </ContentList>
                                    <SeeMembersBtn onClick={handleClick}>{isMemberListOpen ? 'Masquer' : 'Voir'} les membres {'>'}</SeeMembersBtn>
                                </TeamInfoContainer>
                                <Separation />
                            </>
                        
                        )}
                        {matches && (
                            <MatchContainer>
                                <SecondaryTitle text={"Matchs"} />
                                {!matches.passed ? (
                                    <ThirdTitle text="Aucun match joué" />
                                ) : (
                                    <>
                                        <ThirdTitle text="Matchs passés :" />
                                        <div>{matches.passed[0].date}</div>
                                    </>
                                )}
                                {!matches.incoming ? (
                                    <ThirdTitle text="Aucun match prévu" />
                                ) : (
                                    <>
                                        <ThirdTitle text="Matchs prévus :" />
                                        {matches.incoming.map(match => (
                                            <SingleMatchCard key={match.id} match={match} />
                                        ))}
                                    </>
                                )}
                                
                                
                            </MatchContainer>
                        )}
                    </>
                )}
            </Content>
        </div>
    )
}

const style = (theme: Theme) => css`
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
    ${!isAuthenticated ? 'filter: blur(5px);': ''}
`

export default Dashboard;