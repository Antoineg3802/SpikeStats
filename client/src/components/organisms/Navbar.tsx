import { css } from "@emotion/css";

import MainTitle from "../atoms/titles/MainTitle";
import { isAuthenticated, isDarkMode, setDarkModeCookie } from "../../service/global/verifications";
import DarkModeBtn from "../atoms/navbar/DarkModeBtn";
import NavItem from "../atoms/navbar/NavItem";
import NavGroups from "../molecules/NavGroups";
import { useTheme } from "../../context/ThemeContext";
import { useState } from "react";

const Navbar = () => {
    const {theme} = useTheme();

    return (
        <div className={style(theme)}>
            <MainTitle text="SpikeStats" />
            <NavGroups>
                <NavItem href="" text='Home' />
                <NavItem href="" text='About' />
                <NavItem href="" text='Contact' />
                <DarkModeBtn />
            </NavGroups>
            <div>
                {isAuthenticated() ? (
                    <button onClick={() => {localStorage.clear(); window.location.reload()}}>Logout</button>
                ) : (
                    <button onClick={() => {window.location.href = "/profile"}}>Profile</button>
                )}
            </div>
        </div>
    )
}

const style = (theme: any) => css`
    grid-area: navbar;
    background-color: ${theme.colors.lightOrange};
    padding: 10px;
`

export default Navbar;