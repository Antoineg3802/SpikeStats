import { css } from '@emotion/css'
import React from 'react'
import { useTheme } from '../../context/ThemeContext';
import { Theme } from '../../theme/theme';
import Navbar from '../organisms/Navbar';
import { isAuthenticated } from '../../service/global/verifications';
import Content from '../organisms/Content';
import SecondaryTitle from '../atoms/titles/SecondaryTitle';
import { getMatch } from '../../service/api/matchService';

export default function Match() {
    const { theme } = useTheme();
    // get id from url 
    const id = parseInt(window.location.pathname.split('/').pop() as string);
    getMatch(id)
    .then((match) => {
        console.log(match)
    })
    return (
        <div className={style(theme)}>
            <Navbar />
            <Content>
                <SecondaryTitle text="Match" />
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