import { css } from "@emotion/css";
import { Theme } from "../../theme/theme";
import { useTheme } from "../../context/ThemeContext";
import { useEffect, useState } from "react";

// import services and dataModels
import { getMyTeam } from "../../service/api/teamService";
import { Team } from "../../data/Team";
import { isAuthenticated } from "../../service/global/verifications";

// import components
import SeeMembersBtn from "../atoms/team/SeeMembersBtn";
import SecondaryTitle from "../atoms/titles/SecondaryTitle";
import BackgroundContentBlur from "../atoms/content/BackgroundContentBlur";
import Content from "../organisms/Content";
import NotConnected from "../molecules/NotConnected";
import Navbar from "../organisms/Navbar";

const Dashboard = ()=>{
    const { theme } = useTheme();
    const [team, setTeam] = useState<Team>();
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
                                <div>
                                    <p>{team.members.length} membre{team.members.length > 1 ? 's': ""}</p>
                                    <div>
                                        {team.members.map((member) => (
                                            <div key={member.id}>
                                                <span>{member.name} </span>
                                                <span>{member.role}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <SeeMembersBtn onClick={handleClick}>{isMemberListOpen ? 'Masquer' : 'Voir'} les membres {'>'}</SeeMembersBtn>
                                </div>
                            </>
                        
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